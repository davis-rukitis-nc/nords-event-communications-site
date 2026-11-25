import csv, json, sys, math
A = sys.argv[1]; P = sys.argv[2]; OUT = sys.argv[3]
geo = json.load(open(f"{A}/data/venues.geojson"))
feat = {f["properties"]["id"]: f for f in geo["features"]}
rows = list(csv.DictReader(open(f"{A}/data/krug_index.csv")))
MENU = {
 "W015":"gaspar-s/wine-list","W029":"mantel-ja-korsten/wine-list","W010":"ertlio-namas/wine-list",
 "W050":"time-to-wine-rotermanni/retail-list","W049":"time-to-wine-kopli/wine-list","W036":"pavaru-maja-ligatne/wine-list",
 "W009":"eleno-by-martyn-meid/wine-list","W044":"smor-modern-bistro/wine-list","W024":"lee-brasserie/wine-list",
 "W027":"lore-bistroo/wine-list","W053":"uma-restoran/wine-list","W021":"john-chef-s-hall/wine-list","W006":"babo/wine-list",
 "W046":"somm-wine-bar/wine-list","W008":"dia/wine-list","W001":"3-pavaru-restorans/wine-list","W023":"le-dome-restorans/wine-list",
 "W004":"atputa/wine-list","W038":"restaurant-arrivee/wine-list","W048":"stage22-bar-restaurant/wine-list",
 "W018":"harper-woolf/wine-list",
}
NAMES = {"Pavāru māja, Līgatnē":"Pavāru māja","ELĒNO By Martyn Meid":"Elēno by Martyn Meid","SMØR modern bistro":"SMØR Modern Bistro",
 'Restaurant "Arrivée"':"Arrivée","Le Dome restorāns":"Le Dome","ATPUTA":"ATPŪTA","Stage22 Bar & Restaurant":"Stage22",
 "Time To Wine Rotermanni":"Time to Wine Rotermanni"}
TYPES = {"Fine Dining Restaurant":"Fine dining","Casual Restaurant":"Restaurant","Bar":"Wine bar & shop","Hotel Restaurant":"Hotel restaurant"}
def num(x):
    return None if x in ("", None) else float(x)
venues = []
for r in rows:
    f = feat[r["venue_id"]]; p = f["properties"]; lon, lat = f["geometry"]["coordinates"]
    ed = num(r["edition"]); fee = num(r["bottle_fee_eur"]) or 0; svc = num(r["service_pct"]) or 0
    venues.append(dict(id=r["venue_id"], name=NAMES.get(r["venue"], r["venue"]), city=p["city"], country=r["country"],
        type=TYPES[r["venue_type"]], edition=int(ed) if ed else None, label=r["label"], printed=float(r["printed_eur"]),
        bottleFee=fee, discretionaryPct=svc, drinkIn=float(r["mandatory_price_eur"]), lon=round(lon,5), lat=round(lat,5),
        menuUrl="https://menus.balticwinelists.com/2026/" + MENU[r["venue_id"]], resultUrl=p.get("result_url") or None,
        scope="primary"))
# Riviera legacy iD listing (separate sensitivity row)
rv = [f for f in geo["features"] if f["properties"]["scope"] != "primary"]
for f in rv:
    p = f["properties"]; lon, lat = f["geometry"]["coordinates"]
    venues.append(dict(id=p["id"], name=p["name"], city=p["city"], country=p["country"], type="Restaurant", edition=None,
        label="Krug Grande Cuvée, printed “2006”, iD 219 011", printed=float(p["listed"]), bottleFee=0, discretionaryPct=0,
        drinkIn=float(p["cost"]), lon=round(lon,5), lat=round(lat,5), menuUrl="https://menus.balticwinelists.com/2026/riviera/wine-list",
        resultUrl=p.get("result_url") or None, scope="legacy-id"))
pairs = []
for l in csv.DictReader(open(f"{A}/data/prestige_pairs.csv")):
    if l["product"] == "DP" and l["vintage"] == "2015.0":
        pairs.append(dict(id=l["venue_id"], krug=float(l["mandatory_price_eur"]), dp=float(l["dp_eur"])))
intl = []
for l in csv.DictReader(open(f"{A}/data/international.csv")):
    intl.append(dict(venue=l["venue"], city=l["city"], country=l["country"], edition=int(l["edition"]), currency=l["currency"],
        printedLocal=float(l["printed_local"]), withChargesLocal=float(l["local_with_documented_charges"]),
        eur=float(l["eur_with_documented_charges"]), servicePct=num(l["mandatory_service_pct"]), menuDate=l["menu_date"], menuUrl=l["menu_url"]))
an = json.load(open(f"{A}/data/analysis.json"))
proto = json.load(open(P))
dp = an["dp_2015"]
stats = dict(
  dpHoldout=dict(n=dp["holdout_eur"]["n"], krugMae=round(dp["holdout_eur"]["krug_mae"],3), medianMae=round(dp["holdout_eur"]["median_mae"],3)),
  dpHoldoutNoMax=dict(n=dp["excluding_highest_holdout_eur"]["n"], krugMae=round(dp["excluding_highest_holdout_eur"]["krug_mae"],3), medianMae=round(dp["excluding_highest_holdout_eur"]["median_mae"],3)),
  dpPearson=round(dp["pairs"]["pearson"],2), dpSpearman=round(dp["pairs"]["spearman"],2),
  dpPearsonNoMax=round(dp["excluding_highest"]["pearson"],2), dpSpearmanNoMax=round(dp["excluding_highest"]["spearman"],2),
  dpPremiumPct=round(dp["krug_premium_pct"],1),
  stillFlex=dict(n=proto["basket"]["still_family_min2"]["holdout"]["n"], krugMae=round(proto["basket"]["still_family_min2"]["holdout"]["krug_mae"],3), medianMae=round(proto["basket"]["still_family_min2"]["holdout"]["median_mae"],3)),
)
with open(OUT, "w") as o:
    o.write("// Generated from the Baltic Wine & Drinks Awards Krug Index 2026 audit pack (snapshot 24 Nov 2026):\n")
    o.write("// data/krug_index.csv, venues.geojson, prestige_pairs.csv, international.csv, analysis.json.\n")
    o.write("// Do not hand-edit prices here; change the reviewed research inputs and regenerate.\n\n")
    o.write('import type { KrugVenue, DpPair, IntlReference, KrugStudyStats } from "./types"\n\n')
    o.write("export const venues: KrugVenue[] = " + json.dumps(venues, ensure_ascii=False, indent=2) + "\n\n")
    o.write("export const dpPairs: DpPair[] = " + json.dumps(pairs, indent=2) + "\n\n")
    o.write("export const international: IntlReference[] = " + json.dumps(intl, ensure_ascii=False, indent=2) + "\n\n")
    o.write("export const study: KrugStudyStats = " + json.dumps(stats, indent=2) + "\n")
print(len(venues), len(pairs), len(intl), stats)
