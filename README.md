# Lalibela Cuisine — Complete Website Redesign

A modern responsive React + Vite redesign of Lalibela Cuisine.

## Important image note

The visual assets in `public/images/` are crops of the authentic Lalibela Cuisine photographs visible in the screenshots supplied for this redesign. They are included so the project runs immediately without generated/stock food photography.

For production, replace those crops with the original full-resolution photographs from the restaurant's existing website/gallery while keeping the same filenames. No layout code needs to change.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Main integrations preserved

- Reservation: https://lalibelacuisine.com/book-table-african-food-toronto/
- Menu: https://lalibelacuisine.com/best-ethiopian-toronto-menu/
- Online ordering: https://order.orderonthego.com/web/Lalibela-Cuisine/main
- Location: 1214 Danforth Ave, Toronto, ON M4J 1M6
- Phone: (416) 645-0486

## Notes

The original Danforth website is the source of truth for its content. Verify current business hours, social URLs, ordering destination, and menu before production deployment because restaurant information can change.

The redesign intentionally removes old WordPress/template remnants from the public UI and focuses on food, hospitality, Ethiopian coffee culture, restaurant atmosphere, reservation, ordering, and location.