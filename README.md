# Sinless RPG

Currently a work in progress.

## Known Bugs

- [ ] Modifying anything on another tab redirects you to the 1st tab on save
	- Check out Universal Tabletop System & Torg Eternity for examples using ApplicationV2 with tabs
	- Definitely double check how I handle onRender for actor-sheet.mjs
- [ ] You can't change the picture anymore?
- [ ] Setting a pool value to something like -10 sometimes doesn't submit when hitting enter, leaving the value until something else updates

## Requested Enhancements

- [ ] Review the work to convert over to using formGroup and formInput for all the fields

## Future Vision
- [x] PC Sheet MVP
  - [x] Header Section
  - [x] Sidebar Section
  - [x] Charisma bonus for pools
  - [x] Active Skills Page
    - [x] Logic for meta skills
    - [x] Brawn implementation
      - [x] Implement 1 skill
      - [x] Martial Arts
      - [x] Other skills
    - [x] Finess implementation
    - [x] Focus implementation
    - [x] Resolve implementation
  - [x] Secondary Skills Page
    - [x] Ettiquettes
    - [x] Knowledge Skills
    - [x] Rituals
  - [x] Notes Page