import { Dispatcher } from "@colyseus/command"
import { MapSchema } from "@colyseus/schema"
import { Client, Room } from "colyseus"
import admin from "firebase-admin"
import { components } from "../api-v1/openapi"
import { computeElo } from "../core/elo"
import { CountEvolutionRule, ItemEvolutionRule } from "../core/evolution-rules"
import { MiniGame } from "../core/matter/mini-game"
import { IGameUser } from "../models/colyseus-models/game-user"
import Player from "../models/colyseus-models/player"
import { Pokemon, PokemonClasses } from "../models/colyseus-models/pokemon"
import BannedUser from "../models/mongo-models/banned-user"
import { BotV2 } from "../models/mongo-models/bot-v2"
import DetailledStatistic from "../models/mongo-models/detailled-statistic-v2"
import History from "../models/mongo-models/history"
import UserMetadata, {
  IPokemonConfig
} from "../models/mongo-models/user-metadata"
import PokemonFactory from "../models/pokemon-factory"
import {
  PRECOMPUTED_REGIONAL_MONS,
  getPokemonData
} from "../models/precomputed/precomputed-pokemon-data"
import { PRECOMPUTED_POKEMONS_PER_RARITY } from "../models/precomputed/precomputed-rarity"
import { getAdditionalsTier1 } from "../models/shop"
import { getAvatarString } from "../public/src/utils"
import {
  Emotion,
  IDragDropCombineMessage,
  IDragDropItemMessage,
  IDragDropMessage,
  IGameHistoryPokemonRecord,
  IGameHistorySimplePlayer,
  IGameMetadata,
  IPokemon,
  IPokemonEntity,
  Role,
  Title,
  Transfer
} from "../types"
import {
  AdditionalPicksStages,
  EloRank,
  ExpPlace,
  LegendaryShop,
  MAX_SIMULATION_DELTA_TIME,
  PortalCarouselStages,
  RequiredStageLevelForXpElligibility,
  UniqueShop
} from "../types/Config"
import { GameMode, PokemonActionState } from "../types/enum/Game"
import { Item } from "../types/enum/Item"
import {
  Pkm,
  PkmDuos,
  PkmProposition,
  PkmRegionalVariants
} from "../types/enum/Pokemon"
import { SpecialGameRule } from "../types/enum/SpecialGameRule"
import { Synergy } from "../types/enum/Synergy"
import { removeInArray } from "../utils/array"
import {
  getFirstAvailablePositionInBench,
  getFreeSpaceOnBench
} from "../utils/board"
import { logger } from "../utils/logger"
import { shuffleArray } from "../utils/random"
import { keys, values } from "../utils/schemas"
import {
  OnDragDropCombineCommand,
  OnDragDropCommand,
  OnDragDropItemCommand,
  OnJoinCommand,
  OnLevelUpCommand,
  OnLockCommand,
  OnPickBerryCommand,
  OnPokemonCatchCommand,
  OnRefreshCommand,
  OnRemoveFromShopCommand,
  OnSellDropCommand,
  OnShopCommand,
  OnSpectateCommand,
  OnUpdateCommand
} from "./commands/game-commands"
import GameState from "./states/game-state"

export default class GameRoom extends Room<GameState> {
  dispatcher: Dispatcher<this>
  additionalUncommonPool: Array<Pkm>
  additionalRarePool: Array<Pkm>
  additionalEpicPool: Array<Pkm>
  miniGame: MiniGame
  constructor() {
    super()
    this.dispatcher = new Dispatcher(this)
    this.additionalUncommonPool = new Array<Pkm>()
    this.additionalRarePool = new Array<Pkm>()
    this.additionalEpicPool = new Array<Pkm>()
    this.miniGame = new MiniGame(this)
  }

