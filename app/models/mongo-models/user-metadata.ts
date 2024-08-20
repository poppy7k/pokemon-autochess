import { Schema, model } from "mongoose"
import { ArraySchema } from "@colyseus/schema"
import { Emotion, Role, Title } from "../../types"
import { Language } from "../../types/enum/Language"
import MapTileset from "../colyseus-models/map-tileset"
import WinTileset from "../colyseus-models/win-tileset"

export interface IUserMetadata {
  uid: string
  displayName: string
  language: Language | ""
  avatar: string
  wins: number
  exp: number
  level: number
  elo: number
  donor: boolean
  mapWin: WinTileset
  map: MapTileset
  honors: string[]
  pokemonCollection: Map<string, IPokemonConfig>
  booster: number
  titles: Title[]
  title: "" | Title
  role: Role
}

export interface IPokemonConfig {
  dust: number
  emotions: Emotion[] | ArraySchema<Emotion>
  shinyEmotions: Emotion[] | ArraySchema<Emotion>
  selectedEmotion: Emotion
  selectedShiny: boolean
  id: string
}

const userMetadataSchema = new Schema({
  uid: {
    type: String,
  },
  displayName: {
    type: String,
  },
  language: {
    type: String,
    default: "en",
  },
  avatar: {
    type: String,
    default: "0019/Normal",
  },
  wins: {
    type: Number,
    default: 0,
  },
  exp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  elo: {
    type: Number,
    default: 1000,
  },
  donor: {
    type: Boolean,
    default: false,
  },
  booster: {
    type: Number,
    default: 0,
  },
  mapWin: {
    ICE: {
      type: Number,
      default: 0,
    },
    FIRE: {
      type: Number,
      default: 0,
    },
    GROUND: {
      type: Number,
      default: 0,
    },
    NORMAL: {
      type: Number,
      default: 0,
    },
    GRASS: {
      type: Number,
      default: 0,
    },
    WATER: {
      type: Number,
      default: 0,
    },
  },
  map: {
    ICE: {
      type: String,
      default: "ICE0",
    },
    FIRE: {
      type: String,
      default: "FIRE0",
    },
    GROUND: {
      type: String,
      default: "GROUND0",
    },
    NORMAL: {
      type: String,
      default: "NORMAL0",
    },
    GRASS: {
      type: String,
      default: "GRASS0",
    },
    WATER: {
      type: String,
      default: "WATER0",
    },
  },
  title: {
    type: String,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.BASIC,
  },
  honors: [
    {
      type: String,
    },
  ],
  titles: [
    {
      type: String,
      enum: Title,
    },
  ],
  pokemonCollection: {
    type: Map,
    of: {
      dust: {
        type: Number,
      },
      selectedEmotion: {
        type: String,
        enum: Emotion,
      },
      emotions: [
        {
          type: String,
          enum: Emotion,
        },
      ],
      shinyEmotions: [
        {
          type: String,
          enum: Emotion,
        },
      ],
      selectedShiny: {
        type: Boolean,
      },
      id: {
        type: String,
      },
    },
  },
})

export default model<IUserMetadata>("UserMetadata", userMetadataSchema)
