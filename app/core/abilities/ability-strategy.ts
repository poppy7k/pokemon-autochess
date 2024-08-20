import { Transfer } from "../../types"
import { Ability } from "../../types/enum/Ability"
import { Effect } from "../../types/enum/Effect"
import { Item } from "../../types/enum/Item"
import { Passive } from "../../types/enum/Passive"
import { Synergy } from "../../types/enum/Synergy"
import { distanceC } from "../../utils/distance"
import Board from "../board"
import { PokemonEntity } from "../pokemon-entity"
import PokemonState from "../pokemon-state"
import { AbilityStrategies } from "./abilities"
import { min } from "../../utils/number"

export class AbilityStrategy {
  copyable = true // if true, can be copied by mimic, metronome...
  process(
    pokemon: PokemonEntity,
    state: PokemonState,
    board: Board,
    target: PokemonEntity,
    crit: boolean,
    preventDefaultAnim?: boolean
  ) {
    pokemon.pp = min(0)(pokemon.pp - pokemon.maxPP)
    pokemon.count.ult += 1

    if (!preventDefaultAnim) {
      pokemon.simulation.room.broadcast(Transfer.ABILITY, {
        id: pokemon.simulation.id,
        skill: pokemon.skill,
        positionX: pokemon.positionX,
        positionY: pokemon.positionY,
        targetX: target.positionX,
        targetY: target.positionY,
        orientation: pokemon.orientation
      })
    }

    if (pokemon.types.has(Synergy.SOUND)) {
      soundBoost(pokemon, board)
      if (pokemon.passive === Passive.MEGA_LAUNCHER) {
        soundBoost(pokemon, board)
        soundBoost(pokemon, board)
      }
    }

    board.forEach((x, y, pkm) => {
      if (
        pkm?.passive === Passive.WATER_SPRING &&
        pkm &&
        pkm.team !== pokemon.team &&
        pkm.id !== pokemon.id
      ) {
        pkm.addPP(5, pkm, 0, false)
        pkm.simulation.room.broadcast(Transfer.ABILITY, {
          id: pokemon.simulation.id,
          skill: pkm.skill,
          positionX: pkm.positionX,
          positionY: pkm.positionY
        })
      }
    })

    if (pokemon.items.has(Item.AQUA_EGG)) {
      pokemon.addPP(20, pokemon, 0, false)
    }

    if (pokemon.items.has(Item.STAR_DUST)) {
      pokemon.addShield(Math.round(0.6 * pokemon.maxPP), pokemon, 0, false)
      pokemon.count.starDustCount++
    }

    if (pokemon.items.has(Item.LEPPA_BERRY)) {
      pokemon.eatBerry(Item.LEPPA_BERRY)
    }

    if (pokemon.items.has(Item.COMFEY)) {
      AbilityStrategies[Ability.FLORAL_HEALING].process(
        pokemon,
        state,
        board,
        target,
        crit,
        true
      )
    }

    if (pokemon.passive === Passive.SLOW_START && pokemon.count.ult === 1) {
      pokemon.addAttackSpeed(30, pokemon, 0, false)
      pokemon.addAttack(10, pokemon, 0, false)
    }
  }
}

export function soundBoost(pokemon: PokemonEntity, board: Board) {
  pokemon.count.soundCount++
  const chimecho = board.find(
    (x, y, e) => e.passive === Passive.CHIMECHO && e.team === pokemon.team
  )
  const chimechoBoost =
    chimecho &&
    distanceC(
      pokemon.positionX,
      pokemon.positionY,
      chimecho.positionX,
      chimecho.positionY
    ) <= 2
  board.forEach((x: number, y: number, ally: PokemonEntity | undefined) => {
    if (ally && pokemon.team === ally.team) {
      ally.status.sleep = false
      if (
        pokemon.effects.has(Effect.LARGO) ||
        pokemon.effects.has(Effect.ALLEGRO) ||
        pokemon.effects.has(Effect.PRESTO)
      ) {
        ally.addAttack(chimechoBoost ? 2 : 1, pokemon, 0, false)
      }
      if (
        pokemon.effects.has(Effect.ALLEGRO) ||
        pokemon.effects.has(Effect.PRESTO)
      ) {
        ally.addAttackSpeed(chimechoBoost ? 10 : 5, pokemon, 0, false)
      }
      if (pokemon.effects.has(Effect.PRESTO)) {
        const manaBoost = chimechoBoost ? 6 : 3
        ally.addPP(manaBoost, pokemon, 0, false)
      }
    }
  })
}