  // When room is initialized
  async onCreate(options: {
    users: Record<string, IGameUser>
    preparationId: string
    name: string
    ownerName: string
    noElo: boolean
    gameMode: GameMode
    minRank: EloRank | null
    tournamentId: string | null
    bracketId: string | null
  }) {
    logger.info("create game room")
    this.setMetadata(<IGameMetadata>{
      name: options.name,
      ownerName: options.ownerName,
      gameMode: options.gameMode,
      playerIds: Object.keys(options.users).filter(
        (id) => options.users[id].isBot === false
      ),
      playersInfo: Object.keys(options.users).map(
        (u) => `${options.users[u].name} [${options.users[u].elo}]`
      ),
      stageLevel: 0,
      type: "game",
      tournamentId: options.tournamentId,
      bracketId: options.bracketId
    })
    // logger.debug(options);
    this.setState(
      new GameState(
        options.preparationId,
        options.name,
        options.noElo,
        options.gameMode,
        options.minRank
      )
    )
    this.miniGame.create(
      this.state.avatars,
      this.state.floatingItems,
      this.state.portals,
      this.state.symbols
    )

    this.additionalUncommonPool = getAdditionalsTier1(
      PRECOMPUTED_POKEMONS_PER_RARITY.UNCOMMON
    )
    this.additionalRarePool = getAdditionalsTier1(
      PRECOMPUTED_POKEMONS_PER_RARITY.RARE
    )
    this.additionalEpicPool = getAdditionalsTier1(
      PRECOMPUTED_POKEMONS_PER_RARITY.EPIC
    )

    shuffleArray(this.additionalUncommonPool)
    shuffleArray(this.additionalRarePool)
    shuffleArray(this.additionalEpicPool)

    if (this.state.specialGameRule === SpecialGameRule.EVERYONE_IS_HERE) {
      this.additionalUncommonPool.forEach((p) =>
        this.state.shop.addAdditionalPokemon(p)
      )
      this.additionalRarePool.forEach((p) =>
        this.state.shop.addAdditionalPokemon(p)
      )
      this.additionalEpicPool.forEach((p) =>
        this.state.shop.addAdditionalPokemon(p)
      )
    }

    await Promise.all(
      Object.keys(options.users).map(async (id) => {
        const user = options.users[id]
        //logger.debug(`init player`, user)
        if (user.isBot) {
          const player = new Player(
            user.id,
            user.name,
            user.elo,
            user.avatar,
            true,
            this.state.players.size + 1,
            new Map<string, IPokemonConfig>(),
            "",
            Role.BOT,
            this.state
          )
          this.state.players.set(user.id, player)
          this.state.botManager.addBot(player)
          //this.state.shop.assignShop(player)
        } else {
          const user = await UserMetadata.findOne({ uid: id })
          if (user) {
            // init player
            const player = new Player(
              user.uid,
              user.displayName,
              user.elo,
              user.avatar,
              false,
              this.state.players.size + 1,
              user.pokemonCollection,
              user.title,
              user.role,
              this.state
            )

            this.state.players.set(user.uid, player)
            this.state.shop.assignShop(player, false, this.state)

            if (
              this.state.specialGameRule === SpecialGameRule.EVERYONE_IS_HERE
            ) {
              PRECOMPUTED_REGIONAL_MONS.forEach((p) => {
                if (getPokemonData(p).stars === 1) {
                  this.state.shop.addRegionalPokemon(p, player)
                }
              })
            }
          }
        }
      })
    )

    setTimeout(
      () => {
        this.broadcast(Transfer.LOADING_COMPLETE)
        this.startGame()
      },
      5 * 60 * 1000
    ) // maximum 5 minutes of loading game, game will start no matter what after that

    this.onMessage(Transfer.ITEM, (client, item: Item) => {
      if (!this.state.gameFinished && client.auth) {
        try {
          this.pickItemProposition(client.auth.uid, item)
        } catch (error) {
          logger.error(error)
        }
      }
    })

    this.onMessage(Transfer.SHOP, (client, message) => {
      if (!this.state.gameFinished && client.auth) {
        try {
          this.dispatcher.dispatch(new OnShopCommand(), {
            playerId: client.auth.uid,
            index: message.id
          })
        } catch (error) {
          logger.error("shop error", message, error)
        }
      }
    })

    this.onMessage(Transfer.REMOVE_FROM_SHOP, (client, index) => {
      if (!this.state.gameFinished && client.auth) {
        try {
          this.dispatcher.dispatch(new OnRemoveFromShopCommand(), {
            playerId: client.auth.uid,
            index
          })
        } catch (error) {
          logger.error("remove from shop error", index, error)
        }
      }
    })

    this.onMessage(Transfer.POKEMON_PROPOSITION, (client, pkm: Pkm) => {
      if (!this.state.gameFinished && client.auth) {
        try {
          this.pickPokemonProposition(client.auth.uid, pkm)
        } catch (error) {
          logger.error(error)
        }
      }
    })

    this.onMessage(Transfer.DRAG_DROP, (client, message: IDragDropMessage) => {
      if (!this.state.gameFinished) {
        try {
          this.dispatcher.dispatch(new OnDragDropCommand(), {
            client: client,
            detail: message
          })
        } catch (error) {
          const errorInformation = {
            updateBoard: true,
            updateItems: true
          }
          client.send(Transfer.DRAG_DROP_FAILED, errorInformation)
          logger.error("drag drop error", error)
        }
      }
    })

    this.onMessage(
      Transfer.DRAG_DROP_ITEM,
      (client, message: IDragDropItemMessage) => {
        if (!this.state.gameFinished) {
          try {
            this.dispatcher.dispatch(new OnDragDropItemCommand(), {
              client: client,
              detail: message
            })
          } catch (error) {
            const errorInformation = {
              updateBoard: true,
              updateItems: true
            }
            client.send(Transfer.DRAG_DROP_FAILED, errorInformation)
            logger.error("drag drop error", error)
          }
        }
      }
    )

    this.onMessage(
      Transfer.DRAG_DROP_COMBINE,
      (client, message: IDragDropCombineMessage) => {
        if (!this.state.gameFinished) {
          try {
            this.dispatcher.dispatch(new OnDragDropCombineCommand(), {
              client: client,
              detail: message
            })
          } catch (error) {
            const errorInformation = {
              updateBoard: true,
              updateItems: true
            }
            client.send(Transfer.DRAG_DROP_FAILED, errorInformation)
            logger.error("drag drop error", error)
          }
        }
      }
    )

    this.onMessage(
      Transfer.VECTOR,
      (client, message: { x: number; y: number }) => {
        try {
          if (client.auth) {
            this.miniGame.applyVector(client.auth.uid, message.x, message.y)
          }
        } catch (error) {
          logger.error(error)
        }
      }
    )

    this.onMessage(Transfer.SELL_POKEMON, (client, pokemonId: string) => {
      if (!this.state.gameFinished && client.auth) {
        try {
          this.dispatcher.dispatch(new OnSellDropCommand(), {
            client,
            pokemonId
          })
        } catch (error) {
          logger.error("sell drop error", pokemonId)
        }
      }
    })

    this.onMessage(Transfer.REFRESH, (client, message) => {
      if (!this.state.gameFinished && client.auth) {
        try {
          this.dispatcher.dispatch(new OnRefreshCommand(), client.auth.uid)
        } catch (error) {
          logger.error("refresh error", message)
        }
      }
    })

    this.onMessage(Transfer.LOCK, (client, message) => {
      if (!this.state.gameFinished && client.auth) {
        try {
          this.dispatcher.dispatch(new OnLockCommand(), client.auth.uid)
        } catch (error) {
          logger.error("lock error", message)
        }
      }
    })

    this.onMessage(Transfer.SPECTATE, (client, spectatedPlayerId: string) => {
      if (client.auth) {
        try {
          this.dispatcher.dispatch(new OnSpectateCommand(), {
            id: client.auth.uid,
            spectatedPlayerId
          })
        } catch (error) {
          logger.error("spectate error", client.auth.uid, spectatedPlayerId)
        }
      }
    })

    this.onMessage(Transfer.LEVEL_UP, (client, message) => {
      if (!this.state.gameFinished && client.auth) {
        try {
          this.dispatcher.dispatch(new OnLevelUpCommand(), client.auth.uid)
        } catch (error) {
          logger.error("level up error", message)
        }
      }
    })

    this.onMessage(Transfer.SHOW_EMOTE, (client: Client, message?: string) => {
      if (client.auth) {
        this.broadcast(Transfer.SHOW_EMOTE, {
          id: client.auth.uid,
          emote: message
        })
      }
    })

    this.onMessage(Transfer.UNOWN_WANDERING, async (client, unownIndex) => {
      try {
        if (client.auth) {
          const DUST_PER_ENCOUNTER = 50
          const u = await UserMetadata.findOne({ uid: client.auth.uid })
          if (u) {
            const c = u.pokemonCollection.get(unownIndex)
            if (c) {
              c.dust += DUST_PER_ENCOUNTER
            } else {
              u.pokemonCollection.set(unownIndex, {
                id: unownIndex,
                emotions: [],
                shinyEmotions: [],
                dust: DUST_PER_ENCOUNTER,
                selectedEmotion: Emotion.NORMAL,
                selectedShiny: false
              })
            }
            u.save()
          }
        }
      } catch (error) {
        logger.error(error)
      }
    })

    this.onMessage(Transfer.POKEMON_WANDERING, async (client, pkm) => {
      if (client.auth) {
        try {
          this.dispatcher.dispatch(new OnPokemonCatchCommand(), {
            playerId: client.auth.uid,
            pkm
          })
        } catch (e) {
          logger.error("catch wandering error", e)
        }
      }
    })

    this.onMessage(Transfer.PICK_BERRY, async (client, index) => {
      if (!this.state.gameFinished && client.auth) {
        try {
          this.dispatcher.dispatch(new OnPickBerryCommand(), {
            playerId: client.auth.uid,
            berryIndex: index
          })
        } catch (error) {
          logger.error("error picking berry", error)
        }
      }
    })

    this.onMessage(Transfer.LOADING_PROGRESS, (client, progress: number) => {
      if (client.auth) {
        const player = this.state.players.get(client.auth.uid)
        if (player) {
          player.loadingProgress = progress
        }
      }
    })

    this.onMessage(Transfer.LOADING_COMPLETE, (client) => {
      if (client.auth) {
        const player = this.state.players.get(client.auth.uid)
        if (player) {
          player.loadingProgress = 100
        }
        if (this.state.gameLoaded) {
          // already started, presumably a user refreshed page and wants to reconnect to game
          client.send(Transfer.LOADING_COMPLETE)
        } else if (
          values(this.state.players).every((p) => p.loadingProgress === 100)
        ) {
          this.broadcast(Transfer.LOADING_COMPLETE)
          this.startGame()
        }
      }
    })
  }

