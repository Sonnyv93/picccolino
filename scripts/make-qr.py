"""
Regenerate the Toast ordering QR code.

Run this whenever site.orderUrl changes:
    pip3 install qrcode
    python3 scripts/make-qr.py

Writes public/qr/order-toast.svg — vector, so it stays sharp printed at any
size (counter card, table tents, takeout bags) as well as on the site.
The SVG uses fill="currentColor", so it takes the colour of its container.
"""

import os

import qrcode

URL = (
    "https://order.toasttab.com/online/"
    "piccolino-italian-kitchen-llc-1177-fischer-blvd-suite-2"
)
OUT = "public/qr/order-toast.svg"

qr = qrcode.QRCode(
    error_correction=qrcode.constants.ERROR_CORRECT_M,  # ~15% damage tolerance
    box_size=1,
    border=2,
)
qr.add_data(URL)
qr.make(fit=True)

matrix = qr.get_matrix()
n = len(matrix)

rects = [
    f'<rect x="{x}" y="{y}" width="1" height="1" rx="0.18"/>'
    for y, row in enumerate(matrix)
    for x, dark in enumerate(row)
    if dark
]

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}" '
    f'shape-rendering="geometricPrecision" fill="currentColor" role="img" '
    f'aria-label="QR code linking to Piccolino online ordering on Toast">'
    + "".join(rects)
    + "</svg>"
)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w") as f:
    f.write(svg)

print(f"wrote {OUT} — {n}x{n} modules, version {qr.version}")
