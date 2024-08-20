import { Synergy } from "./Synergy"

export enum DungeonMusic {
  AEGIS_CAVE = "Aegis Cave",
  AMP_PLAINS = "Amp Plains",
  A_NEW_WORLD = "A New World",
  APPLE_WOODS = "Apple Woods",
  AT_THE_SNOWY_MOUNTAIN = "At the Snowy Mountain",
  AT_THE_END_OF_THE_DAY = "At the End of the Day", // UNUSED
  BARREN_VALLEY = "Barren Valley",
  BATTLE_WITH_RAYQUAZA = "Battle with Rayquaza",
  BEACH_CAVE = "Beach Cave",
  BLIZZARD_ISLAND = "Blizzard Island Rescue Team Medley",
  BOSS_BATTLE = "Boss Battle!",
  BOULDER_QUARRY = "Boulder Quarry",
  BRINE_CAVE = "Brine Cave",
  BURIED_RELIC = "Burned Relic",
  CAVE_AND_SIDE_PATH = "Cave and Side Path",
  CHASM_CAVE = "Chasm Cave",
  CONCEALED_RUINS = "Concealed Ruins",
  CRAGGY_COAST = "Craggy Coast",
  CRYSTAL_CAVE = "Crystal Cave",
  CRYSTAL_CROSSING = "Crystal Crossing",
  DARK_CRATER = "Dark Crater",
  DARK_HILL = "Dark Hill",
  DARK_ICE_MOUNTAIN = "Dark Ice Mountain",
  DARK_WASTELAND = "Dark Wasteland",
  DEEP_DARK_CRATER = "Deep Dark Crater",
  DEEP_DUSK_FOREST = "Deep Dusk Forest",
  DEEP_STAR_CAVE = "Deep Star Cave",
  DEFY_THE_LEGENDS = "Defy the Legends",
  DRENCHED_BLUFF = "Drenched Bluff",
  DUN_HONOO_2 = "Dun Honoo 2",
  DUSK_FOREST = "Dusk Forest",
  ESCAPE_THROUGH_THE_SNOW = "Escape Through the Snow",
  FAR_AMP_PLAINS = "Far Amp Plains",
  FOGGY_FOREST = "Foggy Forest",
  FORTUNE_RAVINE = "Fortune Ravine",
  FORTUNE_RAVINE_DEPTHS = "Fortune Ravine Depths", // UNUSED
  FRIEND_AREA_CAVES = "Friend Area ~ Caves",
  FRIEND_AREA_FOREST = "Friend Area ~ Forest",
  FRIEND_AREA_GRASSLANDS = "Friend Area - Grasslands",
  FRIEND_AREA_OCEANIC = "Friend Area ~ Oceanic",
  FRIEND_AREA_LAB = "Friend Area - Lab",
  FRIEND_AREA_POND = "Friend Area - Pond",
  FRIEND_AREA_STEPPE = "Friend Area - Steppe",
  FRIEND_AREA_SWAMP = "Friend Area - Swamp",
  FRIEND_AREA_WILDS = "Friend Area - Wilds",
  FROSTY_FOREST = "Frosty Forest",
  FROSTY_GROTTO = "Frosty Grotto",
  GARDEVOIR_INSIDE_OF_A_DREAM = "Gardevoir Inside of a Dream",
  GOODNIGHT = "Goodnight",
  GREAT_CANYON = "Great Canyon",
  GROWING_ANXIETY = "Growing Anxiety",
  HIDDEN_HIGHLAND = "Hidden Highland",
  HIDDEN_LAND = "Hidden Land",
  I_SAW_SOMETHING_AGAIN = "I Saw Something Again",
  ICICLE_FOREST = "Icicle Forest",
  ILLUSION_STONE_CHAMBER = "Illusion Stone Chamber",
  IN_THE_FUTURE = "In the Future",
  IN_THE_HANDS_OF_FATE = "In the Hands of Fate", // UNUSED
  IN_THE_NIGHTMARE = "In the Nightmare",
  JOB_CLEAR = "Job Clear!",
  KECLEONS_SHOP = "Kecleon's Shop",
  LAPIS_CAVE = "Lapis Cave",
  LIMESTONE_CAVERN = "Limestone Cavern",
  LIVING_SPIRIT = "Living Spirit",
  LOWER_BRINE_CAVE = "Lower Brine Cave",
  LUDICOLO_DANCE = "Ludicolo Dance", // UNUSED
  MAGMA_CAVERN = "Magma Cavern",
  MAGMA_CAVERN_PIT = "Magma Cavern Pit",
  MAKUHITA_DOJO = "Makuhita Dojo",
  MAROWAK_DOJO = "Marowak Dojo",
  MIRACLE_SEA = "Miracle Sea",
  MONSTER_HOUSE = "Monster House!",
  MT_BLAZE = "Mt. Blaze",
  MT_BRISTLE = "Mt. Bristle",
  MT_FREEZE = "Mt. Freeze",
  MT_HORN = "Mt. Horn",
  MT_STEEL = "Mt. Steel",
  MT_THUNDER = "Mt. Thunder",
  MT_THUNDER_PEAK = "Mt. Thunder Peak",
  MT_TRAVAIL = "Mt. Travail",
  MURKY_FOREST = "Murky Forest",
  MYSTIFYING_FOREST = "Mystifying Forest",
  NORTHERN_DESERT = "Northern Desert",
  OH_NO = "Oh No!",
  ON_THE_BEACH_AT_DUSK = "On the Beach at Dusk",
  OUTLAW = "Outlaw!",
  PERSONALITY_TEST = "Personality Test",
  PLANETS_PARALYSIS = "Planet's Paralysis",
  POKEMON_SQUARE = "Pokemon Square",
  PROTECTED_WORLD_PEACE = "Protected World Peace",
  QUICKSAND_CAVE = "Quicksand Cave",
  QUICKSAND_PIT = "Quicksand Pit",
  RANDOM_DUNGEON_1 = "Random Dungeon 1",
  RANDOM_DUNGEON_2 = "Random Dungeon 2",
  RANDOM_DUNGEON_3 = "Random Dungeon 3",
  RESCUE_TEAM_BASE = "Rescue Team Base",
  RISING_FEAR = "Rising Fear",
  RUN_AWAY = "Run Away",
  SEALED_RUIN_PIT = "Sealed Ruin Pit",
  SHAYMIN_VILLAGE = "Shaymin Village",
  SILENT_CHASM = "Silent Chasm",
  SINISTER_WOODS = "Sinister Woods",
  SKY_PEAK_CAVE = "Sky Peak Cave",
  SKY_PEAK_COAST = "Sky Peak Coast",
  SKY_PEAK_FINAL_PASS = "Sky Peak Final Pass",
  SKY_PEAK_FOREST = "Sky Peak Forest",
  SKY_PEAK_PRAIRIE = "Sky Peak Prairie",
  SKY_PEAK_SNOWFIELD = "Sky Peak Snowfield",
  SKY_TOWER = "Sky Tower",
  SKY_TOWER_SUMMIT = "Sky Tower Summit",
  SOUTHERN_JUNGLE = "Southern Jungle",
  SPACIAL_CLIFFS = "Spacial Cliffs",
  SPINDA_CAFE = "Spinda's Cafe", // UNUSED
  SPRING_CAVE = "Spring Cave",
  SPRING_CAVE_DEPTHS = "Spring Cave Depths",
  STAFF_ROLL = "Staff Roll",
  STAR_CAVE = "Star Cave",
  STEAM_CAVE = "Steam Cave",
  STOP_THIEF = "Stop! Thief!",
  STORMY_SEA = "Stormy Sea",
  SURROUNDED_SEA = "Surrounded Sea",
  TEAM_CHARM_THEME = "Team Charm's Theme",
  TEAM_SKULL = "Team Skull",
  TEMPORAL_PINNACLE = "Temporal Pinnacle",
  TEMPORAL_SPIRE = "Temporal Spire",
  TEMPORAL_TOWER = "Temporal Tower",
  THE_LEGEND_OF_NINETALES = "The Legend of Ninetales",
  THE_POWER_OF_DARKNESS = "The Power of Darkness",
  THERES_TROUBLE = "There's Trouble!",
  THROUGH_THE_SEA_OF_TIME = "Through the Sea of Time",
  THUNDERWAVE_CAVE = "Thunderwave Cave",
  TIME_GEAR = "Time Gear",
  TIME_GEAR_REMIX = "Time Gear Remix",
  TINY_WOODS = "Tiny Woods",
  TOP_MENU_THEME = "Top Menu Theme",
  TREASURE_TOWN = "Treasure Town",
  TREESHROUD_FOREST = "Treeshroud Forest",
  UPPER_STEAM_CAVE = "Upper Steam Cave",
  VAST_ICE_MOUNTAIN = "Vast Ice Mountain",
  VAST_ICE_MOUNTAIN_PEAK = "Vast Ice Mountain Peak",
  VERSUS_BOSS = "Versus Boss",
  VERSUS_LEGENDARY = "Versus Legendary",
  WATERFALL_CAVE = "Waterfall Cave",
  WELCOME_TO_THE_WORLD_OF_POKEMON = "Welcome To the World of Pokemon!",
  WIGGLYTUFFS_GUILD = "Wigglytuff's Guild",
  WIGGLYTUFFS_GUILD_REMIX = "Wigglytuff's Guild Remix",
  WORLD_CALAMITY = "World Calamity"
}

