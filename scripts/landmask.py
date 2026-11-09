"""Natural Earth 110m szárazföld -> pontrács bitmaszk (base64) a Nyelvek világa térképhez."""
import json, sys, base64
geo = json.load(open(sys.argv[1]))
STEP, LAT_TOP, LAT_BOT = 2.0, 76.0, -56.0
polys = []
for f in geo['features']:
    g = f['geometry']
    rings = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
    for poly in rings:
        polys.append(poly[0])  # külső gyűrű (a 110m-es adatban a lyukak elhanyagolhatók)

def inside(x, y, ring):
    c = False
    j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i]; xj, yj = ring[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            c = not c
        j = i
    return c

cols = int(360 / STEP); rows = int((LAT_TOP - LAT_BOT) / STEP) + 1
bits = []
for r in range(rows):
    lat = LAT_TOP - r * STEP
    for c in range(cols):
        lon = -180 + c * STEP + STEP / 2
        bits.append(1 if any(inside(lon, lat, ring) for ring in polys) else 0)
by = bytearray()
for i in range(0, len(bits), 8):
    b = 0
    for k, v in enumerate(bits[i:i + 8]):
        b |= v << (7 - k)
    by.append(b)
print(json.dumps({'step': STEP, 'latTop': LAT_TOP, 'cols': cols, 'rows': rows, 'land': sum(bits), 'mask': base64.b64encode(bytes(by)).decode()}))
