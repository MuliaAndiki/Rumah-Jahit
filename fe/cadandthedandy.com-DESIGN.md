# Design System Inspired by Cad & The Dandy

## 1. Visual Theme & Atmosphere

Cad & The Dandy represents the pinnacle of contemporary luxury tailoring—a brand rooted in refined craftsmanship, understated elegance, and modern sophistication. The design system reflects this identity through a disciplined, minimalist aesthetic that prioritizes typography, whitespace, and carefully curated imagery. The palette is deliberately muted and restrained, allowing bespoke garments and lifestyle content to dominate the visual narrative. Every interaction feels intentional and purposeful, as befits a brand serving discerning clientele who value precision, quality, and timeless style over fleeting trends.

**Key Characteristics**

- Serif-driven typography emphasizing heritage and craftsmanship
- Restrained color palette dominated by charcoal, ivory, and pure white
- Generous whitespace and breathing room throughout layouts
- Zero border radius—sharp, architectural lines reflect precision tailoring
- Subtle shadow elevation for depth without ornamentation
- Minimal iconography; content speaks louder than decoration
- Sophisticated navigation structure reflecting editorial elegance

## 2. Color Palette & Roles

### Primary

- **Charcoal Dark** (`#262428`): Primary text color, dominant button backgrounds, strong hierarchy anchors; most frequently used color establishing brand foundation
- **Charcoal Deep** (`#242424`): Secondary dark variant for text-on-light contexts; near-identical to primary for consistency
- **Pure Black** (`#000000`): Sparse use for maximum contrast moments; icons and critical UI elements

### Accent Colors

- **Sage Aqua** (`#AADDDD`): Rare accent for hover states or subtle highlights; provides the only cool-toned departure from neutral palette
- **Mauve Accent** (`#CCAADD`): Reserved accent tone for special moments; underutilized but available for premium tier elements

### Interactive

- **Apple Blue** (`#007AFF`): System link color for web accessibility; used minimally in favor of text styling
- **Accent Muted** (`#ACCE`): Reserved for edge cases or future interactive states

### Neutral Scale

- **Off-White** (`#F0F0F0`): Light surface backgrounds, subtle container fills
- **Light Gray** (`#E6E6E6`): Lighter accent for borders, dividers, or inactive states
- **Mid Gray** (`#DCDCDC`): Form field backgrounds, disabled states
- **Concrete** (`#494949`): Mid-tone text for secondary content or helper text
- **Charcoal Medium** (`#4F4F4F`): Tertiary text variant for fine print or de-emphasized content

### Surface & Borders

- **White** (`#FFFFFF`): Primary background, card surfaces, form inputs in light contexts
- **Forest Green** (`#313B2D`): Alternative input background for dark themed contexts; reflects understated luxury

### Semantic / Status

- **Danger Red** (`#DC3545`): Error indicators, destructive actions, validation failures
- **Alert Orange** (`#FF4500`): Complementary error/warning tone for high-visibility alerts
- **Error Crimson** (`#E83737`): Secondary error state indicator
- **Success Green** (`#28A745`): Confirmation messages, successful form submissions, positive feedback

## 3. Typography Rules

### Font Family

**Primary Font:** Crimson Text (serif)
- Stack: `'Crimson Text', 'Perpetua', 'Garamond', serif`
- Used for all body copy, headings, and navigation text

**Secondary Font:** Perpetua (serif)
- Stack: `'Perpetua', 'Garamond', 'Times New Roman', serif`
- Reserved for editorial moments, special product names, or card titles

**Fallback Philosophy:** All serif fonts cascade to Georgia or Times New Roman for maximum legibility across contexts.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / Hero | Crimson Text | 50px | 400 | 55px | 0px | Page headlines, large promotional text |
| Heading 1 | Crimson Text | 18px | 400 | 25.2px | 0px | Page section titles, CMS headings |
| Heading 2 | Crimson Text | 21.96px | 400 | 30.744px | 0px | Subsection headers, product category labels |
| Navigation | Crimson Text | 20px | 400 | 32px | 0px | Primary menu items, main navigation |
| Body / Paragraph | Crimson Text | 18px | 400 | 28.8px | 0px | Primary reading content, standard text |
| Link / CTA | Crimson Text | 12px | 400 | 30px | 0px | Hyperlinks, call-to-action labels |
| Caption / Label | Perpetua | 20px | 600 | 27px | 0px | Form labels, metadata, product titles |
| Badge / Tag | Crimson Text | 10px | 700 | 20px | 0px | Small status indicators, labels |
| Code / Monospace | Crimson Text | 14px | 400 | 21px | 0px | Code blocks, technical content (fallback to monospace) |

