import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema"
import { Role, Title } from "../../types"
import { Language } from "../../types/enum/Language"
import { IPokemonConfig } from "../mongo-models/user-metadata"
import { GameRecord, IGameRecord } from "./game-record"
import MapTileset from "./map-tileset"
import PokemonCollection from "./pokemon-collection"
import PokemonConfig from "./pokemon-config"
import WinTileset from "./win-tileset"

export interface ILobbyUser {
  id: string
  name: string
  avatar: string
  elo: number
  wins: number
  exp: number
  level: number
  donor: boolean
  honors: string[] | ArraySchema<string>
  history: IGameRecord[] | ArraySchema<IGameRecord>
  pokemonCollection: Map<string, IPokemonConfig> | MapSchema<IPokemonConfig>
  booster: number
  titles: Title[] | ArraySchema<Title>
  title: "" | Title
  role: Role
  anonymous: boolean
  creationTime: string
  lastSignInTime: string
  language: Language | ""
}
export default class LobbyUser extends Schema implements ILobbyUser {
  @type("string") id: string
  @type("string") name: string
  @type("string") avatar: string
  @type("uint16") elo: number
  @type(MapTileset) map = new MapTileset()
  @type("string") language: Language | ""
  @type("uint16") wins: number
  @type("uint16") exp: number
  @type("uint16") level: number
  @type("boolean") donor: boolean
  @type(WinTileset) mapWin = new WinTileset()
  @type(["string"]) honors = new ArraySchema<string>()
  @type([GameRecord]) history = new ArraySchema<IGameRecord>()
  @type({ map: PokemonConfig }) pokemonCollection = new PokemonCollection()
  @type("uint16") booster: number
  @type(["string"]) titles = new ArraySchema<Title>()
  @type("string") title: "" | Title
  @type("string") role: Role
  @type("boolean") anonymous: boolean
  @type("string") creationTime: string
  @type("string") lastSignInTime: string

  constructor(
    id: string,
    name: string,
    elo: number,
    avatar: string,
    wins: number,
    exp: number,
    level: number,
    donor: boolean,
    history: GameRecord[] | ArraySchema<GameRecord>,
    honors: string[],
    pokemonCollection: Map<string, IPokemonConfig> | null,
    booster: number,
    titles: Title[],
    title: "" | Title,
    role: Role,
    anonymous: boolean,
    creationTime: string,
    lastSignInTime: string,
    language: Language | "",
  ) {
    super()
    this.id = id
    this.name = name
    this.avatar = avatar
    this.elo = elo
    this.wins = wins
    this.exp = exp
    this.level = level
    this.donor = donor
    this.booster = booster
    this.title = title
    this.role = role
    this.anonymous = anonymous
    this.creationTime = creationTime
    this.lastSignInTime = lastSignInTime
    this.language = language

    if (history && history.length && history.length != 0) {
      history.forEach((h) => {
        this.history.push(h)
      })
    }

    if (honors && honors.length && honors.length != 0) {
      honors.forEach((h) => {
        this.honors.push(h)
      })
    }

    if (pokemonCollection && pokemonCollection.size) {
      pokemonCollection.forEach((value, key) => {
        this.pokemonCollection.set(key, new PokemonConfig(value.id, value))
      })
    }

    if (titles && titles.length && titles.length != 0) {
      titles.forEach((value) => {
        this.titles.push(value)
      })
    }
  }
}