  startGame() {
    if (this.state.gameLoaded) return // already started
    this.state.gameLoaded = true
    this.setSimulationInterval((deltaTime: number) => {
      /* in case of lag spikes, the game should feel slower, 
      but this max simulation dt helps preserving the correctness of simulation result */
      deltaTime = Math.min(MAX_SIMULATION_DELTA_TIME, deltaTime)
      if (!this.state.gameFinished) {
        try {
          this.dispatcher.dispatch(new OnUpdateCommand(), { deltaTime })
        } catch (error) {
          logger.error("update error", error)
        }
      }
    })
  }

  async onAuth(client: Client, options, request) {
    try {
      super.onAuth(client, options, request)
      const token = await admin.auth().verifyIdToken(options.idToken)
      const user = await admin.auth().getUser(token.uid)
      const isBanned = await BannedUser.findOne({ uid: user.uid })
      const userProfile = await UserMetadata.findOne({ uid: user.uid })
      client.send(Transfer.USER_PROFILE, userProfile)

      if (!user.displayName) {
        throw "No display name"
      } else if (isBanned) {
        throw "User banned"
      } else {
        return user
      }
    } catch (error) {
      logger.error(error)
    }
  }

  onJoin(client: Client, options, auth) {
    this.dispatcher.dispatch(new OnJoinCommand(), { client, options, auth })
  }

