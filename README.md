# Sinless RPG

Currently a work in progress.

## Known Bugs

- [x] Modifying anything on another tab redirects you to the 1st tab on save
	- Check out Universal Tabletop System & Torg Eternity for examples using ApplicationV2 with tabs
	- Definitely double check how I handle onRender for actor-sheet.mjs
	- Actual issue was binding my tabs in onRender. Moved over to onFirstRender instead.
	- Nope, wrong approach entirely. Try this: https://foundryvtt.wiki/en/development/guides/Tabs-and-Templates/Tabs-in-AppV2
	- Why do I have to manually change tab to the active tab in first render?
	- Turns out based on my implementation (tabs internal not as PARTS), tab.cssClass wasn't populating on initialization. Now I use tabs.<tabname>.cssClass
- [x] You can't change the picture anymore?
- [ ] Setting a pool value to something like -10 sometimes doesn't submit when hitting enter, leaving the value until something else updates

## Requested Enhancements

- [ ] Review the work to convert over to using formGroup and formInput for all the fields
- [ ] Magical talent field
- [ ] Lifestyle tracking
- [ ] Simplified list form of skills?
- [ ] Skill specialization...
- [ ] Heritage traits so much
- [ ] Gear tracking pls
- [ ] Cyberware too

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
  - [ ] Inventory
    - [ ] Drag & Drop functionality
    - [ ] Divide into the various item types:
      - [ ] Spells
      - [ ] Heritage traits
      - [ ] Cybertechtronics
      - [ ] Gear