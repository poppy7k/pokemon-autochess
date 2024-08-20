# New Pokemons:

- Sableye
- Pheromosa
- Dracovish
- Corsola
- Galar Gorsola
- Cursola
- Gimmighoul
- Gholdengo
- Phantump
- Trevenant

# Changes to Pokemon & Abilities

- Added sprites for Vanilluxe and Dragapult
- Nerf Attract: duration ~~2.5~~ 1 second
- Nerf Lotad line HP: ~~80/150/260~~ 60/115/220, def/spedef: ~~2/3/4~~ 1/2/3
- Buff Comfey HP ~~100~~ 150, Attack ~~10~~ 15
- Tandemaus is now tier-2, Maushold (4) is now tier-4; added several tiers of damage for Population Bomb
- Buff Maushold HP: ~~190/230~~ 200/240 Attack: ~~19/23~~ 20/24
- Nerf Hitmontop: Attack ~~22~~ 20, PP ~~75~~ 80
- Buff Hitmonlee: Attack ~~25~~ 30
- Buff Hoopa HP ~~150~~ 180
- Tropius: added Grass synergy ; adjusted passive: At the start of each fight, add a random berry to pokemon items. **If full, berry is added to player items instead.**
- Buff Mankey Attack ~~8~~ 10
- Buff Primeape Attack ~~21~~ 26, spe def ~~2~~ 4
- Nerf Xurkitree: Attack ~~20~~ 16 ; nerf Charge beam: ~~80~~ 60 special damage, no longer increase AP per missed target
- Nerf Iron Bundle Spe def ~~4~~ 2
- Nerf Aurora Beam damage: ~~30/60/120~~ 25/50/100
- Buff Kartana HP: ~~200~~ 230, Spe def: ~~1~~ 2 PP: ~~70~~ 65
- Nerf Altaria Hyper voice ~~50/100/200~~ 45/90/200
- Nerf Disarming Voice ~~10/20/40~~ 10/20/30 PP
- Nerf Chimecho pp ~~80~~ 90
- Nerf Regieleki pp ~~80~~ 90
- Buff Stoutland retaliate ability ~~5/10/20~~ 10/15/25 additional damage
- Nerf Aurora Veil (Alolan Vulpix): rune protect duration ~~3~~ 0.5 seconds
- New ability for Celebi: Time travel: Go back in time to retrieve the lost health. All allies have their negative status cleared and are healed by 20 HP (scales with AP). The player also heals 1 HP.
- Nerf Drizzile Attack ~~26~~ 23 HP ~~240~~ 200
- Buff Breloom Attack ~~15~~ 18
- Buff Maractus Spe def ~~3~~ 4 Attackk ~~15~~ 16 PP ~~100~~ 85
- Buff Retaliate ability (Stoutland) ~~5/10/20~~ 10/15/25 additional damage
- Buff Seedot line, Attack ~~5/9/20~~ 6/10/22, Def/Spedef ~~2/2/2~~ 2/3/4
- Buff Virizion: PP ~~150~~ 140, Sacred sword damage ~~90~~ 100
- Buff Hariyama HP ~~170~~ 200
- Buff Spinda Attack ~~20~~ 25
- New ability for Regigigas: Crush Grip: The target is crushed with great force. The more HP the target has left, the greater the damage: between 20 and 200 physical damage
- Nerf Axew line Attack ~~12/24/36~~ 10/20/30
- Buff Charge (Zapdos): ~~20~~ 30% Attack and Attack Speed
- Buff Stealth rocks (Regirock): increase range to 2

# Changes to Synergies

- Artificial rework: now give unique artificial items randomized at every game (see Items section)
- Nerf Aquatic: 35/45/55% chance to drain 20 PP from target
- Nerf Ice: ~~2/4/8/15/30~~ 2/3/6/12/24 Spe def
- Add Baby 7: Golden Eggs: Eggs can be sold for 10 gold
- Light adjustments:
  - (2) Shining Ray: Increase AP and Atttack by 30%
  - (3) Light Pulse: Also give +10 PP per second
  - (4) Eternal Light: Also give 30% Attack Speed and Rune Protect for 10 seconds
  - (5) Max Illumination: Also give 100 Shield and Resurection
- Add Ground 8, removed ground effect cap, changed Sandstorm threshold to 8 units
- Psy 6 Eerie Spell also give the same chance to find Unown in shop as Psy 4 Light Screen
- Buff Normal: ~~10/25/35/55~~ 15/25/40/55 shield

# Changes to Items

Added artificial items, obtained through Artificial synergy:

- Electirizer: +40% Attack Speed ; Every attack received inflicts PARALYSIS for 4 seconds to both the attacker and the holder
- Magmarizer: +8 Attack ; Every successful attack increase ATK by 1 and inflicts BURN for 4 seconds
- Exp Share: Get the best values of Attack, Defense and Special Defense from adjacent allies in the same row
- Macho Brace: +15 Attack, -25% attack speed; gives Fighting synergy
- Light Ball: +75% AP, gives Light synergy
- Toxic Orb: +100% Attack, gives Poison synergy, holder is poisonned for the whole fight
- Metronome: Gives SOUND synergy. Every second, the holder gains 5 PP
- Metal Coat: Gives STEEL synergy. Reduce incoming damage by 20%
- Swift Wing: Gives FLYING synergy. Gain 10% chance to dodge attacks
- Hard Stone: +100 Shield ; Gives ROCK synergy
- Big Nugget: Gives GROUND synergy. If the holder is alive after 15 seconds and gets 5 stacks of Ground synergy effect, gain 3 GOLD
- Incense: Gives FLORA synergy. Every attack received has a 10% chance to make the attacker charmed for 2 seconds

# Bugfix

- Arceus/Kecleon dynamic synergies should now also work in bot builder / team planner
- Fix Munchlax sometimes not carrying over its HP stacked to Snorlax
- Units now retarget correctly to the charmer after being charmed
- Prevent some ability animations to loop
- Fix Prismatic Laser animation position
- Ultra Necrozma and Cherrim Sunlight now correctly transforms back when light synergy is lost

# Misc

- New status Curse: KOs the unit at the end of the time limit
- Matchmaking now also takes into account how long ago you fighted an opponent in addition to how many times you fighted him. That means there are less chances to fight the same opponent twice in a row, but the matchmaking is more predictable than before.
- Improve targeting by addding a second targeting algorithm for targets at range, more performant and precise than the previous one
- Reduce lag when switching between moving state and attacking state
- Minimum attack stat value is now 1 instead of 0
- Self damage is no longer counted in DPS report (example: Flame orb)
- Increased duration of stage 10 and 20 pick phase from 40 to 45 seconds
- Changed shop rarities percentages per level ; uncommon are more common at levels 5-6, commons are less common at levels 6-9. Full details [here](https://discord.com/channels/737230355039387749/1184447560845377719)
- Another ranked lobby opens when the previous one is full
- Further compress animations to improve loading times
- Add a random additional retention delay for bots on carousels, between 1 and 6 seconds
- New title: Glutton: Get a Snorlax with more than 750 base HP
- Shiny Mewtwo at round 15 will give an artificial item
- Increase chances to get shiny wild pokemons on PVE stages (1/20 chance)
- Light cell is now on a fixed position for bots, indicated in bot builder
- Fix Comfey applying twice the on-cast effects and the skill animation for its holder
- Fix magic bounce procing even when the opponent ability deals no damage