"""
Studio-light + 4K pass for the Piccolino dish cutouts.

Photographic grade only — no content is added, removed, or repainted.
Per image, over the SUBJECT pixels only (alpha > 0):
  1. white balance   : neutralise the yellow/green kitchen-fluorescent cast
  2. exposure        : percentile stretch so the dish uses the full range
  3. tone            : lift shadows, roll off highlights (soft-box look)
  4. clarity         : unsharp local contrast
  5. resolution      : 2x Lanczos upscale + fine sharpen  -> retina/4K crisp
"""
import os
import numpy as np
from PIL import Image, ImageFilter

SRC = "/private/tmp/claude-501/-Users-sonnyvaneskoo/500abb4a-4607-4ab3-89a1-d30623323810/scratchpad/cutouts-raw/"
DST = "/Users/sonnyvaneskoo/projects/piccolino-site/public/photos/cutouts/"
os.makedirs(DST, exist_ok=True)

TARGET_LONG_EDGE = 2400  # retina-crisp at the sizes the page renders


def studio(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    arr = np.asarray(img).astype(np.float32)
    rgb, alpha = arr[..., :3], arr[..., 3]
    subject = alpha > 24  # grade using real subject pixels only
    if subject.sum() < 100:
        return img

    px = rgb[subject]  # (N, 3)

    # 1. white balance — gray-world on the subject, damped so food stays warm
    means = px.mean(axis=0)
    gray = means.mean()
    gains = np.clip((gray / np.maximum(means, 1e-3)) ** 0.75, 0.82, 1.22)
    rgb = rgb * gains
    px = rgb[subject]

    # 2. exposure — stretch luminance between robust percentiles
    lum = px @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    lo, hi = np.percentile(lum, 1.0), np.percentile(lum, 99.0)
    if hi - lo > 12:
        rgb = (rgb - lo) * (255.0 / (hi - lo))
    rgb = np.clip(rgb, 0, 255)

    # 3. tone — gamma lifts shadows; soft knee rolls off speculars
    n = rgb / 255.0
    n = n ** 0.90                      # shadow lift
    knee = 0.82
    over = n > knee
    n[over] = knee + (n[over] - knee) * 0.62   # highlight roll-off
    rgb = np.clip(n, 0, 1) * 255.0

    # gentle saturation recovery lost to the stretch
    l = (rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32))[..., None]
    rgb = np.clip(l + (rgb - l) * 1.06, 0, 255)

    out = np.dstack([rgb, alpha]).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")

    # 4. clarity — broad unsharp = local contrast, not crunchy edges
    img = img.filter(ImageFilter.UnsharpMask(radius=3.0, percent=42, threshold=3))

    # 5. resolution — upscale then fine sharpen so it reads crisp on 4K/retina
    scale = TARGET_LONG_EDGE / max(img.size)
    if scale > 1:
        img = img.resize(
            (round(img.width * scale), round(img.height * scale)), Image.LANCZOS
        )
        img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=52, threshold=2))
    return img


for f in sorted(os.listdir(SRC)):
    if not f.endswith(".png"):
        continue
    im = Image.open(SRC + f)
    im = studio(im)

    bbox = im.getchannel("A").getbbox()
    im = im.crop(bbox)
    pad = int(max(im.size) * 0.03)  # breathing room for the drop shadow
    canvas = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad))

    out = DST + f.replace(".png", ".webp")
    canvas.save(out, "WEBP", quality=92, method=6)
    print(f"{f:34s} -> {canvas.size[0]}x{canvas.size[1]}  {round(os.path.getsize(out)/1024)} KB")