### Principles

- **Serif-First Philosophy:** All typography defaults to serifs, reinforcing heritage and editorial sophistication.
- **Generous Leading:** Line heights exceed font sizes to maximize readability in body text and reduce visual density.
- **Weight Restraint:** Primary font weight is consistently `400` (regular); `600` and `700` reserved for emphasis only.
- **No Letter Spacing Adjustment:** Default tracking maintains Crimson Text's built-in kerning; CSS letter-spacing left at `0px`.
- **Scale Hierarchy:** Intentionally skip intermediate sizes—jump from `18px` body to `50px` display for clear visual separation.
- **Alignment:** All text aligns left; center alignment reserved for hero/display contexts only.

## 4. Component Stylings

### Buttons

**Primary Button (CTA)**
- Background: `#262428`
- Text Color: `#FFFFFF`
- Font: Crimson Text, `18px`, weight `400`
- Padding: `12px 20px`
- Border Radius: `0px`
- Border: None
- Line Height: `28.8px`
- Height: `44px`
- Hover State: Background becomes `#1A1820` (darker shade)
- Focus State: Apply `box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #262428;`
- Disabled: Background `#DCDCDC`, Text `#494949`, cursor `not-allowed`

**Secondary Button**
- Background: `#FFFFFF`
- Text Color: `#262428`
- Font: Crimson Text, `18px`, weight `400`
- Padding: `12px 20px`
- Border Radius: `0px`
- Border: `1px solid #262428`
- Line Height: `28.8px`
- Height: `44px`
- Hover State: Background `#F0F0F0`, border remains `1px solid #262428`
- Focus State: Apply `box-shadow: 0 0 0 2px #F0F0F0, 0 0 0 4px #262428;`

**Ghost Button (Minimal)**
- Background: `transparent`
- Text Color: `#262428`
- Font: Crimson Text, `18px`, weight `400`
- Padding: `12px 0px`
- Border Radius: `0px`
- Border: None
- Line Height: `28.8px`
- Height: auto
- Hover State: Text color becomes `#4F4F4F`
- Focus State: Add underline `text-decoration: underline;`

### Icon Buttons

**Icon Button (Header Navigation)**
- Background: `transparent`
- Text Color: `#262428`
- Font: Crimson Text, `18px`, weight `400`
- Padding: `12px 12px`
- Border Radius: `0px`
- Border: None
- Height: `44px`
- Width: `44px`
- Line Height: `28.8px`
- Hover State: Background `rgba(38, 36, 40, 0.05)`

**Compact Icon Button**
- Background: `transparent`
- Text Color: `#262428`
- Font: Crimson Text, `18px`, weight `400`
- Padding: `0px`
- Border Radius: `0px`
- Border: None
- Height: `20px`
- Width: `20px`
- Line Height: `28.8px`
- Hover State: Opacity `0.7`

### Cards & Containers

**Product Card**
- Background: `transparent`
- Border: None
- Padding: `0px`
- Border Radius: `0px`
- Height: `395px`
- Width: `317px` (responsive to container)
- Text Color: `#242424`
- Font: Crimson Text, `18px`, weight `400`
- Line Height: `27px`
- Box Shadow: None (minimal approach)
- Hover State: Slight image scale `transform: scale(1.02);` transition `0.3s ease`

**Editorial Card (Hero)**
- Background: `transparent`
- Border: None
- Padding: `0px`
- Border Radius: `0px`
- Height: `395px`
- Width: `660px`
- Text Color: `#242424`
- Font: Perpetua, `18px`, weight `400`
- Line Height: `27px`
- Box Shadow: None
- Overlay on image: `rgba(0, 0, 0, 0.2)` for text readability

**Card Title**
- Font: Perpetua, `20px`, weight `600`
- Color: `#242424`
- Line Height: `27px`
- Padding: `16px 0px`
- Margin: `0px`

### Inputs & Forms

**Text Input (Light Theme)**
- Background: `#F0F0F0`
- Text Color: `#242424`
- Font: Crimson Text, `18px`, weight `400`
- Padding: `10px 10px 10px 0px`
- Border Radius: `0px`
- Border: None
- Height: auto
- Width: `100%`
- Line Height: `28.8px`
- Focus State: Background `#FFFFFF`, border-bottom `2px solid #262428`
- Placeholder Color: `#494949`

