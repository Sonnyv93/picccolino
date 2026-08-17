"""
For dish photos where the plate fills the frame, a Vision cutout just returns a
rectangle. This instead studio-grades the shot and fades it to transparent with
a soft elliptical falloff, so it floats on the dark page with no straight edges.

Usage: python3 plate_fade.py <outdir> <name>=<file>[:cropTop,cropBottom] ...
"""
import os
import sys
import numpy as np
from PIL import Image, ImageFilter, ImageOps

TARGET = 2000


def studio_rgb(rgb: np.ndarray) -> np.ndarray:
    """Same photographic grade as studio.py, applied to every pixel."""
    px = rgb.reshape(-1, 3)

    means = px.mean(axis=0)
    gray = means.mean()
    gains = np.clip((gray / np.maximum(means, 1e-3)) ** 0.75, 0.82, 1.22)
    rgb = rgb * gains

    lum = rgb.reshape(-1, 3) @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    lo, hi = np.percentile(lum, 1.0), np.percentile(lum, 99.0)
    if hi - lo > 12:
        rgb = (rgb - lo) * (255.0 / (hi - lo))
    rgb = np.clip(rgb, 0, 255)

    n = rgb / 255.0
    n = n ** 0.90
    knee = 0.82
    over = n > knee
    n[over] = knee + (n[over] - knee) * 0.62
    rgb = np.clip(n, 0, 1) * 255.0

    l = (rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32))[..., None]
    return np.clip(l + (rgb - l) * 1.06, 0, 255)


def feather_alpha(w: int, h: int, inner=0.62, outer=0.99) -> np.ndarray:
    """Elliptical alpha: solid in the middle, smooth cosine falloff to the edge."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
    t = np.clip((r - inner) / (outer - inner), 0, 1)
    return (0.5 + 0.5 * np.cos(np.pi * t)) * 255.0  # 255 -> 0, smooth


def run(out_dir: str, name: str, path: str, crop_top=0.0, crop_bottom=0.0):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")

    # trim distractions (hands, table edges) before squaring up
    if crop_top or crop_bottom:
        im = im.crop((0, int(im.height * crop_top), im.width,
                      int(im.height * (1 - crop_bottom))))

    side = min(im.width, im.height)
    left = (im.width - side) // 2
    top = (im.height - side) // 2
    im = im.crop((left, top, left + side, top + side))
    if side > TARGET:
        im = im.resize((TARGET, TARGET), Image.LANCZOS)

    arr = np.asarray(im).astype(np.float32)
    rgb = studio_rgb(arr)

    alpha = feather_alpha(im.width, im.height)
    out = np.dstack([rgb, alpha]).astype(np.uint8)
    img = Image.fromarray(out)
    img = img.filter(ImageFilter.UnsharpMask(radius=2.0, percent=45, threshold=3))

    dst = os.path.join(out_dir, f"{name}.webp")
    img.save(dst, "WEBP", quality=88, method=6)
    print(f"{name:22s} {img.size}  {round(os.path.getsize(dst)/1024)} KB")


if __name__ == "__main__":
    out_dir = sys.argv[1]
    os.makedirs(out_dir, exist_ok=True)
    for spec in sys.argv[2:]:
        name, rest = spec.split("=", 1)
        crops = (0.0, 0.0)
        if ":" in rest:
            rest, c = rest.split(":", 1)
            a, b = c.split(",")
            crops = (float(a), float(b))
        run(out_dir, name, rest, *crops)
