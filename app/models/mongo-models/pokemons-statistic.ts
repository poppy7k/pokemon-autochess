import { Schema, model } from "mongoose"
import { Item } from "../../types/enum/Item"
import { Pkm } from "../../types/enum/Pokemon"

export interface IPokemonsStatistic {
  rank: number
  count: number
  name: Pkm
  items: Item[]
  item_count: number
}

const pokemonsStatistic = new Schema({
  item_count: {
    type: Number
  },
  rank: {
    type: Number
  },
  count: {
    type: Number
  },
  name: {
    type: String,
    enum: Pkm
  },
  items: [
    {
      type: String,
      enum: Object.values(Item)
    }
  ]
})

export default model<IPokemonsStatistic>(
  "PokemonsStatistic",
  pokemonsStatistic,
  "pokemons-statistic"
)

export async function fetchMetaPokemons(): Promise<IPokemonsStatistic[]> {
  return fetch("/meta/pokemons").then((res) => res.json())
}