  async onLeave(client: Client, consented: boolean) {
    try {
      /*if (client && client.auth && client.auth.displayName) {
        logger.info(`${client.auth.displayName} has been disconnected`)
      }*/
      if (consented) {
        throw new Error("consented leave")
      }

      // allow disconnected client to reconnect into this room until 3 minutes
      await this.allowReconnection(client, 180)
    } catch (e) {
      if (client && client.auth && client.auth.displayName) {
        //logger.info(`${client.auth.displayName} left game`)
        const player = this.state.players.get(client.auth.uid)
        if (player && this.state.stageLevel <= 5) {
          // if player left game during the loading screen or before stage 6, remove it from the players
          this.state.players.delete(client.auth.uid)
          this.setMetadata({
            playerIds: removeInArray(this.metadata.playerIds, client.auth.uid)
          })
          /*logger.info(
            `${client.auth.displayName} has been removed from players list`
          )*/
        }
      }
      if (values(this.state.players).every((p) => p.loadingProgress === 100)) {
        this.broadcast(Transfer.LOADING_COMPLETE)
        this.startGame()
      }
    }
  }

  async onDispose() {
    const playersAlive = values(this.state.players).filter((p) => p.alive)
    const humansAlive = playersAlive.filter((p) => !p.isBot)

    // we skip elo compute/game history if game is not finished
    // that is at least two players including one human are still alive
    if (playersAlive.length >= 2 && humansAlive.length >= 1) {
      if (humansAlive.length > 1) {
        // this can happen if all players disconnect before the end
        // or if there's another technical issue
        // adding a log just in case
        logger.warn(
          `Game room has been disposed while they were still ${humansAlive.length} players alive.`
        )
      }
      return // game not finished before being disposed, we skip elo compute/game history
    }

    try {
      this.state.endTime = Date.now()
      const players: components["schemas"]["GameHistory"]["players"] = []
      this.state.players.forEach((p) => {
        if (!p.isBot) {
          players.push(this.transformToSimplePlayer(p))
        }
      })
      History.create({
        id: this.state.preparationId,
        name: this.state.name,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        players
      })

      const humans: Player[] = []
      const bots: Player[] = []

      this.state.players.forEach((player) => {
        if (player.isBot) {
          bots.push(player)
        } else {
          humans.push(player)
        }
      })

      const elligibleToXP =
        this.state.players.size >= 2 &&
        this.state.stageLevel >= RequiredStageLevelForXpElligibility
      const elligibleToELO =
        elligibleToXP && !this.state.noElo && humans.length >= 2

      if (elligibleToXP) {
        for (let i = 0; i < bots.length; i++) {
          const player = bots[i]
          const results = await BotV2.find({ id: player.id })
          if (results) {
            results.forEach((bot) => {
              bot.elo = computeElo(
                this.transformToSimplePlayer(player),
                player.rank,
                bot.elo,
                [...humans, ...bots].map((p) => this.transformToSimplePlayer(p))
              )
              bot.save()
            })
          }
        }

        for (let i = 0; i < humans.length; i++) {
          const player = humans[i]
          const exp = ExpPlace[player.rank - 1]
          let rank = player.rank

          if (!this.state.gameFinished && player.life > 0) {
            let rankOfLastPlayerAlive = this.state.players.size
            this.state.players.forEach((plyr) => {
              if (plyr.life <= 0 && plyr.rank < rankOfLastPlayerAlive) {
                rankOfLastPlayerAlive = plyr.rank
              }
            })
            rank = rankOfLastPlayerAlive
          }

          const usr = await UserMetadata.findOne({ uid: player.id })
          if (usr) {
            const expThreshold = 1000
            if (usr.exp + exp >= expThreshold) {
              usr.level += 1
              usr.booster += 1
              usr.exp = usr.exp + exp - expThreshold
            } else {
              usr.exp = usr.exp + exp
            }
            usr.exp = !isNaN(usr.exp) ? usr.exp : 0

            if (rank === 1) {
              usr.wins += 1
              if (this.state.gameMode === GameMode.RANKED) {
                usr.booster += 1
                player.titles.add(Title.VANQUISHER)
                const minElo = Math.min(
                  ...values(this.state.players).map((p) => p.elo)
                )
                if (usr.elo === minElo && humans.length >= 8) {
                  player.titles.add(Title.OUTSIDER)
                }
                this.presence.publish("ranked-lobby-winner", player)
              }
            }

            if (usr.level >= 10) {
              player.titles.add(Title.ROOKIE)
            }
            if (usr.level >= 20) {
              player.titles.add(Title.AMATEUR)
              player.titles.add(Title.BOT_BUILDER)
            }
            if (usr.level >= 30) {
              player.titles.add(Title.VETERAN)
            }
            if (usr.level >= 50) {
              player.titles.add(Title.PRO)
            }
            if (usr.level >= 100) {
              player.titles.add(Title.EXPERT)
            }
            if (usr.level >= 150) {
              player.titles.add(Title.ELITE)
            }
            if (usr.level >= 200) {
              player.titles.add(Title.MASTER)
            }
            if (usr.level >= 300) {
              player.titles.add(Title.GRAND_MASTER)
            }

            if (usr.elo != null && elligibleToELO) {
              const elo = computeElo(
                this.transformToSimplePlayer(player),
                rank,
                usr.elo,
                humans.map((p) => this.transformToSimplePlayer(p))
              )
              if (elo) {
                if (elo >= 1100) {
                  player.titles.add(Title.GYM_TRAINER)
                }
                if (elo >= 1200) {
                  player.titles.add(Title.GYM_CHALLENGER)
                }
                if (elo >= 1400) {
                  player.titles.add(Title.GYM_LEADER)
                }
                usr.elo = elo
              }

              const dbrecord = this.transformToSimplePlayer(player)
              DetailledStatistic.create({
                time: Date.now(),
                name: dbrecord.name,
                pokemons: dbrecord.pokemons,
                rank: dbrecord.rank,
                nbplayers: humans.length + bots.length,
                avatar: dbrecord.avatar,
                playerId: dbrecord.id,
                elo: elo
              })
            }

            if (player.life === 100 && rank === 1) {
              player.titles.add(Title.TYRANT)
            }
            if (player.life === 1 && rank === 1) {
              player.titles.add(Title.SURVIVOR)
            }

            if (player.rerollCount > 60) {
              player.titles.add(Title.GAMBLER)
            } else if (player.rerollCount < 20 && rank === 1) {
              player.titles.add(Title.NATURAL)
            }

            if (usr.titles === undefined) {
              usr.titles = []
            }

            player.titles.forEach((t) => {
              if (!usr.titles.includes(t)) {
                //logger.info("title added ", t)
                usr.titles.push(t)
              }
            })
            //logger.debug(usr);
            //usr.markModified('metadata');
            usr.save()
          }
        }
      }

      if (this.state.gameMode === GameMode.TOURNAMENT) {
        this.presence.publish("tournament-match-end", {
          tournamentId: this.metadata?.tournamentId,
          bracketId: this.metadata?.bracketId,
          players: humans
        })
      }

      this.dispatcher.stop()
    } catch (error) {
      logger.error(error)
    }
  }

