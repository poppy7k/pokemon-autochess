import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema"
import { nanoid } from "nanoid"
import { GameUser } from "../../models/colyseus-models/game-user"
import Message from "../../models/colyseus-models/message"
import { EloRank } from "../../types/Config"
import { GameMode } from "../../types/enum/Game"

export interface IPreparationState {
  users: MapSchema<GameUser>
  messages: ArraySchema<Message>
  gameStartedAt: string | null
  ownerId: string
  ownerName: string
  name: string
  minRank: EloRank | null
  gameMode: GameMode
}

export default class PreparationState
  extends Schema
  implements IPreparationState
{
  @type([Message]) messages = new ArraySchema<Message>()
  @type({ map: GameUser }) users = new MapSchema<GameUser>()
  @type("string") gameStartedAt: string | null
  @type("string") ownerId: string
  @type("string") ownerName: string
  @type("string") name: string
  @type("string") password: string | null
  @type("string") minRank: EloRank | null
  @type("string") gameMode: GameMode = GameMode.NORMAL
  @type("boolean") noElo: boolean
  @type(["string"]) whitelist: string[]
  @type(["string"]) blacklist: string[]

  constructor(params: {
    ownerId?: string
    roomName: string
    minRank?: EloRank
    noElo?: boolean
    gameMode: GameMode
    whitelist?: string[]
    blacklist?: string[]
  }) {
    super()
    this.ownerId =
      params.gameMode === GameMode.NORMAL ? params.ownerId ?? "" : ""
    this.name = params.roomName
    this.gameStartedAt = null
    this.ownerName = ""
    this.password = null
    this.noElo = params.noElo ?? false
    this.minRank = params.minRank ?? null
    this.gameMode = params.gameMode
    this.whitelist = params.whitelist ?? []
    this.blacklist = params.blacklist ?? []
  }

  addMessage(params: {
    payload: string
    authorId: string
    author?: string | undefined
    avatar?: string | undefined
  }) {
    const id = nanoid()
    const time = Date.now()
    const message = new Message(
      id,
      params.payload,
      params.authorId,
      params.author ?? "",
      params.avatar ?? "",
      time
    )
    this.messages.push(message)
  }

  removeMessage(id: string) {
    const messageIndex = this.messages.findIndex((m) => m.id === id)
    if (messageIndex !== -1) {
      this.messages.splice(messageIndex, 1)
    }
  }
}