**Text Input (Dark Theme)**
- Background: `#313B2D`
- Text Color: `#FFFCFC`
- Font: Crimson Text, `18px`, weight `400`
- Padding: `10px 10px 10px 0px`
- Border Radius: `0px`
- Border: None
- Height: `49.7969px`
- Width: `382.688px`
- Line Height: `28.8px`
- Focus State: Border-bottom `2px solid #AADDDD`

**Textarea**
- Background: `#F0F0F0`
- Text Color: `#242424`
- Font: Crimson Text, `18px`, weight `400`
- Padding: `12px 12px`
- Border Radius: `0px`
- Border: None
- Min Height: `120px`
- Width: `100%`
- Line Height: `28.8px`
- Focus State: Background `#FFFFFF`, border-bottom `2px solid #262428`

**Form Label**
- Font: Perpetua, `20px`, weight `600`
- Color: `#262428`
- Line Height: `27px`
- Padding: `0px 0px 8px 0px`
- Display: `block`

### Navigation

**Primary Navigation Menu**
- Background: `#FFFFFF`
- Text Color: `#262428`
- Font: Crimson Text, `20px`, weight `400`
- Padding: `0px 0px 0px 0px`
- Border Radius: `0px`
- Border: None
- Height: `58.7969px`
- Line Height: `32px`
- Hover State: Text color `#4F4F4F`, underline `2px solid #262428`
- Active Link: Text color `#262428`, underline `2px solid #262428`

**Mobile Navigation (Hamburger)**
- Background: `transparent`
- Icon Color: `#262428`
- Font Size: `24px`
- Padding: `12px`
- Hover State: Background `rgba(38, 36, 40, 0.05)`

### Links

**Hyperlink (Inline)**
- Text Color: `#262428`
- Font: Crimson Text, `16px`, weight `400`
- Text Decoration: None
- Line Height: `25.6px`
- Hover State: `text-decoration: underline;`, color `#4F4F4F`
- Focus State: `outline: 2px dashed #262428;`

**Link with Icon**
- Background: `transparent`
- Text Color: `#FFFFFF`
- Font: Crimson Text, `12px`, weight `400`
- Padding: `0px 15px 0px 15px`
- Border Radius: `0px`
- Height: `40px`
- Width: `40px`
- Line Height: `30px`
- Box Shadow: `rgba(0, 0, 0, 0.2) 0px 0px 25px 0px`
- Hover State: Box shadow `rgba(0, 0, 0, 0.4) 0px 0px 30px 0px`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Spacing Scale:**
- `4px` — Micro spacing (padding inside small badges, tight component gutters)
- `8px` — Extra small margins between adjacent elements
- `12px` — Small gaps between form controls, tight column spacing
- `16px` — Standard padding for containers, compact section spacing
- `20px` — Medium padding for buttons and form fields
- `24px` — Medium gaps between card grids, moderate section spacing
- `28px` — Section gap for related content blocks
- `32px` — Large gaps between major sections
- `36px` — Extra large section spacing
- `40px` — Hero-to-content spacing
- `48px` — Page-level section breaks
- `56px` — Maximum vertical spacing between distinct page areas

**Usage Context:**
- Buttons: `12px` vertical, `20px` horizontal padding
- Cards: `24px` gap between items in grid
- Sections: `48px` vertical spacing between major blocks
- Form Fields: `16px` margin-bottom between inputs

### Grid & Container

- **Max Width:** `1440px` for full-width layouts
- **Content Width:** `1200px` for text-heavy pages
- **Column Strategy:** 12-column grid at desktop; responsive to 6-column at tablet, 1-column at mobile
- **Gutters:** `24px` between columns
- **Section Patterns:** Hero spans full width; content sections use centered max-width container with `20px` padding on mobile

### Whitespace Philosophy

Whitespace is not empty space—it is intentional breathing room that emphasizes content hierarchy and luxury. Every layout should prioritize negative space over dense information. Large blocks of white (`#FFFFFF`) and off-white (`#F0F0F0`) backgrounds are encouraged to separate sections and reduce cognitive load. Generous line height (`1.4x` to `1.5x` font size) and padding create visual comfort. The brand philosophy rejects crowded interfaces in favor of curated, editorial presentation.

### Border Radius Scale

