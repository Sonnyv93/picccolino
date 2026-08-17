# 📸 Drop new photos and videos here

## Photos
Drop any new photos straight into this folder (`public/photos/`) — any format,
any filename. They get background-removed, studio-graded, and upscaled by the
pipeline below.

## 🎥 Videos
Drop hero video files into `public/video/src/`. The chosen one gets compressed
and written out as `public/video/hero.mp4`.

> ⚠️ **Files inside a Photos-app temp folder can't be read** (macOS privacy
> blocks `/private/var/folders/.../com.apple.Photos.NSItemProvider/...`).
> Export or drag them to Downloads, the Desktop, or this folder first.

## How the photos get processed

1. **Background removal** — Swift + Vision `VNGenerateForegroundInstanceMaskRequest`
   lifts the plate off its background (script: `scripts/cutout.swift`).
2. **Studio grade** (`scripts/studio.py`) — grades only the subject pixels:
   - gray-world white balance to kill the yellow kitchen-fluorescent cast
   - percentile exposure stretch
   - shadow lift + highlight roll-off (soft-box look)
   - unsharp local contrast
   - 2x Lanczos upscale to ~2400px long edge + fine sharpen (retina/4K crisp)
3. Output: transparent WebP in `public/photos/cutouts/`.

Nothing is added, removed, or repainted — it's a photographic grade plus a
crop to the subject's bounding box.
