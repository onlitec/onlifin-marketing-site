---
name: OnliFin Marketing
description: One adding-machine tape on a graphite desk; entries in ink, the live line in vermilion, closing in a double-underlined total.
colors:
  desk: "#131518"
  desk-raised: "#1c1f23"
  desk-line: "#2c3035"
  paper: "#f3f5f4"
  paper-shade: "#e3e7e5"
  paper-line: "#c9cfcc"
  ink: "#15171a"
  ink-mute: "#525960"
  dim: "#a4abb2"
  vermilion: "#c22d14"
  vermilion-light: "#ff6b4e"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3.2rem, 8vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.08
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.08
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  none: "0"
  DEFAULT: "2px"
spacing:
  section-y: "96px"
  section-y-lg: "144px"
  gutter: "20px"
  gutter-sm: "32px"
  container: "1320px"
components:
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "60px"
    padding: "0 28px"
  button-paper-hover:
    backgroundColor: "{colors.vermilion-light}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "56px"
    padding: "0 16px"
  button-ink-hover:
    backgroundColor: "{colors.vermilion}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "56px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "40px"
---

# Design System: OnliFin Marketing

## Overview

**Creative North Star: "The Bobina de Somadora"**

The page is one adding-machine tape unrolled across a graphite desk. Entries print line by line, are subtotalled per context (PF / PJ), forecast lines are dashed, and the page closes on one underlined total. Sections alternate between the dark desk and cold-white paper strips whose lower edge is torn. Cards, mockups and shadow stacks do not exist here; structure comes from ruled rows, columns and hairlines.

Two ribbon inks only. Near-black ink prints entries; vermilion prints the negative, the subtotal and the line currently in motion. Type is heavy and condensed for headlines and giant figures, monospaced tabular figures for tape data, a plain grotesque for reading. Density is generous on the outside (large section padding) and tight inside (ruled rows).

**Key Characteristics:**
- Graphite desk ground, cold-white paper strips, no gradients, no shadows.
- Square corners; 2px is the only radius and is rarely reached.
- Ruled lists and ledger rows instead of cards.
- Solid ink rule = realized, dashed rule = forecast.
- Vermilion is scarce and always signals a live, negative or total value.

## Colors

A two-ground palette (graphite desk, cold-white paper) with a single hot accent in two tones matched to the ground it prints on.

### Primary
- **Ribbon Vermilion** (`vermilion`): printed on paper: subtotals, negatives, "Recomendado", error text, the voided strike, the top rule of the highlighted plan, hover fill of ink buttons.
- **Live Vermilion** (`vermilion-light`): the same ink on the desk: the "sem perder contexto" phrase, PF/PJ giant labels, step numerals, hover fill of paper buttons, the focus ring on desk, text selection.

### Neutral
- **Graphite Desk** (`desk`): page ground, header, modal scrim (at 90%).
- **Desk Raised** (`desk-raised`): declared in config; not used by the shipped components.
- **Desk Line** (`desk-line`): hairlines and column dividers on the desk.
- **Cold Paper** (`paper`): tape and paper sections, primary button on desk, dialog.
- **Paper Shade** (`paper-shade`): dialog close hover and focused field fill.
- **Paper Line** (`paper-line`): declared in config; rules on paper actually use `ink` at 15-25% opacity.
- **Ribbon Ink** (`ink`): entries, headings and rules on paper; filled button on paper; focus ring on paper.
- **Ink Mute** (`ink-mute`): secondary text on paper, forecast lines, labels.
- **Dim** (`dim`): secondary text and nav links on the desk; body text on desk is `#eceeed` or white.

### Named Rules
**The Two Inks Rule.** Only ink and vermilion print. No third accent, no tints of vermilion as backgrounds.

**The Matched Ground Rule.** Vermilion (`#c22d14`) is used on paper, vermilion-light (`#ff6b4e`) on the desk. Never swap them; the dark tone fails legibility on graphite.