  transformToSimplePlayer(player: Player): IGameHistorySimplePlayer {
    const simplePlayer: IGameHistorySimplePlayer = {
      name: player.name,
      id: player.id,
      rank: player.rank,
      avatar: player.avatar,
      pokemons: new Array<{
        name: Pkm
        avatar: string
        items: Item[]
        inventory: Item[]
      }>(),
      elo: player.elo,
      synergies: [],
      title: player.title,
      role: player.role
    }

    player.synergies.forEach((v, k) => {
      simplePlayer.synergies.push({ name: k as Synergy, value: v })
    })

    player.board.forEach((pokemon: IPokemon) => {
      if (pokemon.positionY != 0) {
        const avatar = getAvatarString(
          pokemon.index,
          pokemon.shiny,
          pokemon.emotion
        )
        const s: IGameHistoryPokemonRecord = {
          name: pokemon.name,
          avatar: avatar,
          items: new Array<Item>(),
          inventory: new Array<Item>()
        }
        pokemon.items.forEach((i) => {
          s.items.push(i)
          s.inventory.push(i)
        })
        simplePlayer.pokemons.push(s)
      }
    })
    return simplePlayer
  }

  swap(player: Player, pokemon: IPokemon, x: number, y: number) {
    const pokemonToSwap = this.getPokemonByPosition(player, x, y)
    if (pokemonToSwap) {
      pokemonToSwap.positionX = pokemon.positionX
      pokemonToSwap.positionY = pokemon.positionY
      pokemonToSwap.onChangePosition(
        pokemon.positionX,
        pokemon.positionY,
        player
      )
    }
    pokemon.positionX = x
    pokemon.positionY = y
  }

