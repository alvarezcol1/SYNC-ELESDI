# Photography

Every photo slot on the site currently shows a designed SVG plate. To use a real
photograph, drop a file here **named exactly after its slot** — it is picked up
automatically (see `src/data/media.ts`). No code changes needed.

Accepted formats: `.avif`, `.webp`, `.jpg`, `.jpeg`, `.png`. If several exist for
one slot, AVIF/WebP win. Alt text comes from the translation files, so it stays
bilingual — update `visualLabel` / `sceneLabel` in `src/translations/*.ts` if the
new photo shows something different.

**Only add images with verified usage rights**, and record each one in
`CREDITS.md` (source, photographer, license, date).

## Shot list

Art direction for all slots: realistic American commercial vehicles, dusk /
blue-hour or night lighting, deep navy shadows, warm amber practical lights.
No staged stock-photo handshakes, no luxury cars, no AI-generated trucks.

| Slot file name        | Where it appears                       | What to shoot                                                                 | Size (min)  |
|-----------------------|----------------------------------------|-------------------------------------------------------------------------------|-------------|
| `hero`                | Hero, full-bleed                        | Tractor-trailer on a highway at dusk, low 3/4 or tracking side angle, truck in the **right half** of frame, clean sky on the left for copy | 2400×1350 |
| `autoLiability`       | Solutions — feature card               | Truck in traffic / sharing the road with passenger vehicles                   | 1600×1000  |
| `cargo`               | Solutions — tall card                  | Open trailer doors with palletised freight, or loading at a dock              | 1200×1200  |
| `physicalDamage`      | Solutions — compact card               | Close detail of a tractor (cab, hood, wheels) — condition / inspection feel   | 1200×800   |
| `generalLiability`    | Solutions — wide card                  | Yard, terminal office or loading dock with people/visitors (no driving)       | 1400×900   |
| `workersComp`         | Solutions — compact card               | Driver using cab steps and grab handle, or yard worker with PPE               | 1200×800   |
| `umbrella`            | Solutions — wide card                  | Wide aerial of a highway or fleet — "big picture" protection                  | 1400×900   |
| `serve-owner`         | Who We Serve — Owner-Operators         | One truck, one driver, open road                                              | 1600×1000  |
| `serve-company`       | Who We Serve — Trucking Companies      | Several trucks at a terminal / dispatch environment                           | 1600×1000  |
| `serve-fleet`         | Who We Serve — Fleet Businesses        | Mixed commercial vehicles (box trucks, vans, tractors)                        | 1600×1000  |

Export at ~80% quality WebP or AVIF; keep each file under ~350 KB.

> On the hero, a real photo replaces the SVG plate and its coverage callouts
> (their positions are tied to the drawn truck). The network overlay and
> legibility gradient still apply.
