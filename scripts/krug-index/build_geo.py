import json, math, sys
d = json.load(open(sys.argv[1])); out = sys.argv[2]
LON0, LON1, LAT0, LAT1 = 20.4, 28.6, 53.6, 60.0
K = 100; C = math.cos(math.radians(56.8))
W = round((LON1-LON0)*C*K); H = round((LAT1-LAT0)*K)
def proj(lon, lat): return ((lon-LON0)*C*K, (LAT1-lat)*K)
pad = 1.5
def clamp(lon, lat): return (min(max(lon, LON0-pad), LON1+pad), min(max(lat, LAT0-pad), LAT1+pad))
paths = {}
for name, rings in d["outlines"].items():
    parts = []
    for ring in rings:
        pts = [proj(*clamp(*p)) for p in ring]
        # drop rings fully outside the frame
        if all(x < -20 or x > W+20 or y < -20 or y > H+20 for x, y in pts): continue
        simp = []
        for x, y in pts:
            if simp and abs(simp[-1][0]-x) < 0.6 and abs(simp[-1][1]-y) < 0.6: continue
            simp.append((x, y))
        if len(simp) < 3: continue
        parts.append("M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in simp) + "Z")
    if parts: paths[name] = "".join(parts)
focus = {"Estonia", "Latvia", "Lithuania"}
with open(out, "w") as o:
    o.write("// Country outlines: Natural Earth (public domain), clipped to the Baltic frame and\n")
    o.write("// pre-projected (equirectangular, cos 56.8° x-scale). Regenerate rather than hand-edit.\n\n")
    o.write(f"export const MAP_FRAME = {{ lon0: {LON0}, lon1: {LON1}, lat0: {LAT0}, lat1: {LAT1}, k: {K}, cos: {C:.6f}, width: {W}, height: {H} }} as const\n\n")
    o.write("export const countryShapes: { name: string; focus: boolean; d: string }[] = " +
            json.dumps([{"name": n, "focus": n in focus, "d": p} for n, p in paths.items()], ensure_ascii=False) + "\n\n")
    o.write("export function project(lon: number, lat: number): [number, number] {\n  return [(lon - MAP_FRAME.lon0) * MAP_FRAME.cos * MAP_FRAME.k, (MAP_FRAME.lat1 - lat) * MAP_FRAME.k]\n}\n")
print(W, H, {n: len(p) for n, p in paths.items()})