  getPokemonByPosition(
    player: Player,
    x: number,
    y: number
  ): Pokemon | undefined {
    return values(player.board).find(
      (pokemon) => pokemon.positionX == x && pokemon.positionY == y
    )
  }

  spawnOnBench(player: Player, pkm: Pkm, anim: "fishing" | "spawn" = "spawn") {
    const fish = PokemonFactory.createPokemonFromName(pkm, player)
    const x = getFirstAvailablePositionInBench(player.board)
    if (x !== undefined) {
      fish.positionX = x
      fish.positionY = 0
      if (anim === "fishing") {
        fish.action = PokemonActionState.FISH
      }

      player.board.set(fish.id, fish)
      this.clock.setTimeout(() => {
        fish.action = PokemonActionState.IDLE
        this.checkEvolutionsAfterPokemonAcquired(player.id)
      }, 1000)
    }
  }

  checkEvolutionsAfterPokemonAcquired(playerId: string): boolean {
    const player = this.state.players.get(playerId)
    if (!player) return false
    let hasEvolved = false

    player.board.forEach((pokemon) => {
      if (
        pokemon.evolution !== Pkm.DEFAULT &&
        pokemon.evolutionRule instanceof CountEvolutionRule
      ) {
        const pokemonEvolved = pokemon.evolutionRule.tryEvolve(
          pokemon,
          player,
          this.state.stageLevel
        )
        if (pokemonEvolved) {
          hasEvolved = true
          // check item evolution rule after count evolution (example: Clefairy)
          this.checkEvolutionsAfterItemAcquired(playerId, pokemonEvolved)
        }
      }
    })

    player.boardSize = this.getTeamSize(player.board)
    return hasEvolved
  }

