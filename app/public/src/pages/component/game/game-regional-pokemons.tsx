import React from "react"
import { useTranslation } from "react-i18next"
import { Tooltip } from "react-tooltip"
import { IPokemonConfig } from "../../../../../models/mongo-models/user-metadata"
import { getPokemonData } from "../../../../../models/precomputed/precomputed-pokemon-data"
import { RarityColor } from "../../../../../types/Config"
import { Pkm } from "../../../../../types/enum/Pokemon"
import { SpecialGameRule } from "../../../../../types/enum/SpecialGameRule"
import { selectCurrentPlayer, useAppSelector } from "../../../hooks"
import { getPortraitSrc } from "../../../utils"
import { getGameScene } from "../../game"
import SynergyIcon from "../icons/synergy-icon"

export function GameRegionalPokemonsIcon() {
  return (
    <div className="my-box" style={{ padding: "5px" }}>
      <img
        src={`assets/ui/regional.png`}
        style={{ width: "2em", height: "2em" }}
        data-tooltip-id={"game-regional-pokemons"}
      />
      <Tooltip
        id="game-regional-pokemons"
        float
        place="top"
        className="custom-theme-tooltip"
      >
        <GameRegionalPokemons />
      </Tooltip>
    </div>
  )
}

export function GameRegionalPokemons() {
  const { t } = useTranslation()
  const currentPlayer = useAppSelector(selectCurrentPlayer)
  const specialGameRule = getGameScene()?.room?.state.specialGameRule
  const regionalPokemons: Pkm[] = currentPlayer?.regionalPokemons.map(p=>p) ?? new Array<Pkm>()
  const pokemonCollection = useAppSelector(
    (state) => state.game.pokemonCollection
  )

  if (specialGameRule === SpecialGameRule.EVERYONE_IS_HERE) {
    return (
      <div className="game-additional-pokemons">
        <p>{t("scribble.EVERYONE_IS_HERE")}</p>
      </div>
    )
  } else if (!regionalPokemons || regionalPokemons.length === 0) {
    return (
      <div className="game-regional-pokemons">
        <p className="help">{t("regional_pokemon_hint")}</p>
      </div>
    )
  } else {
    return (
      <div className="game-regional-pokemons">
        <h2>{t("regional_pokemons")}</h2>
        <p className="help">{t("regional_pokemon_hint")}</p>
        <div className="grid">
          {regionalPokemons.map((p, index) => {
            const pokemon = getPokemonData(p)
            const rarityColor = RarityColor[pokemon.rarity]
            const pokemonConfig: IPokemonConfig | undefined =
              pokemonCollection.get(pokemon.index)

            return (
              <div
                className={`my-box clickable game-pokemon-portrait`}
                key={"game-regional-pokemons-" + index}
                style={{
                  backgroundColor: rarityColor,
                  borderColor: rarityColor,
                  backgroundImage: `url("${getPortraitSrc(
                    pokemon.index,
                    pokemonConfig?.selectedShiny,
                    pokemonConfig?.selectedEmotion
                  )}")`
                }}
              >
                <ul className="game-pokemon-portrait-types">
                  {Array.from(pokemon.types.values()).map((type) => {
                    return (
                      <li key={type}>
                        <SynergyIcon type={type} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
