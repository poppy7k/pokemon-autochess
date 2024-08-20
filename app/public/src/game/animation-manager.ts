import { IPokemonEntity } from "../../../types"
import { AnimationComplete, AnimationType } from "../../../types/Animation"
import { PROJECTILE_SPEED } from "../../../types/Config"
import delays from "../../../types/delays.json"
import {
  Orientation,
  OrientationFlip,
  PokemonActionState,
  PokemonTint,
  SpriteType
} from "../../../types/enum/Game"
import { Berries } from "../../../types/enum/Item"
import { AnimationConfig, Pkm, PkmIndex } from "../../../types/enum/Pokemon"
import { distanceC } from "../../../utils/distance"
import { logger } from "../../../utils/logger"
import { fpsToDuration, max } from "../../../utils/number"
import atlas from "../assets/atlas.json"
import durations from "../assets/pokemons/durations.json"
import indexList from "../assets/pokemons/indexList.json"
import PokemonSprite from "./components/pokemon"

const FPS_EFFECTS = 20
const FPS_POKEMON_ANIMS = 36

export default class AnimationManager {
  game: Phaser.Scene

  constructor(game: Phaser.Scene) {
    this.game = game

    indexList.forEach((index) => {
      const tints = Object.values(PokemonTint) as PokemonTint[]
      tints.forEach((shiny) => {
        const actions: AnimationType[] = [
          AnimationType.Idle,
          AnimationType.Walk,
          AnimationType.Sleep,
          AnimationType.Hop,
          AnimationType.Hurt
        ]

        const conf = (Object.keys(PkmIndex) as Pkm[]).find(
          (p) => index === PkmIndex[p]
        )

        if (conf && AnimationConfig[conf]) {
          if (
            AnimationConfig[conf].shinyUnavailable &&
            shiny === PokemonTint.SHINY
          )
            return
          if (!actions.includes(AnimationConfig[conf as Pkm].attack)) {
            actions.push(AnimationConfig[conf as Pkm].attack)
          }
          if (!actions.includes(AnimationConfig[conf as Pkm].ability)) {
            actions.push(AnimationConfig[conf as Pkm].ability)
          }
          if (!actions.includes(AnimationConfig[conf as Pkm].emote)) {
            actions.push(AnimationConfig[conf as Pkm].emote)
          }
        } else {
          actions.push(AnimationType.Attack)
        }

        //logger.debug(`Init animations: ${index} => ${actions.join(",")}`)

        actions.forEach((action) => {
          const modes = Object.values(SpriteType) as SpriteType[]
          modes.forEach((mode) => {
            const directionArray =
              AnimationComplete[action] === false
                ? [Orientation.DOWN]
                : Object.values(Orientation)
            directionArray.forEach((direction) => {
              const durationArray: number[] =
                durations[`${index}/${shiny}/${action}/${mode}`]
              if (durationArray) {
                const frameArray = this.game.anims.generateFrameNames(index, {
                  start: 0,
                  end: durationArray.length - 1,
                  zeroPad: 4,
                  prefix: `${shiny}/${action}/${mode}/${direction}/`
                })
                for (let i = 0; i < durationArray.length; i++) {
                  if (frameArray[i]) {
                    frameArray[i]["duration"] =
                      durationArray[i] * (1000 / FPS_POKEMON_ANIMS)
                  }
                }
                const shouldLoop = [
                  AnimationType.Idle,
                  AnimationType.Sleep,
                  AnimationType.Hop
                ].includes(action)

                this.game.anims.create({
                  key: `${index}/${shiny}/${action}/${mode}/${direction}`,
                  frames: frameArray,
                  repeat: shouldLoop ? -1 : 0
                })
              } else {
                logger.warn(
                  "duration array missing for",
                  `${index}/${shiny}/${action}/${mode}`
                )
              }
            })
          })
        })
      })
    })

    for (const pack in atlas.packs) {
      if (atlas.packs[pack].anims) {
        const doesContainMultipleAnims =
          Object.keys(atlas.packs[pack].anims).length > 1
        for (const anim in atlas.packs[pack].anims) {
          const animConfig = atlas.packs[pack].anims[anim]
          this.createAnimation({
            key: anim,
            atlas: atlas.packs[pack].name,
            prefix: doesContainMultipleAnims ? anim + "/" : "",
            ...animConfig
          })
        }
      }
    }

    this.createMinigameAnimations()
    this.createEnvironmentAnimations()
  }

  createAnimation({
    key,
    atlas,
    prefix = "",
    frames,
    repeat = 0,
    fps = FPS_EFFECTS,
    yoyo = false
  }: {
    key: string
    atlas?: string
    prefix?: string
    frames: number
    repeat?: number
    fps?: number
    yoyo?: boolean
  }) {
    this.game.anims.create({
      key,
      frames: this.game.anims.generateFrameNames(atlas ?? key, {
        start: 0,
        end: frames - 1,
        zeroPad: 3,
        prefix,
        suffix: ".png"
      }),
      duration: fpsToDuration(fps)(frames),
      repeat,
      yoyo
    })
  }

