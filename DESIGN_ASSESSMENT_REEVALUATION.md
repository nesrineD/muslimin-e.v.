I’m converting the high-level redesign into an edit spec with concrete replacements, including where to flatten surfaces, where to keep emphasis, and what to do with the available event imagery.

Read [](file:///Users/Nesrine.Doghri/muslimin-e.v./public/images/veranstaltungen)

Read [](file:///Users/Nesrine.Doghri/muslimin-e.v./src/app/public-landing/page.tsx#1-1), lines 1 to 120

Read [](file:///Users/Nesrine.Doghri/muslimin-e.v./src/app/public-landing/page.tsx#520-520), lines 520 to 551

Use this as the exact edit spec for the redesign. It keeps the current structure mostly intact, but changes the visual rhythm so the pages feel more composed, elegant, and less repetitive.

**Landing Page Spec**
Work in page.tsx.

Hero at page.tsx:
Replace the current layered hero treatment with one calm editorial surface.
Remove the full-width overlay gradient div.
Change the headline from gradient text to a solid heading color.
Reduce the trust badge from a gradient pill to a soft bordered neutral pill.
Remove the decorative emoji from the supporting line.

Use this visual direction:
Hero section background: transparent so the shared page wrapper does the work
Inner content max width: keep max-w-6xl
Headline: text-charcoal-800
Support text: text-charcoal-700
Trust badge: bg-white/80 border border-sand-200 rounded-full shadow-sm
Primary CTA: clay
Secondary CTA: outline or muted sage

Use this replacement copy:
Heading:
Deine Schwesternschaft.
Dein Raum für Bildung, Begegnung und Stärke.

Lead:
Muslimin e.V. verbindet muslimische Frauen in Berlin durch Gemeinschaft, religiöse Bildung und Angebote, die im Alltag tragen.

Support line:
Seit 2011 ehrenamtlich, verlässlich und mit klarem Blick auf die Bedürfnisse von Frauen und Familien.

About teaser at page.tsx:
This section should stop being a second About page.
Replace the 4-card grid with a 2-column teaser: left side short text, right side 3 concise value points.
Keep the link to About, but make the section lighter and flatter.

Change the section background from gradient to a simple warm surface:
Current:
bg-gradient-to-br from-sage-50 via-cream-50 to-coral-50
Replace with:
bg-transparent
Wrap content in:
rounded-2xl border border-sand-200/70 bg-white/80 px-6 py-10 md:px-10 md:py-12

Suggested content:
Label:
Über uns

Heading:
Ein Verein, der Frauen stärkt und Gemeinschaft trägt

Body:
Muslimin e.V. schafft einen geschützten Raum für Bildung, Austausch und gegenseitige Unterstützung. Unser Ziel ist nicht Lautstärke, sondern Verlässlichkeit, Nähe und echte Verbindung.

Value points:
Religiöse Bildung mit Praxisbezug
Geschützter Raum für Frauen und Mädchen
Gemeinschaft über Generationen hinweg

Button:
Mehr über unsere Arbeit

Benefits at page.tsx:
Keep the 3-card structure, but calm the styling down.
Replace the section background gradient with a solid white or cream surface.
Standardize all icon chips so they use one accent logic.

Replace:
bg-gradient-to-br from-sand-50 via-coral-50 to-cream-50
With:
bg-white

Card styling:
rounded-xl border border-sand-200 bg-cream-50/60 shadow-sm
Hover can stay, but should be subtle:
hover:-translate-y-1 hover:shadow-md

Icon chip:
Use one of these consistently:
bg-sage-700 text-white
or
bg-clay-600 text-white

Do not mix sage and coral gradients on icon containers.

Trust or proof moment:
Add one strong proof section between benefits and exploration.
Best option: use one real image plus short proof text instead of another decorative gradient block.

Recommended image:
herbstkonferenz-september-2025.jpeg
Alternatives:
frauenkreis-juni-2025.jpeg
sommerfest-juni-2025.jpeg
workshop-august-2025.jpeg

Layout:
2-column card
Left: photo
Right: short text and 2 or 3 key metrics

Suggested copy:
Heading:
Gemeinschaft, die sichtbar gelebt wird

Body:
Unsere Veranstaltungen, Gesprächskreise und Bildungsangebote schaffen reale Begegnung. Sie verbinden Wissen, Zugehörigkeit und Verantwortung in einem Rahmen, der Frauen ernst nimmt.

Metrics:
Seit 2011 aktiv
Regelmäßige Veranstaltungen und Bildungsangebote
Ehrenamtlich getragen und lokal verankert

Exploration cards at page.tsx:
Keep the feature, but make it navigation, not another visual climax.
Replace the section gradient with white.
Reduce color variation on cards.
Use the card color field less aggressively.

Replace:
bg-gradient-to-br from-sage-50 via-cream-50 to-sand-50
With:
bg-white

Outer wrapper:
rounded-2xl border border-sand-200 bg-sand-50/45 p-6 sm:p-8

Cards:
bg-white border border-sand-200 rounded-xl shadow-sm
Title color: text-charcoal-800
Arrow row: text-sage-700

Social section at page.tsx:
This should become quieter.
Replace the heavy gradient panel with a light bordered card.

Replace:
bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100/80 rounded-2xl shadow-lg border-2 border-sage-200
With:
bg-white rounded-2xl shadow-sm border border-sand-200

Change the title to remove emoji:
Folge uns auf Social Media
And subtitle:
Aktuelle Hinweise, Flyer und Einblicke in unsere Veranstaltungen

Final CTA at page.tsx:
Keep it, but make it a quiet conclusion rather than another ornate box.
Two strong directions work. Pick one and stick to it.

Option A, recommended:
Charcoal closing block
Section background: transparent
Inner wrapper:
rounded-2xl bg-charcoal-800 px-8 py-12 text-center text-cream-50
Primary CTA stays clay
Secondary CTA becomes white outline

Suggested copy:
Heading:
Bereit für den nächsten Schritt?

Body:
Wenn du eine Gemeinschaft suchst, die Bildung, Zugehörigkeit und Unterstützung verbindet, freuen wir uns auf dich.

Primary:
Mitglied werden
Secondary:
Arbeit unterstützen

**About Page Spec**
Work in page.tsx.

Global background decoration at page.tsx:
Remove almost all blurred blobs.
Keep at most one very soft shape behind the hero, or remove all of them.
The page should feel quieter and more institutional.

Hero at page.tsx:
Keep the split structure. It is one of the better layout decisions already present.
Flatten the visual treatment.

Replace:
rounded-[2rem] bg-gradient-to-br from-cream-50/70 via-sand-50/80 to-sage-50/60
With:
rounded-2xl border border-sand-200 bg-white/85 shadow-sm

Remove the internal hero blobs.

Suggested body copy:
Gemeinschaft, Bildung und verlässliche Unterstützung für muslimische Frauen in Berlin seit 2011.

Wer sind wir at page.tsx:
This page should own the deeper explanation.
Keep the section, but make it cleaner and more editorial.

Replace:
rounded-[2rem] border border-sand-200/80 bg-gradient-to-br from-cream-50/95 via-sand-50/90 to-sage-50/75
With:
rounded-2xl border border-sand-200 bg-cream-50/70

Remove the internal blur decoration.
Standardize the inner 4 cards:
bg-white
rounded-xl
border border-sand-200
No alternating warm-cool icon logic
Use sage for all icons except one restrained clay accent if needed

Philosophy at page.tsx:
This section is already close to the right tone.
Do not decorate it further.
Give it more breathing room and let typography do the work.
If you add any accent, keep only the vertical line.

Core goals at page.tsx:
This section needs visual simplification.
Remove the full gradient panel and the top-border color switching across cards.

Replace the wrapper with:
rounded-2xl border border-sand-200 bg-white

Make all 4 cards identical in shell:
rounded-xl border border-sand-200 bg-cream-50/50 p-8 shadow-sm

Differentiate only through icon and content.
Do not alternate sage top border and clay top border.

Stats at page.tsx:
Keep this as the one dramatic dark section on the About page.
This is where the page earns authority.
Do not add any other equally strong visual moment above or below it.

Tighten the copy:
Heading:
Zahlen und Entwicklung
Subhead:
Ein Verein mit gewachsener Reichweite und beständiger Arbeit

CTA at page.tsx:
Simplify it.
Replace the current decorated strip with a calm white or cream band and one strong primary action.

Suggested heading:
Teil unserer Gemeinschaft werden
Suggested body:
Wenn du unsere Arbeit begleiten oder Mitglied werden möchtest, findest du hier den nächsten Schritt.

**System Rules**
Apply these rules to both pages while editing.

Surface rhythm:
Hero
Light warm section
White section
One dark anchor
Light closing section

Radii:
Feature wrappers: rounded-2xl
Standard cards: rounded-xl
Buttons: rounded-lg

Color roles:
Sage = structure
Clay = action
Charcoal = authority
Cream and sand = surfaces

Ornament:
One decorative motif per page maximum
No repeated blob fields
No small mixed-temperature gradients
No gradient text unless the color shift is actually visible

CTA hierarchy:
One primary CTA in hero
One primary CTA in the closing section
Everything else should be secondary or text links

**Exact Order To Implement**
1. Flatten gradients and remove blob noise on both pages.
2. Turn the landing About section into a teaser.
3. Normalize card shells, radii, and icon chips.
4. Add one real image-driven proof moment on the landing page.
5. Keep the dark institutional proof section on the About page only.
6. Re-check CTA repetition and remove any section that still feels like a second hero.
