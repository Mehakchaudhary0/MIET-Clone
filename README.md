# MIET Website — Multi-Page Front-End Reproduction

A front-end reproduction of the public structure of **https://miet.ac.in/**, rebuilt as a
proper multi-page static site: separate HTML/CSS/JS, a real `assets/images/` tree, and one
local page for every navigation link so nothing 404s.

This is an unofficial, educational reproduction. It is **not affiliated with or endorsed by
MIET**, and it does not use MIET's real logo, photos or copyrighted text — see "About the
images" below.

## How to run

Open `index.html` in any browser. No build step, no server, no dependencies beyond two
Google Fonts requests. (The embedded Google Map on `pages/contact.html` and the two YouTube
links in the footer are the only things that need an internet connection.)

## Folder structure

```
miet-exact-clone/
├── index.html                  Home page
├── pages/                      81 pages total — every nav link resolves locally
│   ├── about-overview.html, chairman-message.html, ... (About Us)
│   ├── academic-calendar.html, departments.html, dept-*.html ... (Academics, 16 depts)
│   ├── eligibility-criteria.html, online-registration.html ... (Admissions)
│   ├── placements.html, alumni.html, contact.html
│   ├── student-rule.html, clubs-societies.html, photo-gallery.html, kolaahal.html ... (Life @MIET)
│   ├── feepayment-*.html, emi-education-loan.html ... (Fee Payment)
│   ├── media.html, student-review.html, podcast.html
│   ├── research.html, iarc.html, icc.html
│   └── ~28 further stub pages (Notices, Downloads, Grievance, Career, NAAC, NIRF, etc.)
├── assets/
│   ├── css/style.css           All component/layout styles
│   ├── css/responsive.css      All @media breakpoints (1080/980/768/560/400px)
│   ├── js/nav.js                Mobile menu, sticky header, back-to-top, current-link highlight
│   ├── js/slider.js             Academics tab switcher + logo-rail marquee looping
│   ├── js/counters.js           Animated stat counters (IntersectionObserver)
│   ├── js/gallery.js            Lightbox for the photo gallery page
│   ├── js/forms.js              Front-end validation + simulated success state
│   └── images/
│       ├── logo/                logo.png, favicon.png, logo-footer.png
│       ├── banners/              hero-bg.jpg, inner-banner.jpg
│       ├── campus/, events/, academics/, people/, accreditations/, recruiters/
│       └── placeholders/        generic.jpg (used by stub pages)
└── README.md
```

## About the images — please read before publishing anywhere public

I don't have the ability to browse or download files from the internet, so I could not fetch
MIET's real logo, campus photos, or recruiter logos. Separately, I wouldn't ship their real
logo/photos in a clone even if I could — that's their trademark and copyrighted material.

**Every image in this project is one I generated myself** with simple original graphics
(gradients, basic shapes, generated text badges) — not copies or edits of anything from
miet.ac.in. They are clearly generic:

- `assets/images/logo/logo.png` — an original circular monogram badge, not MIET's real logo
- `assets/images/accreditations/aa1.png … aa5.png` — generic badge shapes, not real AICTE/NAAC/NBA/AKTU/UGC logos
- `assets/images/recruiters/rec1.png … rec20.png` — generic colored name-tiles, not real company logos
- `assets/images/people/*.jpg` — generic silhouette avatars, not photos of any real person
- `assets/images/campus/*.jpg`, `events/*.jpg`, `banners/*.jpg` — abstract gradient/geometric art, not real campus photos

**To use real assets**, drop your own files into the matching folder using the same filename
(e.g. replace `assets/images/logo/logo.png` with the real MIET logo at the same aspect ratio)
— no HTML changes are needed, every page already points at that path.

If this project is heading anywhere public — a personal portfolio, a submission, a live
domain — replace the generated logo/photos with your own original branding first, since a
publicly-hosted copy that still uses "MIET" as its name and identity is presenting itself as
the institute.

## Content notice — leadership "message" pages

Pages like `chairman-message.html`, `vice-chairman-message.html`, `campus-director-message.html`,
`placement-director-message.html`, and the "Head of Placements" note on `placements.html` are
left as **structural placeholders** rather than invented quotes. Those messages belong to real,
named individuals, and I didn't think it was right to fabricate first-person statements and
attribute them to real people. Photos on those pages are generic silhouette placeholders for
the same reason. Replace the placeholder text with the verified message from MIET's own source.

## Known gaps / limitations

- **Two nav templates on the real site.** miet.ac.in's homepage and its inner `.php` pages
  actually use two different header/nav designs (the home page has one nav tree; pages like
  `placements.php` and `contact-us.php` use an older, deeper mega-menu with extra sections
  like Department, COE, CF). This project standardizes on **one** consistent header/footer
  across every page — deliberately, since mixing both would look broken rather than faithful.
  If you specifically want the older mega-menu style replicated too, that's a follow-up.
- **Fee amounts, dates, calendars, board-member names** are marked with an on-page notice
  and left as placeholders — I didn't have a verified current source for these and didn't
  want to invent numbers that look official.
- **Forms don't submit anywhere.** `online-registration.html` and `contact.html` validate
  input and show a success message, but there is no backend. Wire up a real endpoint (or a
  service like Formspree) before relying on this for real enquiries.
- **~28 pages are intentionally light stubs** (Notices, Downloads, Grievance, Career,
  Committees/Cells, NAAC, NIRF, Facilities, Library, Virtual Tour, Idea Lab, Miyawaki, the
  16 department pages, etc.). Each has the full site header/footer/nav and a short descriptive
  paragraph, with a visible placeholder notice — they exist so no nav link 404s locally, not
  as finished content.
- Colors/typography/spacing were matched by reading the site's HTML structure, not by
  inspecting its live computed CSS (I can't render or screenshot pages), so treat this as a
  close approximation rather than a pixel-exact match.

## Editing

- Global styles: `assets/css/style.css` (components) and `assets/css/responsive.css` (breakpoints).
- Add a new page: copy an existing file under `pages/`, keep the same `<header>`/`<footer>`
  block structure so nav stays consistent, and add the link into every page's nav — or ask me
  to add it and I'll regenerate consistently.
- Nav, footer columns, and floating action buttons are the same include-like block repeated
  on every page (no server-side includes in a static zip), so a nav change means updating it
  across pages — templated generation was used to build this project for exactly that reason.
