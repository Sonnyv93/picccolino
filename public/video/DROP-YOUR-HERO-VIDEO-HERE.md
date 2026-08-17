# 🎥 Drop your hero video here

Put your 4K food footage in this folder named exactly:

```
public/video/hero.mp4
```

That's it — the hero section already points at `/video/hero.mp4` and will pick it up automatically.

Tips for a smooth 60fps hero:
- Export at **1920×1080** (4K is overkill for a background video and slows page load)
- H.264 MP4, no audio track, ~8–12 Mbps, 10–20 seconds looping
- Keep it under ~15 MB if you can
- Optional: also export a `hero.webm` and add a second `<source>` in `src/components/Hero.tsx` for smaller file size

Until then, the site shows the poster image (`/placeholder/hero-poster.svg`) as a fallback.