  checkEvolutionsAfterItemAcquired(playerId: string, pokemon: Pokemon) {
    const player = this.state.players.get(playerId)
    if (!player) return false

    if (
      pokemon.evolutionRule &&
      pokemon.evolutionRule instanceof ItemEvolutionRule
    ) {
      const pokemonEvolved = pokemon.evolutionRule.tryEvolve(
        pokemon,
        player,
        this.state.stageLevel
      )
      if (pokemonEvolved) {
        // check additional item evolution rules. Not used yet in the game but we never know
        this.checkEvolutionsAfterItemAcquired(playerId, pokemonEvolved)
      }
    }
  }

  getNumberOfPlayersAlive(players: MapSchema<Player>) {
    let numberOfPlayersAlive = 0
    players.forEach((player, key) => {
      if (player.alive) {
        numberOfPlayersAlive++
      }
    })
    return numberOfPlayersAlive
  }

  getTeamSize(board: MapSchema<Pokemon>) {
    let size = 0

    board.forEach((pokemon, key) => {
      if (pokemon.positionY != 0) {
        size++
      }
    })

    return size
  }

  pickPokemonProposition(
    playerId: string,
    pkm: PkmProposition,
    bypassLackOfSpace = false
  ) {
    const player = this.state.players.get(playerId)
    if (!player || player.pokemonsProposition.length === 0) return
    if (this.state.additionalPokemons.includes(pkm as Pkm)) return // already picked, probably a double click
    if (
      UniqueShop.includes(pkm) &&
      this.state.stageLevel !== PortalCarouselStages[0]
    )
      return // should not be pickable at this stage
    if (
      LegendaryShop.includes(pkm) &&
      this.state.stageLevel !== PortalCarouselStages[1]
    )
      return // should not be pickable at this stage

    const pokemonsObtained: Pokemon[] = (
      pkm in PkmDuos ? PkmDuos[pkm] : [pkm]
    ).map((p) => PokemonFactory.createPokemonFromName(p, player))

    const freeSpace = getFreeSpaceOnBench(player.board)
    if (freeSpace < pokemonsObtained.length && !bypassLackOfSpace) return // prevent picking if not enough space on bench

    // at this point, the player is allowed to pick a proposition
    const selectedIndex = player.pokemonsProposition.indexOf(pkm)
    player.pokemonsProposition.clear()

    if (AdditionalPicksStages.includes(this.state.stageLevel)) {
      this.state.additionalPokemons.push(pkm as Pkm)
      this.state.shop.addAdditionalPokemon(pkm)
      if (pkm in PkmRegionalVariants) {
        const variant = PkmRegionalVariants[pkm]
        if (
          PokemonClasses[variant].prototype.isInRegion(
            variant,
            player.map,
            this.state
          )
        ) {
          player.regionalPokemons.push(variant)
        }
      }

      if (
        player.itemsProposition.length > 0 &&
        player.itemsProposition[selectedIndex] != null
      ) {
        player.items.push(player.itemsProposition[selectedIndex])
        player.itemsProposition.clear()
      }
    }

    pokemonsObtained.forEach((pokemon) => {
      const freeCellX = getFirstAvailablePositionInBench(player.board)
      if (freeCellX !== undefined) {
        pokemon.positionX = freeCellX
        pokemon.positionY = 0
        player.board.set(pokemon.id, pokemon)
        pokemon.onAcquired(player)
      }
    })
  }

