"""Extract a scroll-scrub frame sequence from the client's phone teardown video.

Source: header/a7e11ac7189d4fc2ac921d95e6f3e2d8.mp4 (1920x1080, 48 fps, ~4.0 s) -
the latest clip the client uploaded (bright studio backdrop, replaces the two
earlier candidates also kept in header/ for reference).

Desktop frames ship at the source's full 1920px width (no downscale) and
WebP quality 92, per the client's "don't decrease the video quality" request
(2026-09-16); mobile frames are halved (960px) since the canvas never renders
wider than a phone viewport, but keep the same quality setting.
Output: public/phone/{desktop,mobile}/fNNNN.webp + public/phone/poster.webp
"""
import os
import sys

import cv2

SRC = 'header/a7e11ac7189d4fc2ac921d95e6f3e2d8.mp4'
N = 80
QUALITY = 92
SETS = (('desktop', 1920), ('mobile', 960))

cap = cv2.VideoCapture(SRC)
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
if total < N:
    sys.exit(f'video has only {total} frames')

frames = []
for i in range(N):
    cap.set(cv2.CAP_PROP_POS_FRAMES, round(i * (total - 1) / (N - 1)))
    ok, fr = cap.read()
    if not ok:
        sys.exit(f'frame {i} failed')
    frames.append(fr)

src_w = frames[0].shape[1]

for name, width in SETS:
    out_dir = f'public/phone/{name}'
    os.makedirs(out_dir, exist_ok=True)
    for i, fr in enumerate(frames):
        if width >= src_w:
            small = fr  # never upscale past the source
        else:
            h = round(fr.shape[0] * width / src_w)
            small = cv2.resize(fr, (width, h), interpolation=cv2.INTER_AREA)
        cv2.imwrite(f'{out_dir}/f{i + 1:04d}.webp', small, [cv2.IMWRITE_WEBP_QUALITY, QUALITY])

# Startbild = geschlossenes Telefon, volle Quellauflösung (LCP-Element im Hero).
cv2.imwrite('public/phone/poster.webp', frames[0], [cv2.IMWRITE_WEBP_QUALITY, QUALITY])
print(f'wrote {N} frames x {len(SETS)} sets + poster at quality {QUALITY}')
