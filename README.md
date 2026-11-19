# Juice HQ — Shopify theme

The Juice HQ website: black and white, editorial, with the beverages and photography bringing the colour. Built on Shopify's Online Store 2.0 sections, so text, images, projects, logos and family profiles are all edited in **Online Store › Themes › Customise**, with no code.

## What's in it

| Page | Template | Sections |
|---|---|---|
| Home | `templates/index.json` | Hero headline · Offer cards · Work carousel · Trusted by logos · Family profiles · Black band (How we work) · Katie London |
| Work | `templates/page.work.json` | Page heading · Brand film · Project grid · Enquiry banner |
| Our Story | `templates/page.story.json` | Page heading · Image with text · Quote · Family profiles · Image with text |
| Services | `templates/page.services.json` | Page heading · Private Edition · Glass packaging · PET cans · In-house design band |
| Enquire | `templates/page.enquire.json` | Enquiry form (Hospitality / Bespoke Branded Beverages / Bespoke Water / Stockist) |

Header and footer are section groups (`sections/header-group.json`, `sections/footer-group.json`), so they're edited once for every page.

Every image setting falls back to a photo bundled in `assets/` until you pick your own in the editor, so the site never looks empty.

## One-time setup in Shopify admin

1. **Pages** (Online Store › Pages › Add page). Create these, choosing the template on the right:
   - *Work*, handle `work`, template `page.work`
   - *Our Story*, handle `our-story`, template `page.story`
   - *Services*, handle `services`, template `page.services`
   - *Enquire*, handle `enquire`, template `page.enquire`
   - Later: *Hospitality* (`hospitality`), *Bespoke Branded Beverages* (`bespoke-branded-beverages`), *Bespoke Water* (`bespoke-water`), *Katie London* (`katie-london`)
2. **Menus** (Content › Menus):
   - `main-menu`: Work, Our Story, Services (the Enquire link is added by the header itself)
   - `footer-offer`: Hospitality, Bespoke Branded Beverages, Bespoke Water, Katie London
   - `footer`: Work, Our Story, Services, Enquire
3. **Enquiry emails** go to the store's sender email (Settings › Notifications). Each email shows the *Enquiry type*, so you can tell hospitality, bespoke, water and stockist enquiries apart.
4. **Logo**: Customise › Theme settings › Brand. Upload the black logo once; the footer turns it white automatically.

The Katie London "Become a stockist" button links to `/pages/enquire?type=stockist`, which opens the form with Stockist already selected.

## Working in VS Code

```bash
npm install -g @shopify/cli          # once
code .                               # open this folder; accept the recommended Shopify Liquid extension
shopify theme dev --store YOUR-STORE.myshopify.com
```

`theme dev` gives you a live preview that refreshes as you save. Other useful commands:

```bash
shopify theme check                  # lint (also runs in VS Code as you type)
shopify theme push --unpublished     # upload as a new, unpublished theme
shopify theme pull                   # bring down edits made in the Shopify editor
```

## Connecting GitHub

1. Push this folder to a GitHub repository (e.g. `juice-hq-theme`).
2. In Shopify: Online Store › Themes › Add theme › **Connect from GitHub**, pick the repo and the `main` branch.
3. From then on, pushes to `main` update the theme, and changes made in the theme editor are committed back to the repo automatically.

Tip: keep the live site on `main`, do code work on a separate branch and connect that branch as a second (unpublished) theme to preview it.

## Notes

- Fonts are Inter Tight and Instrument Serif from Google Fonts. Theme Check flags these as remote assets (warning only); they can be self-hosted in `assets/` later for a small speed gain.
- Copy marked "Add … here" in the Story and Services templates is where the existing founder story and Private Edition / glass packaging text goes.