  pickItemProposition(playerId: string, item: Item) {
    const player = this.state.players.get(playerId)
    if (player && player.itemsProposition.includes(item)) {
      player.items.push(item)
      player.itemsProposition.clear()
    }
  }

  computeRoundDamage(
    opponentTeam: MapSchema<IPokemonEntity>,
    stageLevel: number
  ) {
    if (this.state.specialGameRule === SpecialGameRule.NINE_LIVES) return 1

    let damage = Math.ceil(stageLevel / 2)
    if (opponentTeam.size > 0) {
      opponentTeam.forEach((pokemon) => {
        if (!pokemon.isClone) {
          damage += 1
        }
      })
    }
    return damage
  }

  rankPlayers() {
    const rankArray = new Array<{ id: string; life: number; level: number }>()
    this.state.players.forEach((player) => {
      if (!player.alive) {
        return
      }

      rankArray.push({
        id: player.id,
        life: player.life,
        level: player.experienceManager.level
      })
    })

    const sortPlayers = (
      a: { id: string; life: number; level: number },
      b: { id: string; life: number; level: number }
    ) => {
      let diff = b.life - a.life
      if (diff == 0) {
        diff = b.level - a.level
      }
      return diff
    }

    rankArray.sort(sortPlayers)

    rankArray.forEach((rankPlayer, index) => {
      const player = this.state.players.get(rankPlayer.id)
      if (player) {
        player.rank = index + 1
      }
    })
  }
}