**The Live Line Rule.** Vermilion is reserved for the line in motion: a negative, a subtotal, a total, an error, a hover. It never decorates.

## Typography

**Display Font:** Big Shoulders Display (Arial Narrow, sans-serif), weights 700/800/900, always uppercase
**Body Font:** Hanken Grotesk (system-ui, sans-serif), weights 400/500/700
**Label/Mono Font:** Martian Mono (ui-monospace, monospace), weights 400/500/700

**Character:** A heavy condensed poster face against a neutral reading grotesque, with a monospace that speaks in tape data and button labels.

### Hierarchy
- **Display** (900, 3.2rem / 5rem / 6rem at base / sm / lg, 0.92): the H1 only, uppercase, balanced wrap.
- **Headline** (900, 2.75rem / 3.75rem / 4.5rem, 1.08): section H2s; the manifesto and closing go larger (up to 5rem and 6rem).
- **Title** (800, 2rem-3rem, 1.08): step titles, ledger row titles, plan names (2.25rem), all uppercase.
- **Body** (400, 1.0625rem, 1.6): reading text; lead paragraphs 1.125rem at `leading-relaxed`, measure capped 26-38rem.
- **Label** (700, 0.75-0.875rem, 0.12em tracking, uppercase, Martian Mono): buttons, captions, form labels, tape headers.
- **Figure** (Martian Mono, tabular-nums via `.num`): prices, tape amounts, step numerals. The tape total uses the display face at 3.4rem.

### Named Rules
**The Tabular Rule.** Any number that can change or be compared uses `.num` (Martian Mono, tabular-nums) so digits never shift layout.

**The Three Voices Rule.** Display face for what the tape shouts, mono for what it prints, grotesque for what a person reads. Do not cross them.

## Layout

One centered column, `max-width: 1320px`, side padding 20px (base) / 32px (sm+). Sections use `py-24` (96px), `lg:py-36` (144px); the closing section uses `lg:py-32`. Content sits on a 12-column grid from `lg`: hero 7 + 5 (headline + tape column, tape capped at 430px), steps 5 + 7 with a sticky headline (`top-28`), manifesto 8 + 4, features as a two-column ledger row (0.85fr / 1.3fr), contexts in two equal columns, pricing in three columns divided by hairlines. Below `lg` everything stacks in one column and the tape sits under the headline. Header is sticky, 72px tall, on the desk. Touch targets are 44px minimum (buttons 44-60px, nav rows 52px). Anchor scroll offset is 5rem.

## Elevation & Depth

Flat, with no box-shadow anywhere. Depth is conveyed by ground change (desk to paper), by the torn edge on paper strips that overlap the next dark section (`.tape-serrate-b`, a 14px by 7px sawtooth built with a mask), and by the black paper-slot bar above the tape. The modal is the same paper on a 90% desk scrim.

### Named Rules
**The No-Shadow Rule.** Nothing casts a shadow. If a surface needs separating, use a rule, a ground change or the torn edge.

## Shapes

Square by default (`rounded: 0`); the only declared radius is 2px and no component relies on it. Form language is rules: 1px hairlines between rows, `border-t-2` ink over the features ledger, a 4px top rule on each plan column (vermilion when highlighted, ink otherwise), and a 4px double rule (`.rule-total`) under totals. Dashed hairlines mean forecast. The voided strike (`.void`) is a 0.075em vermilion line through the cap height of struck text, surviving line wraps. The wordmark is two 22 by 4 vermilion-light bars beside the uppercase name.

## Components

### Buttons
- **Shape:** square, mono uppercase, 0.1-0.12em tracking, 700 weight, 44-60px tall.
- **Paper (on desk):** `paper` fill, `ink` text; hover fills `vermilion-light`. Used for header "Começar grátis" and the hero "Escolher plano".
- **Ink (on paper):** `ink` fill, `paper` text; hover fills `vermilion`. Used for the highlighted plan, the closing action and the form submit.
- **Outline (on paper):** 2px `ink` border, transparent; hover inverts to ink fill. Used for non-highlighted plans.
- **Text link:** underlined with an offset (6-7px), the underline color brightens on hover.
- **Focus:** 2px ring offset 3px, `vermilion-light` on desk, `ink` on `.on-paper` surfaces.