export enum DungeonPMDO {
  AmpPlains = "AmpPlains",
  AppleWoods = "AppleWoods",
  BarrenValley = "BarrenValley",
  BeachCave = "BeachCave",
  BrineCave = "BrineCave",
  BuriedRelic1 = "BuriedRelic1",
  BuriedRelic2 = "BuriedRelic2",
  BuriedRelic3 = "BuriedRelic3",
  ConcealedRuins = "ConcealedRuins",
  CraggyCoast = "CraggyCoast",
  CrystalCave1 = "CrystalCave1",
  CrystalCave2 = "CrystalCave2",
  CrystalCrossing = "CrystalCrossing",
  DarkCrater = "DarkCrater",
  DarkHill1 = "DarkHill1",
  DarkHill2 = "DarkHill2",
  DarkIceMountain = "DarkIceMountain",
  DarkIceMountainPeak = "DarkIceMountainPeak",
  DarknightRelic = "DarknightRelic",
  DarkWasteland = "DarkWasteland",
  DeepBoulderQuarry = "DeepBoulderQuarry",
  DeepDarkCrater = "DeepDarkCrater",
  DeepDuskForest1 = "DeepDuskForest1",
  DeepDuskForest2 = "DeepDuskForest2",
  DeepLimestoneCavern = "DeepLimestoneCavern",
  DeepSealedRuin = "DeepSealedRuin",
  DesertRegion = "DesertRegion",
  DrenchedBluff = "DrenchedBluff",
  DuskForest1 = "DuskForest1",
  DuskForest2 = "DuskForest2",
  ElectricMaze = "ElectricMaze",
  FarAmpPlains = "FarAmpPlains",
  FinalMaze2 = "FinalMaze2",
  FoggyForest = "FoggyForest",
  ForestPath = "ForestPath",
  FrostyForest = "FrostyForest",
  FutureTemporalSpire = "FutureTemporalSpire",
  FutureTemporalTower = "FutureTemporalTower",
  GoldenChamber = "GoldenChamber",
  GrassMaze = "GrassMaze",
  GreatCanyon = "GreatCanyon",
  HiddenHighland = "HiddenHighland",
  HiddenLand = "HiddenLand",
  HowlingForest1 = "HowlingForest1",
  HowlingForest2 = "HowlingForest2",
  IceAegisCave = "IceAegisCave",
  IceMaze = "IceMaze",
  IcicleForest = "IcicleForest",
  JoyousTower = "JoyousTower",
  LapisCave = "LapisCave",
  LightningField = "LightningField",
  LimestoneCavern = "LimestoneCavern",
  LowerBrineCave = "LowerBrineCave",
  LushPrairie = "LushPrairie",
  MagmaCavern2 = "MagmaCavern2",
  MagmaCavern3 = "MagmaCavern3",
  MeteorCave = "MeteorCave",
  MiracleSea = "MiracleSea",
  MoonlitCourtyard = "MoonlitCourtyard",
  MtBlaze = "MtBlaze",
  MtBristle = "MtBristle",
  MtFaraway2 = "MtFaraway2",
  MtFaraway4 = "MtFaraway4",
  MtFreeze = "MtFreeze",
  MtHorn = "MtHorn",
  MtSteel1 = "MtSteel1",
  MtSteel2 = "MtSteel2",
  MtThunder = "MtThunder",
  MtThunderPeak = "MtThunderPeak",
  MtTravail = "MtTravail",
  MurkyCave = "MurkyCave",
  MurkyForest = "MurkyForest",
  MysteryJungle1 = "MysteryJungle1",
  MysteryJungle2 = "MysteryJungle2",
  MystifyingForest = "MystifyingForest",
  NorthernDesert1 = "NorthernDesert1",
  NorthernDesert2 = "NorthernDesert2",
  NorthernRange1 = "NorthernRange1",
  NorthernRange2 = "NorthernRange2",
  NorthwindField = "NorthwindField",
  PitfallValley1 = "PitfallValley1",
  PoisonMaze = "PoisonMaze",
  PurityForest2 = "PurityForest2",
  PurityForest4 = "PurityForest4",
  PurityForest6 = "PurityForest6",
  PurityForest7 = "PurityForest7",
  QuicksandCave = "QuicksandCave",
  QuicksandPit = "QuicksandPit",
  QuicksandUnused = "QuicksandUnused",
  RescueTeamMaze = "RescueTeamMaze",
  RockAegisCave = "RockAegisCave",
  RockMaze = "RockMaze",
  RockPathRB = "RockPathRB",
  RockPathTDS = "RockPathTDS",
  SealedRuin = "SealedRuin",
  SidePath = "SidePath",
  SilentChasm = "SilentChasm",
  SkyPeak4thPass = "SkyPeak4thPass",
  SkyPeak7thPass = "SkyPeak7thPass",
  SkyPeakSummitPass = "SkyPeakSummitPass",
  SkyTower = "SkyTower",
  SnowPath = "SnowPath",
  SolarCave1 = "SolarCave1",
  SouthernCavern1 = "SouthernCavern1",
  SouthernCavern2 = "SouthernCavern2",
  SouthernJungle = "SouthernJungle",
  SpacialCliffs = "SpacialCliffs",
  SpacialRift1 = "SpacialRift1",
  SpacialRift2 = "SpacialRift2",
  SteamCave = "SteamCave",
  SteelAegisCave = "SteelAegisCave",
  StormySea1 = "StormySea1",
  StormySea2 = "StormySea2",
  SurroundedSea = "SurroundedSea",
  TemporalSpire = "TemporalSpire",
  TemporalTower = "TemporalTower",
  TemporalUnused = "TemporalUnused",
  TestDungeon = "TestDungeon",
  TheNightmare = "TheNightmare",
  ThunderwaveCave = "ThunderwaveCave",
  TinyMeadow = "TinyMeadow",
  TinyWoods = "TinyWoods",
  TreeshroudForest1 = "TreeshroudForest1",
  TreeshroudForest2 = "TreeshroudForest2",
  UnusedBrineCave = "UnusedBrineCave",
  UnusedSteamCave = "UnusedSteamCave",
  UnusedWaterfallPond = "UnusedWaterfallPond",
  UproarForest = "UproarForest",
  VastIceMountain = "VastIceMountain",
  VastIceMountainPeak = "VastIceMountainPeak",
  WaterfallCave = "WaterfallCave",
  WaterfallPond = "WaterfallPond",
  WaterMaze = "WaterMaze",
  WesternCave1 = "WesternCave1",
  WesternCave2 = "WesternCave2",
  WishCave1 = "WishCave1",
  WishCave2 = "WishCave2",
  WorldAbyss2 = "WorldAbyss2",
  WyvernHill = "WyvernHill",
  ZeroIsleEast3 = "ZeroIsleEast3",
  ZeroIsleEast4 = "ZeroIsleEast4",
  ZeroIsleSouth1 = "ZeroIsleSouth1",
  ZeroIsleSouth2 = "ZeroIsleSouth2"
}

