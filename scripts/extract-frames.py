"""Extract a scroll-scrub frame sequence from the client's phone teardown video.

Source: header/cd2264868a0e4e79a0b92a602801d499.mp4 (1920x1080, 60 fps, ~9.8 s) â
the higher-frame-rate of the two clips the client supplied in header/.
Output: public/phone/{desktop,mobile}/fNNNN.webp + public/phone/poster.webp
"""
import os
import sys

import cv2

SRC = 'header/cd2264868a0e4e79a0b92a602801d499.mp4'
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
