"""Extract a scroll-scrub frame sequence from the client's phone teardown video.

Source: header/a7e11ac7189d4fc2ac921d95e6f3e2d8.mp4 (1920x1080, 48 fps, ~4.0 s) -
the latest clip the client uploaded (bright studio backdrop, replaces the two
earlier candidates also kept in header/ for reference).
Output: public/phone/{desktop,mobile}/fNNNN.webp + public/phone/poster.webp
"""
import os
import sys

import cv2

SRC = 'header/a7e11ac7189d4fc2ac921d95e6f3e2d8.mp4'
N = 80
SETS = (('desktop', 1280), ('mobile', 720))

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

for name, width in SETS:
    out_dir = f'public/phone/{name}'
    os.makedirs(out_dir, exist_ok=True)
    for i, fr in enumerate(frames):
        h = round(fr.shape[0] * width / fr.shape[1])
        small = cv2.resize(fr, (width, h), interpolation=cv2.INTER_AREA)
        cv2.imwrite(f'{out_dir}/f{i + 1:04d}.webp', small, [cv2.IMWRITE_WEBP_QUALITY, 80])

poster = cv2.resize(frames[0], (1280, 720), interpolation=cv2.INTER_AREA)  # Startbild = geschlossenes Telefon
cv2.imwrite('public/phone/poster.webp', poster, [cv2.IMWRITE_WEBP_QUALITY, 82])
print(f'wrote {N} frames x {len(SETS)} sets + poster')
