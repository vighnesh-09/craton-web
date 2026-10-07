# Craton brand color palette (for video / motion)

Use these hex values when generating hero / product videos so they match the site.

## Core brand (use in every video)

| Role | Hex | RGB | Notes |
| --- | --- | --- | --- |
| Teal primary | `#0F8F7B` | 15, 143, 123 | Main brand / CTAs |
| Teal deep | `#0B6F60` | 11, 111, 96 | Shadows, depth |
| Teal bright | `#3ECFBA` | 62, 207, 186 | Highlights, dark-mode neon |
| Teal mid | `#2BB89F` | 43, 184, 159 | Gradients |
| Soft teal | `#7ED9C8` | 126, 217, 200 | Glass / 3D core |
| Ember / sand | `#E09A5F` | 224, 154, 95 | Warm accent nodes |
| Ember light | `#F0B27A` | 240, 178, 122 | Dark-mode warm glow |
| Forest ink | `#152821` | 21, 40, 33 | Dark text on light |
| Deep ink | `#0A1412` | 10, 20, 18 | Dark backgrounds |
| Pure white | `#FFFFFF` | 255, 255, 255 | Cards / type on dark |
| Soft cream | `#FAF8F4` | 250, 248, 244 | Warm light fill |
| Mint wash | `#F4F7F5` | 244, 247, 245 | Light page background |

## Light mode (recommended for product explainer video)

```
Background:     #F4F7F5
Surface:        #FFFFFF
Text:           #152821
Muted text:     #3D6B5F
Primary:        #0F8F7B
Primary deep:   #0B6F60
Warm accent:    #E09A5F
Glow orbs:      #78D2C3 · #FFD2AA · #AADCBE
```

**Prompt hint:** soft mint-cream background, frosted glass UI, teal `#0F8F7B` accents, warm sand `#E09A5F` highlights, clean medical-tech mood, liquid glass, no purple, no grey slate.

## Dark mode (recommended for cinematic hero reel)

```
Background:     #0A1412
Surface:        #10201C
Text:           #EEF8F4
Muted text:     #8EBDB0
Primary:        #3ECFBA
Primary deep:   #2AA996
Warm accent:    #F0B27A
Glow:           teal rgba(62,207,186,0.35) + amber rgba(220,140,80,0.22)
```

**Prompt hint:** deep forest-black `#0A1412`, glowing teal `#3ECFBA` evidence nodes, amber `#F0B27A` sparks, smoked glass panels, slow camera orbit, premium MedTech AI aesthetic.

## Gradient (buttons / energy)

```
Light CTA:  linear #2BB89F → #0F8F7B → #0B6F60
Dark CTA:   linear #5EE0CB → #3ECFBA → #1FA892
```

## Avoid

- Purple / violet AI-SaaS look  
- Flat grey `#6C7A89` slate as primary  
- Neon green or harsh red  

## File setup for site

Put finished video in:

```
public/hero/reel.webm   (or .mp4)
public/hero/poster.jpg
```

Then in `.env`:

```
VITE_HERO_VIDEO_URL=/hero/reel.webm
VITE_HERO_POSTER_URL=/hero/poster.jpg
```