  createMinigameAnimations() {
    this.game.anims.create({
      key: "portal",
      frames: this.game.anims.generateFrameNames("portal", {
        start: 0,
        end: 7,
        zeroPad: 3
      }),
      duration: 600,
      repeat: -1
    })

    this.game.anims.create({
      key: "open_chest",
      frames: this.game.anims.generateFrameNames("chest", {
        start: 1,
        end: 4,
        suffix: ".png"
      }),
      duration: 600,
      repeat: 0
    })

    this.game.anims.create({
      key: "shine",
      frames: this.game.anims.generateFrameNames("shine", {
        start: 0,
        end: 47,
        suffix: ".png"
      }),
      duration: 1000,
      repeat: -1
    })
  }

  createEnvironmentAnimations() {
    Berries.forEach((berryName) => {
      for (let step = 1; step <= 3; step++) {
        this.game.anims.create({
          key: `${berryName}_TREE_STEP_${step}`,
          frames: this.game.anims.generateFrameNames("berry_trees", {
            start: step * 2 - 1,
            end: step * 2,
            prefix: berryName + "_"
          }),
          duration: 600,
          repeat: -1
        })
      }
    })

    this.game.anims.create({
      key: `CROP`,
      frames: this.game.anims.generateFrameNames("berry_trees", {
        start: 1,
        end: 2,
        prefix: "CROP_"
      }),
      duration: 600,
      repeat: -1
    })
  }

  convertPokemonActionStateToAnimationType(
    state: PokemonActionState,
    entity: PokemonSprite
  ): AnimationType {
    switch (state) {
      case PokemonActionState.HOP:
      case PokemonActionState.FISH:
        return AnimationType.Hop
      case PokemonActionState.HURT:
        return AnimationType.Hurt
      case PokemonActionState.SLEEP:
        return AnimationType.Sleep
      case PokemonActionState.WALK:
        return AnimationType.Walk
      case PokemonActionState.ATTACK:
        return AnimationConfig[entity.name as Pkm].attack
      case PokemonActionState.EMOTE:
        return AnimationConfig[entity.name as Pkm].emote
      case PokemonActionState.IDLE:
      default:
        return AnimationType.Idle
    }
  }

  animatePokemon(
    entity: PokemonSprite,
    action: PokemonActionState,
    flip: boolean,
    loop: boolean = true
  ) {
    const animation = this.convertPokemonActionStateToAnimationType(
      action,
      entity
    )

    const shouldLock =
      action === PokemonActionState.HOP ||
      action === PokemonActionState.HURT ||
      action === PokemonActionState.EMOTE

    const timeScale =
      action === PokemonActionState.ATTACK
        ? getAttackAnimTimeScale(entity.index, entity.atkSpeed)
        : 1

    try {
      this.play(entity, animation, {
        flip,
        lock: shouldLock,
        repeat: loop ? -1 : 0,
        timeScale
      })
    } catch (err) {
      logger.warn(`Can't play animation ${animation} for ${entity?.name}`, err)
    }
  }

  play(
    entity: PokemonSprite,
    animation: AnimationType,
    config: {
      flip?: boolean
      repeat?: number
      lock?: boolean
      timeScale?: number
    } = {}
  ) {
    if (entity.animationLocked || !entity.sprite?.anims) return

    const orientation = config.flip
      ? OrientationFlip[entity.orientation]
      : entity.orientation

    const orientationCorrected =
      AnimationComplete[animation] === true ? orientation : Orientation.DOWN

    const textureIndex =
      entity.scene && entity.scene.textures.exists(entity.index)
        ? entity.index
        : "0000"
    const tint =
      entity.shiny && !AnimationConfig[entity.name].shinyUnavailable
        ? PokemonTint.SHINY
        : PokemonTint.NORMAL
    const animKey = `${textureIndex}/${tint}/${animation}/${SpriteType.ANIM}/${orientationCorrected}`
    const shadowKey = `${textureIndex}/${tint}/${animation}/${SpriteType.SHADOW}/${orientationCorrected}`

    if (
      entity.sprite.anims.currentAnim?.key === animKey &&
      entity.sprite.anims.currentAnim?.repeat === -1
    )
      return

    entity.sprite.anims.play({
      key: animKey,
      repeat: config.repeat,
      timeScale: config.timeScale
    })
    entity.shadow.anims.play({
      key: shadowKey,
      repeat: config.repeat,
      timeScale: config.timeScale
    })
    if (config.lock) {
      entity.animationLocked = true
    }
  }
}

export function getAttackTimings(pokemon: IPokemonEntity): {
  delayBeforeShoot: number
  travelTime: number
  attackDuration: number
} {
  const attackDuration = 1000 / pokemon.atkSpeed
  const d = delays[pokemon.index]?.d || 18 // number of frames before hit
  const t = delays[pokemon.index]?.t || 36 // total number of frames in the animation

  const delayBeforeShoot = max(attackDuration / 2)((attackDuration * d) / t)
  const distance = distanceC(
    pokemon.targetX,
    pokemon.targetY,
    pokemon.positionX,
    pokemon.positionY
  )
  const travelTime = (distance * 1000) / PROJECTILE_SPEED
  return { delayBeforeShoot, travelTime, attackDuration }
}

export function getAttackAnimTimeScale(pokemonIndex: string, atkSpeed: number) {
  const t = delays[pokemonIndex]?.t || 36 // total number of frames in the animation

  const timeScale = (t * atkSpeed) / FPS_POKEMON_ANIMS
  return timeScale
}