- **No Rounding:** `0px` — Default for all components (buttons, inputs, cards, containers); reflects architectural precision
- **Full Circle:** `100%` — Badge indicators and small circular avatars only
- **Note:** The design system deliberately rejects rounded corners (`4px`, `8px`, etc.) in favor of sharp edges that communicate precision and modernity.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| None | No shadow | Cards, primary surfaces, default component state |
| Subtle | `0px 2px 4px rgba(0, 0, 0, 0.05)` | Hover states on cards, light interactive feedback |
| Small | `rgba(0, 0, 0, 0.1) 0px 5px 15px -5px` | Dropdown menus, floating panels |
| Medium | `rgba(0, 0, 0, 0.15) 0px 10px 25px -5px` | Modal overlays, sticky headers |
| Large | `rgba(0, 0, 0, 0.2) 0px 0px 25px 0px` | Hero overlays, elevated buttons |

**Shadow Philosophy:**

Depth is subtle and employed sparingly in this luxury system. Shadows are used to create hierarchy and focus rather than visual clutter. Most interactive elements live flat on `#FFFFFF` or `#F0F0F0` backgrounds with minimal shadow treatment. Dropdowns and floating elements receive small, diffused shadows (`0px 5px 15px -5px`) to lift them off the page without feeling dramatic. The restraint reflects the brand's editorial sophistication—shadow should never distract from content.

## 7. Do's and Don'ts

### Do

- **Use Crimson Text serif typography everywhere.** It is the visual signature of the brand and must remain consistent across all interfaces.
- **Prioritize whitespace and breathing room.** Generous padding, line height, and section spacing create luxury and comfort.
- **Keep all corners sharp with `border-radius: 0px`.** This reflects precision tailoring and modern architecture.
- **Use the charcoal palette (`#262428`, `#242424`) for primary text and CTAs.** These colors dominate the visual language.
- **Apply subtle shadows only to interactive or elevated elements.** Avoid shadow proliferation; most components live flat.
- **Left-align all body text.** Center alignment is reserved for hero headlines and special moments only.
- **Use form inputs with `border-bottom` underlines on focus.** This is the signature interaction pattern for the brand.
- **Maintain consistent padding: `12px` vertical and `20px` horizontal for buttons.** This standard ensures visual cohesion.
- **Test all link colors against backgrounds for WCAG AA contrast.** Ensure minimum `4.5:1` contrast ratio.
- **Reserve accent colors (`#AADDDD`, `#CCAADD`) sparingly.** These are reserved for premium moments or hover states.

### Don't

- **Do not introduce rounded corners.** The brand uses `0px` radius exclusively; no `4px`, `8px`, or `border-radius: 50%;` variants.
- **Do not use sans-serif fonts anywhere in the design system.** All typography must use serif fonts from the Crimson Text / Perpetua stack.
- **Do not use bold text for body copy.** Weight `400` is standard; only labels and badges use `600` or `700`.
- **Do not create competing color hierarchies.** Stick to charcoal for text and white/off-white for backgrounds; avoid introducing new primary colors.
- **Do not add unnecessary shadow to elements.** Shadows are reserved for dropdowns and floating panels; cards and standard containers live flat.
- **Do not center-align body text or long content blocks.** Left alignment improves scannability and reflects editorial design.
- **Do not use color alone to convey status.** Pair color with text labels or icons for accessibility.
- **Do not exceed `48px` between sections in normal flow.** Excessive spacing breaks visual connection; reserve `56px` for major page breaks only.
- **Do not force all buttons to be the same size.** Secondary and ghost buttons may adjust height/padding based on context; only primary CTAs must maintain `44px` minimum height.
- **Do not introduce blue or bright accent colors unless required by accessibility or error states.** The palette is intentionally muted.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | `320px–599px` | Single-column layout, full-width containers with `20px` padding, font sizes reduced by `2px`, navigation collapses to hamburger |
| Tablet | `600px–1023px` | Two-column grid, `12px` column gutters, font sizes at `80%` of desktop, navigation remains horizontal |
| Desktop | `1024px–1439px` | Twelve-column grid, `24px` gutters, full typography scale, multi-column layouts enabled |
| Large Desktop | `1440px+` | Max-width container `1440px` centered, `40px` horizontal padding, full-width hero sections |

### Touch Targets

- **Minimum Size:** `44px × 44px` for all interactive elements (buttons, icon buttons, form inputs)
- **Spacing Between Targets:** Minimum `8px` margin to prevent accidental touches
- **Text Links:** Must be at least `44px` tall in tappable regions; underline on touch devices for clarity
- **Form Fields:** `49.7969px` height on small screens to accommodate thumb-friendly interaction
- **Navigation Items:** Space menu links at least `16px` apart horizontally