export interface DungeonPMDODetail {
  synergies: Synergy[]
  music: DungeonMusic
}
export const DungeonDetails: { [key in DungeonPMDO]: DungeonPMDODetail } = {
  [DungeonPMDO.AmpPlains]: {
    synergies: [Synergy.ELECTRIC, Synergy.FIELD, Synergy.AQUATIC],
    music: DungeonMusic.AMP_PLAINS
  },
  [DungeonPMDO.AppleWoods]: {
    synergies: [Synergy.BUG, Synergy.FLORA, Synergy.BABY],
    music: DungeonMusic.APPLE_WOODS
  },
  [DungeonPMDO.BarrenValley]: {
    synergies: [Synergy.ROCK, Synergy.FIGHTING, Synergy.GHOST],
    music: DungeonMusic.BARREN_VALLEY
  },
  [DungeonPMDO.BeachCave]: {
    synergies: [Synergy.AQUATIC, Synergy.GROUND, Synergy.FOSSIL],
    music: DungeonMusic.BEACH_CAVE
  },
  [DungeonPMDO.BrineCave]: {
    synergies: [Synergy.POISON, Synergy.FOSSIL, Synergy.GROUND],
    music: DungeonMusic.BRINE_CAVE
  },
  [DungeonPMDO.BuriedRelic1]: {
    synergies: [Synergy.LIGHT, Synergy.ARTIFICIAL, Synergy.HUMAN],
    music: DungeonMusic.BURIED_RELIC
  },
  [DungeonPMDO.BuriedRelic2]: {
    synergies: [Synergy.GROUND, Synergy.ARTIFICIAL, Synergy.LIGHT],
    music: DungeonMusic.TIME_GEAR_REMIX
  },
  [DungeonPMDO.BuriedRelic3]: {
    synergies: [Synergy.GROUND, Synergy.ARTIFICIAL, Synergy.HUMAN],
    music: DungeonMusic.TIME_GEAR
  },
  [DungeonPMDO.ConcealedRuins]: {
    synergies: [Synergy.POISON, Synergy.WILD, Synergy.GHOST],
    music: DungeonMusic.CONCEALED_RUINS
  },
  [DungeonPMDO.CraggyCoast]: {
    synergies: [Synergy.WATER, Synergy.FIGHTING, Synergy.MONSTER],
    music: DungeonMusic.CRAGGY_COAST
  },
  [DungeonPMDO.CrystalCave1]: {
    synergies: [Synergy.PSYCHIC, Synergy.SOUND, Synergy.DARK],
    music: DungeonMusic.CRYSTAL_CAVE
  },
  [DungeonPMDO.CrystalCave2]: {
    synergies: [Synergy.PSYCHIC, Synergy.SOUND, Synergy.LIGHT],
    music: DungeonMusic.STAFF_ROLL
  },
  [DungeonPMDO.CrystalCrossing]: {
    synergies: [Synergy.PSYCHIC, Synergy.AQUATIC, Synergy.POISON],
    music: DungeonMusic.CRYSTAL_CROSSING
  },
  [DungeonPMDO.DarkCrater]: {
    synergies: [Synergy.DARK, Synergy.FIRE, Synergy.GROUND],
    music: DungeonMusic.DARK_CRATER
  },
  [DungeonPMDO.DarkHill1]: {
    synergies: [Synergy.GHOST, Synergy.DARK, Synergy.FLYING],
    music: DungeonMusic.DARK_HILL
  },
  [DungeonPMDO.DarkHill2]: {
    synergies: [Synergy.GHOST, Synergy.DARK, Synergy.FIELD],
    music: DungeonMusic.I_SAW_SOMETHING_AGAIN
  },
  [DungeonPMDO.DarkIceMountain]: {
    synergies: [Synergy.DARK, Synergy.ICE, Synergy.NORMAL],
    music: DungeonMusic.DARK_ICE_MOUNTAIN
  },
  [DungeonPMDO.DarkIceMountainPeak]: {
    synergies: [Synergy.DARK, Synergy.ICE, Synergy.FLYING],
    music: DungeonMusic.AT_THE_SNOWY_MOUNTAIN
  },
  [DungeonPMDO.DarknightRelic]: {
    synergies: [Synergy.FOSSIL, Synergy.ARTIFICIAL, Synergy.HUMAN],
    music: DungeonMusic.DARK_WASTELAND
  },
  [DungeonPMDO.DarkWasteland]: {
    synergies: [Synergy.DARK, Synergy.POISON, Synergy.MONSTER],
    music: DungeonMusic.CHASM_CAVE
  },
  [DungeonPMDO.DeepBoulderQuarry]: {
    synergies: [Synergy.ROCK, Synergy.STEEL, Synergy.FOSSIL],
    music: DungeonMusic.BOULDER_QUARRY
  },
  [DungeonPMDO.DeepDarkCrater]: {
    synergies: [Synergy.DARK, Synergy.FIRE, Synergy.MONSTER],
    music: DungeonMusic.DEEP_DARK_CRATER
  },
  [DungeonPMDO.DeepDuskForest1]: {
    synergies: [Synergy.GHOST, Synergy.GRASS, Synergy.DARK],
    music: DungeonMusic.DEEP_DUSK_FOREST
  },
  [DungeonPMDO.DeepDuskForest2]: {
    synergies: [Synergy.GHOST, Synergy.GRASS, Synergy.LIGHT],
    music: DungeonMusic.GROWING_ANXIETY
  },
  [DungeonPMDO.DeepLimestoneCavern]: {
    synergies: [Synergy.WATER, Synergy.BUG, Synergy.ROCK],
    music: DungeonMusic.PROTECTED_WORLD_PEACE
  },
  [DungeonPMDO.DeepSealedRuin]: {
    synergies: [Synergy.HUMAN, Synergy.ARTIFICIAL, Synergy.MONSTER],
    music: DungeonMusic.SEALED_RUIN_PIT
  },
  [DungeonPMDO.DesertRegion]: {
    synergies: [Synergy.FIRE, Synergy.FIELD, Synergy.LIGHT],
    music: DungeonMusic.DUN_HONOO_2
  },
  [DungeonPMDO.DrenchedBluff]: {
    synergies: [Synergy.AQUATIC, Synergy.FOSSIL, Synergy.BABY],
    music: DungeonMusic.DRENCHED_BLUFF
  },
  [DungeonPMDO.DuskForest1]: {
    synergies: [Synergy.MONSTER, Synergy.GRASS, Synergy.DARK],
    music: DungeonMusic.DUSK_FOREST
  },
  [DungeonPMDO.DuskForest2]: {
    synergies: [Synergy.GHOST, Synergy.GRASS, Synergy.FLORA],
    music: DungeonMusic.SINISTER_WOODS
  },
  [DungeonPMDO.ElectricMaze]: {
    synergies: [Synergy.ELECTRIC, Synergy.MONSTER, Synergy.LIGHT],
    music: DungeonMusic.STOP_THIEF
  },
  [DungeonPMDO.FarAmpPlains]: {
    synergies: [Synergy.ELECTRIC, Synergy.FIELD, Synergy.FOSSIL],
    music: DungeonMusic.FAR_AMP_PLAINS
  },
  [DungeonPMDO.FinalMaze2]: {
    synergies: [Synergy.NORMAL, Synergy.FLORA, Synergy.BUG],
    music: DungeonMusic.FRIEND_AREA_CAVES
  },
  [DungeonPMDO.FoggyForest]: {
    synergies: [Synergy.FAIRY, Synergy.WILD, Synergy.FLORA],
    music: DungeonMusic.FOGGY_FOREST
  },
  [DungeonPMDO.ForestPath]: {
    synergies: [Synergy.GRASS, Synergy.BUG, Synergy.BABY],
    music: DungeonMusic.SKY_PEAK_FOREST
  },
  [DungeonPMDO.FrostyForest]: {
    synergies: [Synergy.LIGHT, Synergy.ICE, Synergy.FIGHTING],
    music: DungeonMusic.FROSTY_FOREST
  },
  [DungeonPMDO.FutureTemporalSpire]: {
    synergies: [Synergy.HUMAN, Synergy.ARTIFICIAL, Synergy.PSYCHIC],
    music: DungeonMusic.BATTLE_WITH_RAYQUAZA
  },
  [DungeonPMDO.FutureTemporalTower]: {
    synergies: [Synergy.MONSTER, Synergy.ARTIFICIAL, Synergy.PSYCHIC],
    music: DungeonMusic.TEMPORAL_TOWER
  },
  [DungeonPMDO.GoldenChamber]: {
    synergies: [Synergy.LIGHT, Synergy.STEEL, Synergy.DRAGON],
    music: DungeonMusic.OUTLAW
  },
  [DungeonPMDO.GrassMaze]: {
    synergies: [Synergy.GRASS, Synergy.FIELD, Synergy.NORMAL],
    music: DungeonMusic.MAKUHITA_DOJO
  },
  [DungeonPMDO.GreatCanyon]: {
    synergies: [Synergy.NORMAL, Synergy.WILD, Synergy.FIRE],
    music: DungeonMusic.GREAT_CANYON
  },
  [DungeonPMDO.HiddenHighland]: {
    synergies: [Synergy.FLORA, Synergy.GRASS, Synergy.BUG],
    music: DungeonMusic.HIDDEN_HIGHLAND
  },
  [DungeonPMDO.HiddenLand]: {
    synergies: [Synergy.FLORA, Synergy.WILD, Synergy.WATER],
    music: DungeonMusic.HIDDEN_LAND
  },
  [DungeonPMDO.HowlingForest1]: {
    synergies: [Synergy.SOUND, Synergy.FIELD, Synergy.BUG],
    music: DungeonMusic.RANDOM_DUNGEON_2
  },
  [DungeonPMDO.HowlingForest2]: {
    synergies: [Synergy.SOUND, Synergy.POISON, Synergy.FOSSIL],
    music: DungeonMusic.FRIEND_AREA_FOREST
  },
  [DungeonPMDO.IceAegisCave]: {
    synergies: [Synergy.ICE, Synergy.FIGHTING, Synergy.DARK],
    music: DungeonMusic.ILLUSION_STONE_CHAMBER
  },
  [DungeonPMDO.IceMaze]: {
    synergies: [Synergy.ICE, Synergy.STEEL, Synergy.FIGHTING],
    music: DungeonMusic.TOP_MENU_THEME
  },
  [DungeonPMDO.IcicleForest]: {
    synergies: [Synergy.ICE, Synergy.FIELD, Synergy.FIGHTING],
    music: DungeonMusic.ICICLE_FOREST
  },
  [DungeonPMDO.JoyousTower]: {
    synergies: [Synergy.LIGHT, Synergy.FAIRY, Synergy.BABY],
    music: DungeonMusic.A_NEW_WORLD
  },
  [DungeonPMDO.LapisCave]: {
    synergies: [Synergy.WATER, Synergy.AQUATIC, Synergy.FOSSIL],
    music: DungeonMusic.LAPIS_CAVE
  },
  [DungeonPMDO.LightningField]: {
    synergies: [Synergy.ELECTRIC, Synergy.FIELD, Synergy.LIGHT],
    music: DungeonMusic.OH_NO
  },
  [DungeonPMDO.LimestoneCavern]: {
    synergies: [Synergy.ROCK, Synergy.BUG, Synergy.AQUATIC],
    music: DungeonMusic.LIMESTONE_CAVERN
  },
  [DungeonPMDO.LowerBrineCave]: {
    synergies: [Synergy.AQUATIC, Synergy.FOSSIL, Synergy.WILD],
    music: DungeonMusic.LOWER_BRINE_CAVE
  },
  [DungeonPMDO.LushPrairie]: {
    synergies: [Synergy.BUG, Synergy.BABY, Synergy.FLORA],
    music: DungeonMusic.WELCOME_TO_THE_WORLD_OF_POKEMON
  },
  [DungeonPMDO.MagmaCavern2]: {
    synergies: [Synergy.FIRE, Synergy.FIGHTING, Synergy.MONSTER],
    music: DungeonMusic.MAGMA_CAVERN
  },
  [DungeonPMDO.MagmaCavern3]: {
    synergies: [Synergy.FIRE, Synergy.DRAGON, Synergy.MONSTER],
    music: DungeonMusic.MAGMA_CAVERN_PIT
  },
  [DungeonPMDO.MeteorCave]: {
    synergies: [Synergy.PSYCHIC, Synergy.FAIRY, Synergy.HUMAN],
    music: DungeonMusic.RANDOM_DUNGEON_1
  },
  [DungeonPMDO.MiracleSea]: {
    synergies: [Synergy.WATER, Synergy.AQUATIC, Synergy.FAIRY],
    music: DungeonMusic.MIRACLE_SEA
  },
  [DungeonPMDO.MoonlitCourtyard]: {
    synergies: [Synergy.FAIRY, Synergy.FLORA, Synergy.DARK],
    music: DungeonMusic.GOODNIGHT
  },
  [DungeonPMDO.MtBlaze]: {
    synergies: [Synergy.FIRE, Synergy.FLYING, Synergy.WILD],
    music: DungeonMusic.MT_BLAZE
  },
  [DungeonPMDO.MtBristle]: {
    synergies: [Synergy.ELECTRIC, Synergy.FLYING, Synergy.MONSTER],
    music: DungeonMusic.MT_BRISTLE
  },
  [DungeonPMDO.MtFaraway2]: {
    synergies: [Synergy.ICE, Synergy.FLYING, Synergy.DRAGON],
    music: DungeonMusic.FROSTY_GROTTO
  },
  [DungeonPMDO.MtFaraway4]: {
    synergies: [Synergy.ICE, Synergy.FLYING, Synergy.SOUND],
    music: DungeonMusic.ESCAPE_THROUGH_THE_SNOW
  },
  [DungeonPMDO.MtFreeze]: {
    synergies: [Synergy.ICE, Synergy.FLYING, Synergy.NORMAL],
    music: DungeonMusic.MT_FREEZE
  },
  [DungeonPMDO.MtHorn]: {
    synergies: [Synergy.ROCK, Synergy.FLYING, Synergy.SOUND],
    music: DungeonMusic.MT_HORN
  },
  [DungeonPMDO.MtSteel1]: {
    synergies: [Synergy.STEEL, Synergy.FLYING, Synergy.FIGHTING],
    music: DungeonMusic.MT_STEEL
  },
  [DungeonPMDO.MtSteel2]: {
    synergies: [Synergy.STEEL, Synergy.FLYING, Synergy.FIGHTING],
    music: DungeonMusic.BOSS_BATTLE
  },
  [DungeonPMDO.MtThunder]: {
    synergies: [Synergy.ELECTRIC, Synergy.ROCK, Synergy.STEEL],
    music: DungeonMusic.MT_THUNDER
  },
  [DungeonPMDO.MtThunderPeak]: {
    synergies: [Synergy.ELECTRIC, Synergy.FLYING, Synergy.WILD],
    music: DungeonMusic.MT_THUNDER_PEAK
  },
  [DungeonPMDO.MtTravail]: {
    synergies: [Synergy.FIGHTING, Synergy.HUMAN, Synergy.FOSSIL],
    music: DungeonMusic.MT_TRAVAIL
  },
  [DungeonPMDO.MurkyCave]: {
    synergies: [Synergy.POISON, Synergy.GROUND, Synergy.HUMAN],
    music: DungeonMusic.MONSTER_HOUSE
  },
  [DungeonPMDO.MurkyForest]: {
    synergies: [Synergy.POISON, Synergy.GRASS, Synergy.DARK],
    music: DungeonMusic.MURKY_FOREST
  },
  [DungeonPMDO.MysteryJungle1]: {
    synergies: [Synergy.WILD, Synergy.FLORA, Synergy.POISON],
    music: DungeonMusic.FRIEND_AREA_STEPPE
  },
  [DungeonPMDO.MysteryJungle2]: {
    synergies: [Synergy.WILD, Synergy.FAIRY, Synergy.POISON],
    music: DungeonMusic.BLIZZARD_ISLAND
  },
  [DungeonPMDO.MystifyingForest]: {
    synergies: [Synergy.BABY, Synergy.FAIRY, Synergy.FLORA],
    music: DungeonMusic.MYSTIFYING_FOREST
  },
  [DungeonPMDO.NorthernDesert1]: {
    synergies: [Synergy.DRAGON, Synergy.FIRE, Synergy.LIGHT],
    music: DungeonMusic.NORTHERN_DESERT
  },
  [DungeonPMDO.NorthernDesert2]: {
    synergies: [Synergy.DRAGON, Synergy.FIRE, Synergy.WILD],
    music: DungeonMusic.NORTHERN_DESERT
  },
  [DungeonPMDO.NorthernRange1]: {
    synergies: [Synergy.POISON, Synergy.AQUATIC, Synergy.STEEL],
    music: DungeonMusic.FORTUNE_RAVINE
  },
  [DungeonPMDO.NorthernRange2]: {
    synergies: [Synergy.MONSTER, Synergy.FIGHTING, Synergy.STEEL],
    music: DungeonMusic.TEAM_SKULL
  },
  [DungeonPMDO.NorthwindField]: {
    synergies: [Synergy.WATER, Synergy.FIELD, Synergy.SOUND],
    music: DungeonMusic.THROUGH_THE_SEA_OF_TIME
  },
  [DungeonPMDO.PitfallValley1]: {
    synergies: [Synergy.FIELD, Synergy.HUMAN, Synergy.BABY],
    music: DungeonMusic.PERSONALITY_TEST
  },
  [DungeonPMDO.PoisonMaze]: {
    synergies: [Synergy.POISON, Synergy.PSYCHIC, Synergy.BUG],
    music: DungeonMusic.RANDOM_DUNGEON_3
  },
  [DungeonPMDO.PurityForest2]: {
    synergies: [Synergy.BABY, Synergy.FAIRY, Synergy.FLORA],
    music: DungeonMusic.RUN_AWAY
  },
  [DungeonPMDO.PurityForest4]: {
    synergies: [Synergy.NORMAL, Synergy.WILD, Synergy.FAIRY],
    music: DungeonMusic.POKEMON_SQUARE
  },
  [DungeonPMDO.PurityForest6]: {
    synergies: [Synergy.NORMAL, Synergy.GRASS, Synergy.BABY],
    music: DungeonMusic.SHAYMIN_VILLAGE
  },
  [DungeonPMDO.PurityForest7]: {
    synergies: [Synergy.GRASS, Synergy.BABY, Synergy.SOUND],
    music: DungeonMusic.ON_THE_BEACH_AT_DUSK
  },
  [DungeonPMDO.QuicksandCave]: {
    synergies: [Synergy.GROUND, Synergy.FOSSIL, Synergy.NORMAL],
    music: DungeonMusic.QUICKSAND_CAVE
  },
  [DungeonPMDO.QuicksandPit]: {
    synergies: [Synergy.GROUND, Synergy.FOSSIL, Synergy.MONSTER],
    music: DungeonMusic.QUICKSAND_PIT
  },
  [DungeonPMDO.QuicksandUnused]: {
    synergies: [Synergy.GROUND, Synergy.NORMAL, Synergy.POISON],
    music: DungeonMusic.THERES_TROUBLE
  },
  [DungeonPMDO.RescueTeamMaze]: {
    synergies: [Synergy.FIGHTING, Synergy.HUMAN, Synergy.ARTIFICIAL],
    music: DungeonMusic.RESCUE_TEAM_BASE
  },
  [DungeonPMDO.RockAegisCave]: {
    synergies: [Synergy.ROCK, Synergy.GHOST, Synergy.FIGHTING],
    music: DungeonMusic.FRIEND_AREA_SWAMP
  },
  [DungeonPMDO.RockMaze]: {
    synergies: [Synergy.ROCK, Synergy.STEEL, Synergy.FIGHTING],
    music: DungeonMusic.DEFY_THE_LEGENDS
  },
  [DungeonPMDO.RockPathRB]: {
    synergies: [Synergy.ROCK, Synergy.FIELD, Synergy.FOSSIL],
    music: DungeonMusic.RISING_FEAR
  },
  [DungeonPMDO.RockPathTDS]: {
    synergies: [Synergy.ROCK, Synergy.FIELD, Synergy.MONSTER],
    music: DungeonMusic.FRIEND_AREA_POND
  },
  [DungeonPMDO.SealedRuin]: {
    synergies: [Synergy.HUMAN, Synergy.DRAGON, Synergy.GHOST],
    music: DungeonMusic.THE_LEGEND_OF_NINETALES
  },
  [DungeonPMDO.SidePath]: {
    synergies: [Synergy.NORMAL, Synergy.FIELD, Synergy.STEEL],
    music: DungeonMusic.CAVE_AND_SIDE_PATH
  },
  [DungeonPMDO.SilentChasm]: {
    synergies: [Synergy.FIRE, Synergy.LIGHT, Synergy.WILD],
    music: DungeonMusic.SILENT_CHASM
  },
  [DungeonPMDO.SkyPeak4thPass]: {
    synergies: [Synergy.GRASS, Synergy.FLORA, Synergy.BABY],
    music: DungeonMusic.SKY_PEAK_COAST
  },
  [DungeonPMDO.SkyPeak7thPass]: {
    synergies: [Synergy.ICE, Synergy.DRAGON, Synergy.FAIRY],
    music: DungeonMusic.SKY_PEAK_CAVE
  },
  [DungeonPMDO.SkyPeakSummitPass]: {
    synergies: [Synergy.DARK, Synergy.STEEL, Synergy.ROCK],
    music: DungeonMusic.SKY_TOWER_SUMMIT
  },
  [DungeonPMDO.SkyTower]: {
    synergies: [Synergy.FLYING, Synergy.LIGHT, Synergy.FAIRY],
    music: DungeonMusic.SKY_TOWER
  },
  [DungeonPMDO.SnowPath]: {
    synergies: [Synergy.ICE, Synergy.FIELD, Synergy.NORMAL],
    music: DungeonMusic.SKY_PEAK_SNOWFIELD
  },
  [DungeonPMDO.SolarCave1]: {
    synergies: [Synergy.PSYCHIC, Synergy.FIRE, Synergy.SOUND],
    music: DungeonMusic.SKY_PEAK_PRAIRIE
  },
  [DungeonPMDO.SouthernCavern1]: {
    synergies: [Synergy.STEEL, Synergy.POISON, Synergy.ARTIFICIAL],
    music: DungeonMusic.SPRING_CAVE
  },
  [DungeonPMDO.SouthernCavern2]: {
    synergies: [Synergy.FAIRY, Synergy.AQUATIC, Synergy.POISON],
    music: DungeonMusic.SPRING_CAVE_DEPTHS
  },
  [DungeonPMDO.SouthernJungle]: {
    synergies: [Synergy.WILD, Synergy.FLORA, Synergy.GRASS],
    music: DungeonMusic.SOUTHERN_JUNGLE
  },
  [DungeonPMDO.SpacialCliffs]: {
    synergies: [Synergy.GHOST, Synergy.ROCK, Synergy.ELECTRIC],
    music: DungeonMusic.SPACIAL_CLIFFS
  },
  [DungeonPMDO.SpacialRift1]: {
    synergies: [Synergy.GHOST, Synergy.ARTIFICIAL, Synergy.MONSTER],
    music: DungeonMusic.IN_THE_FUTURE
  },
  [DungeonPMDO.SpacialRift2]: {
    synergies: [Synergy.GHOST, Synergy.ARTIFICIAL, Synergy.PSYCHIC],
    music: DungeonMusic.PLANETS_PARALYSIS
  },
  [DungeonPMDO.SteamCave]: {
    synergies: [Synergy.FIRE, Synergy.GROUND, Synergy.ELECTRIC],
    music: DungeonMusic.STEAM_CAVE
  },
  [DungeonPMDO.SteelAegisCave]: {
    synergies: [Synergy.STEEL, Synergy.NORMAL, Synergy.FIGHTING],
    music: DungeonMusic.AEGIS_CAVE
  },
  [DungeonPMDO.StormySea1]: {
    synergies: [Synergy.WATER, Synergy.AQUATIC, Synergy.ELECTRIC],
    music: DungeonMusic.STORMY_SEA
  },
  [DungeonPMDO.StormySea2]: {
    synergies: [Synergy.WATER, Synergy.AQUATIC, Synergy.SOUND],
    music: DungeonMusic.FRIEND_AREA_OCEANIC
  },
  [DungeonPMDO.SurroundedSea]: {
    synergies: [Synergy.WATER, Synergy.DRAGON, Synergy.ICE],
    music: DungeonMusic.SURROUNDED_SEA
  },
  [DungeonPMDO.TemporalSpire]: {
    synergies: [Synergy.HUMAN, Synergy.PSYCHIC, Synergy.ARTIFICIAL],
    music: DungeonMusic.TEMPORAL_SPIRE
  },
  [DungeonPMDO.TemporalTower]: {
    synergies: [Synergy.HUMAN, Synergy.STEEL, Synergy.ARTIFICIAL],
    music: DungeonMusic.GARDEVOIR_INSIDE_OF_A_DREAM
  },
  [DungeonPMDO.TemporalUnused]: {
    synergies: [Synergy.NORMAL, Synergy.FOSSIL, Synergy.ARTIFICIAL],
    music: DungeonMusic.TEMPORAL_PINNACLE
  },
  [DungeonPMDO.TestDungeon]: {
    synergies: [Synergy.ARTIFICIAL, Synergy.ELECTRIC, Synergy.PSYCHIC],
    music: DungeonMusic.FRIEND_AREA_LAB
  },
  [DungeonPMDO.TheNightmare]: {
    synergies: [Synergy.GHOST, Synergy.DARK, Synergy.PSYCHIC],
    music: DungeonMusic.THE_POWER_OF_DARKNESS
  },
  [DungeonPMDO.ThunderwaveCave]: {
    synergies: [Synergy.ELECTRIC, Synergy.GROUND, Synergy.LIGHT],
    music: DungeonMusic.THUNDERWAVE_CAVE
  },
  [DungeonPMDO.TinyMeadow]: {
    synergies: [Synergy.GRASS, Synergy.BABY, Synergy.NORMAL],
    music: DungeonMusic.FRIEND_AREA_GRASSLANDS
  },
  [DungeonPMDO.TinyWoods]: {
    synergies: [Synergy.BUG, Synergy.BABY, Synergy.NORMAL],
    music: DungeonMusic.TINY_WOODS
  },
  [DungeonPMDO.TreeshroudForest1]: {
    synergies: [Synergy.GRASS, Synergy.WATER, Synergy.BUG],
    music: DungeonMusic.TREESHROUD_FOREST
  },
  [DungeonPMDO.TreeshroudForest2]: {
    synergies: [Synergy.GRASS, Synergy.AQUATIC, Synergy.BABY],
    music: DungeonMusic.FRIEND_AREA_WILDS
  },
  [DungeonPMDO.UnusedBrineCave]: {
    synergies: [Synergy.WATER, Synergy.GROUND, Synergy.DRAGON],
    music: DungeonMusic.IN_THE_NIGHTMARE
  },
  [DungeonPMDO.UnusedSteamCave]: {
    synergies: [Synergy.FIRE, Synergy.WATER, Synergy.ELECTRIC],
    music: DungeonMusic.UPPER_STEAM_CAVE
  },
  [DungeonPMDO.UnusedWaterfallPond]: {
    synergies: [Synergy.AQUATIC, Synergy.BUG, Synergy.WILD],
    music: DungeonMusic.DEEP_STAR_CAVE
  },
  [DungeonPMDO.UproarForest]: {
    synergies: [Synergy.WILD, Synergy.FIELD, Synergy.SOUND],
    music: DungeonMusic.TREASURE_TOWN
  },
  [DungeonPMDO.VastIceMountain]: {
    synergies: [Synergy.DRAGON, Synergy.ICE, Synergy.ROCK],
    music: DungeonMusic.VAST_ICE_MOUNTAIN
  },
  [DungeonPMDO.VastIceMountainPeak]: {
    synergies: [Synergy.DRAGON, Synergy.ICE, Synergy.FLYING],
    music: DungeonMusic.VAST_ICE_MOUNTAIN_PEAK
  },
  [DungeonPMDO.WaterfallCave]: {
    synergies: [Synergy.WATER, Synergy.GROUND, Synergy.SOUND],
    music: DungeonMusic.MAROWAK_DOJO
  },
  [DungeonPMDO.WaterfallPond]: {
    synergies: [Synergy.WATER, Synergy.AQUATIC, Synergy.SOUND],
    music: DungeonMusic.WATERFALL_CAVE
  },
  [DungeonPMDO.WaterMaze]: {
    synergies: [Synergy.WATER, Synergy.AQUATIC, Synergy.GRASS],
    music: DungeonMusic.STAR_CAVE
  },
  [DungeonPMDO.WesternCave1]: {
    synergies: [Synergy.HUMAN, Synergy.FLORA, Synergy.ARTIFICIAL],
    music: DungeonMusic.SKY_PEAK_FINAL_PASS
  },
  [DungeonPMDO.WesternCave2]: {
    synergies: [Synergy.HUMAN, Synergy.FLORA, Synergy.ROCK],
    music: DungeonMusic.JOB_CLEAR
  },
  [DungeonPMDO.WishCave1]: {
    synergies: [Synergy.FAIRY, Synergy.HUMAN, Synergy.DRAGON],
    music: DungeonMusic.LIVING_SPIRIT
  },
  [DungeonPMDO.WishCave2]: {
    synergies: [Synergy.FAIRY, Synergy.DRAGON, Synergy.BUG],
    music: DungeonMusic.TEAM_CHARM_THEME
  },
  [DungeonPMDO.WorldAbyss2]: {
    synergies: [Synergy.DARK, Synergy.GHOST, Synergy.ELECTRIC],
    music: DungeonMusic.WORLD_CALAMITY
  },
  [DungeonPMDO.WyvernHill]: {
    synergies: [Synergy.DRAGON, Synergy.FLYING, Synergy.FIELD],
    music: DungeonMusic.KECLEONS_SHOP
  },
  [DungeonPMDO.ZeroIsleEast3]: {
    synergies: [Synergy.GROUND, Synergy.PSYCHIC, Synergy.STEEL],
    music: DungeonMusic.VERSUS_BOSS
  },
  [DungeonPMDO.ZeroIsleEast4]: {
    synergies: [Synergy.POISON, Synergy.MONSTER, Synergy.ROCK],
    music: DungeonMusic.VERSUS_LEGENDARY
  },
  [DungeonPMDO.ZeroIsleSouth1]: {
    synergies: [Synergy.GROUND, Synergy.BUG, Synergy.NORMAL],
    music: DungeonMusic.WIGGLYTUFFS_GUILD_REMIX
  },
  [DungeonPMDO.ZeroIsleSouth2]: {
    synergies: [Synergy.ROCK, Synergy.GROUND, Synergy.FIGHTING],
    music: DungeonMusic.WIGGLYTUFFS_GUILD
  }
}