### Tape figure (signature)
A 430px column hanging from a black slot bar: a paper strip with a serrated lower edge, printing header, dated note lines, PF/PJ entries in a three-column grid (context code, label, amount), a dashed-rule forecast row, a subtotal row in vermilion, and a final `= SALDO` figure in the display face under a double rule. It is captioned as illustrative sample data. Rows feed out in steps and stay static under reduced motion.

### Ruled list / ledger rows
Rows separated by hairlines (`desk-line` on desk, ink at 15-25% on paper); no boxes. Features use a 2px ink top rule, then `border-b` rows in a title / description grid. Steps use a numeral column (mono, `vermilion-light`) and a dashed final row (the forecast step).

### Plan column
Three columns divided by hairlines, headed by a 4px top rule, plan name, audience, a tabular price with `/mês`, a divided feature list, then a full-width button. The highlighted plan gets the vermilion rule, "· Recomendado" and the ink-filled button.

### Dialog
A paper sheet on the 90% desk scrim, square, up to `max-w-6xl` (plans) or `max-w-lg` (signup); bottom-aligned on mobile, centered from `sm`. Billing cycle is a segmented row bordered top and bottom in ink (active fills ink). Fields are underline-only (2px ink at 30%, becomes solid ink with `paper-shade` fill on focus) with mono uppercase labels; errors print in vermilion under a 2px vermilion top rule. Enters with `modal-in`.

### Motion
- **Feed:** tape rows reveal with `clip-path` in 9 steps over 380ms, staggered 430ms per row, starting only once the tape is in view.
- **Settle:** figures resolve digit by digit over 700ms, left to right, screen readers get the final value.
- **Rise:** sections rise 14px and fade in once over 640ms (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Modal-in:** 10px rise and fade, 260ms, same easing.
- **Reduced motion:** feed, rise, settle and modal entrance are removed, content stays fully visible, transitions collapse to 0.01ms, smooth scroll is off.

## Do's and Don'ts

### Do:
- **Do** alternate desk and paper sections, and give every paper section that precedes a dark one the torn bottom edge.
- **Do** put `on-paper` on any paper surface so focus and selection switch to ink and vermilion.
- **Do** separate content with hairlines and columns, and use dashed rules for anything forecast.
- **Do** set every changing number in Martian Mono with tabular numerals.
- **Do** keep section padding at `py-24 lg:py-36` and the container at 1320px.
- **Do** mark illustrative figures as sample data, as the tape caption does.

### Don't:
- **Don't** add cards, hero mockups, drop shadows or rounded corners; the tape refuses the SaaS hero and card grid.
- **Don't** use vermilion as a background tint, a decoration, or on the desk in its darker tone.
- **Don't** set display type in lowercase or mix the three type voices.
- **Don't** animate without a reduced-motion path that leaves the content visible.
- **Don't** hide meaning in color alone; totals also carry the double rule, forecasts also carry the dash.

## Known drift (recorded, not canonized)

- `tsconfig.app.json` targets `ES2023`, which the installed TypeScript (`~5.4.5`) does not accept.
- Favicon set (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`) uses the wordmark's two bars in vermilion-light on the desk ground; there is no web manifest or maskable icon yet.
- Fonts are self-hosted in `public/fonts` (latin subset woff2, `@font-face` in `src/index.css`); motion is hand-written CSS plus `IntersectionObserver`.
- A third-party JivoChat widget (`code.jivosite.com`, loaded after `load`) floats at the bottom right and carries its own styling outside this system.
- `desk-raised` and `paper-line` are declared in the Tailwind config and unused in components.