### Collapsing Strategy

- **Header Navigation:** On mobile (`< 600px`), replace horizontal menu with hamburger icon (three lines, `24px`). Menu drawer slides from left, full-width overlay.
- **Product Grids:** Desktop: `3 columns` (317px each) with `24px` gutters. Tablet: `2 columns` with `12px` gutters. Mobile: `1 column` full-width with `20px` padding.
- **Hero Sections:** Image scales responsively using `background-size: cover`. Text overlay font sizes reduce by `2px` on tablet, `4px` on mobile.
- **Form Layouts:** Multi-column forms collapse to single column below `600px`. Labels stay inline on desktop; stack above inputs on mobile.
- **Padding Reduction:** Global padding reduces from `20px` desktop to `16px` tablet to `12px` mobile for breathing room on constrained screens.

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA Background:** Charcoal Dark (`#262428`)
- **Primary CTA Text:** White (`#FFFFFF`)
- **Body Text:** Charcoal Deep (`#242424`)
- **Secondary Text:** Charcoal Medium (`#4F4F4F`)
- **Page Background:** White (`#FFFFFF`)
- **Card Background:** Transparent (image-driven)
- **Input Background (Light):** Off-White (`#F0F0F0`)
- **Input Background (Dark):** Forest Green (`#313B2D`)
- **Link Text:** Charcoal Dark (`#262428`)
- **Link Hover:** Charcoal Medium (`#4F4F4F`)
- **Error State:** Danger Red (`#DC3545`)
- **Success State:** Success Green (`#28A745`)
- **Accent Highlight:** Sage Aqua (`#AADDDD`)
- **Border/Divider:** Light Gray (`#E6E6E6`)

### Iteration Guide

1. **Typography First:** All text must use Crimson Text serif font at specified pixel sizes (`18px` body, `20px` nav, `50px` display). No sans-serif alternatives; fallback stack is `'Crimson Text', 'Perpetua', 'Garamond', serif`.

2. **Zero Border Radius Enforced:** All components (buttons, inputs, cards, containers) must have `border-radius: 0px`. No rounding of any kind except badges at `100%`. This is non-negotiable brand architecture.

3. **Color Palette Discipline:** Primary text is `#262428` or `#242424`; backgrounds are `#FFFFFF` or `#F0F0F0`. Do not introduce new primary colors. Accent colors (`#AADDDD`, `#CCAADD`) are reserved for hover states or premium moments only.

4. **Padding Standard:** Primary buttons require `12px 20px` padding (vertical × horizontal). Inputs require `10px 10px 10px 0px`. Form labels require `0px 0px 8px 0px`. Copy-paste these values; do not adjust without brand approval.

5. **Shadow Minimalism:** Only dropdowns and floating panels receive shadows. Default: `rgba(0, 0, 0, 0.1) 0px 5px 15px -5px`. All other components (cards, buttons, containers) have `box-shadow: none`. Shadows are not decorative; they create focus.

6. **Whitespace Breathing:** Vertical section spacing follows the scale (`24px`, `32px`, `40px`, `48px` between blocks). Line height in body text must be at least `1.4x` font size (`28.8px` for `18px` text). Do not condense layouts; space is a design feature.

7. **Focus & Hover Clarity:** All interactive elements must have distinct focus states (outline or border change) and hover states (color or background shift). Test against `#FFFFFF` and `#F0F0F0` backgrounds for `4.5:1` minimum contrast.

8. **Form Field Pattern:** Text inputs default to `#F0F0F0` background. On focus, change background to `#FFFFFF` and add `border-bottom: 2px solid #262428`. Dark theme inputs use `#313B2D` background with `border-bottom: 2px solid #AADDDD` on focus.

9. **Responsive Priority:** Mobile-first development. Base styles target `320px` width. Tablet breakpoint at `600px` adjusts grid and font sizes. Desktop breakpoint at `1024px` enables multi-column layouts. Test all components at all three breakpoints.

10. **Navigation Architecture:** Desktop uses horizontal menu at `20px` font size. Mobile (`< 600px`) collapses to hamburger icon with full-width drawer overlay. Icon color is `#262428`; background is `#FFFFFF` with subtle `rgba(0, 0, 0, 0.05)` hover state.