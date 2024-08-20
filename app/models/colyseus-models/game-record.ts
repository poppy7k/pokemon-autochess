import { ArraySchema, Schema, type } from "@colyseus/schema"
import { Emotion } from "../../types"
import { Item } from "../../types/enum/Item"
import { Pkm, PkmIndex } from "../../types/enum/Pokemon"
export interface IPokemonRecord {
  name: Pkm
  items: Item[] | ArraySchema<Item>
  avatar: string
}
export class PokemonRecord extends Schema implements IPokemonRecord {
  @type("string") name: Pkm
  @type("string") avatar: string
  @type(["string"]) items = new ArraySchema<Item>()

  constructor(mongoPokemon: IPokemonRecord) {
    super()
    this.name = mongoPokemon.name
    this.avatar = mongoPokemon.avatar
      ? mongoPokemon.avatar
      : `${PkmIndex[this.name]}/${Emotion.NORMAL}`

    mongoPokemon.items.forEach((it: Item) => {
      this.items.push(it)
    })
  }
}

export interface IGameRecord {
  time: number
  rank: number
  pokemons: IPokemonRecord[] | ArraySchema<IPokemonRecord>
  elo: number
}

export class GameRecord extends Schema implements IGameRecord {
  @type("uint64") time: number
  @type("uint8") rank: number
  @type([PokemonRecord]) pokemons = new ArraySchema<IPokemonRecord>()
  @type("uint16") elo: number

  constructor(time: number, rank: number, elo: number, pokemons: any[]) {
    super()
    this.time = time
    this.rank = rank
    this.elo = elo

    pokemons.forEach((pokemon) => {
      this.pokemons.push(new PokemonRecord(pokemon))
    })
  }
}
