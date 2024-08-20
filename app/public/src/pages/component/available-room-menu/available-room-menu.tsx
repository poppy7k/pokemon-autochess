import { Client, Room, RoomAvailable } from "colyseus.js"
import firebase from "firebase/compat/app"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ILobbyUser } from "../../../../../models/colyseus-models/lobby-user"
import PreparationState from "../../../../../rooms/states/preparation-state"
import {
  ICustomLobbyState,
  IPreparationMetadata,
  Role
} from "../../../../../types"
import { MAX_PLAYERS_PER_GAME } from "../../../../../types/Config"
import { GameMode } from "../../../../../types/enum/Game"
import { throttle } from "../../../../../utils/function"
import { logger } from "../../../../../utils/logger"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { leaveLobby } from "../../../stores/LobbyStore"
import { LocalStoreKeys, localStore } from "../../utils/store"
import RoomItem from "./room-item"
import "./available-room-menu.css"

export default function AvailableRoomMenu() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const preparationRooms: RoomAvailable[] = useAppSelector(
    (state) => state.lobby.preparationRooms
  )
  const ccu = useAppSelector((state) => state.lobby.ccu)

  const client: Client = useAppSelector((state) => state.network.client)
  const lobby: Room<ICustomLobbyState> | undefined = useAppSelector(
    (state) => state.network.lobby
  )
  const uid: string = useAppSelector((state) => state.network.uid)
  const user = useAppSelector((state) => state.lobby.user)
  const isFreshNewUser =
    user &&
    user.anonymous &&
    Date.now() - new Date(user.creationTime).getTime() < 10 * 60 * 1000
  const [isJoining, setJoining] = useState<boolean>(false)

  const createRoom = throttle(async function create(
    gameMode = GameMode.NORMAL
  ) {
    if (lobby && !isJoining) {
      setJoining(true)
      const firebaseUser = firebase.auth().currentUser
      const token = await firebaseUser?.getIdToken()
      if (token && user) {
        const name = user.name ?? "Player"
        const room: Room<PreparationState> = await client.create(
          "preparation",
          {
            gameMode,
            idToken: token,
            ownerId: uid,
            roomName:
              gameMode === GameMode.QUICKPLAY
                ? "Quick play"
                : `${name}'${name.endsWith("s") ? "" : "s"} room`
          }
        )
        await lobby.leave()
        room.connection.close()
        localStore.set(
          LocalStoreKeys.RECONNECTION_TOKEN,
          room.reconnectionToken,
          30
        )
        dispatch(leaveLobby())
        navigate("/preparation")
      }
    }
  }, 1000)

  const joinPrepRoom = throttle(async function join(
    selectedRoom: RoomAvailable<IPreparationMetadata>
  ) {
    const { whitelist, blacklist, gameStartedAt, password } =
      selectedRoom.metadata ?? {}
    if (
      selectedRoom.clients >= MAX_PLAYERS_PER_GAME ||
      gameStartedAt ||
      (whitelist &&
        whitelist.length > 0 &&
        whitelist.includes(uid) === false) ||
      (blacklist && blacklist.length > 0 && blacklist.includes(uid) === true)
    ) {
      return
    }

    if (lobby && !isJoining) {
      if (password) {
        if (user && user.role === Role.BASIC) {
          const password = prompt(`This room is private. Enter password`)
          if (selectedRoom.metadata?.password != password)
            return alert(`Wrong password !`)
        }
      }
      setJoining(true)
      const token = await firebase.auth().currentUser?.getIdToken()
      if (token) {
        try {
          const room: Room<PreparationState> = await client.joinById(
            selectedRoom.roomId,
            {
              idToken: token
            }
          )
          localStore.set(
            LocalStoreKeys.RECONNECTION_TOKEN,
            room.reconnectionToken,
            30
          )
          await lobby.leave()
          room.connection.close()
          dispatch(leaveLobby())
          navigate("/preparation")
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }, 1000)

  const quickPlay = throttle(async function quickPlay() {
    const existingQuickPlayRoom = preparationRooms.find(
      (room) => room.metadata?.gameMode === GameMode.QUICKPLAY
    )
    if (existingQuickPlayRoom) {
      joinPrepRoom(existingQuickPlayRoom)
    } else {
      createRoom(GameMode.QUICKPLAY)
    }
  }, 1000)

  return (
    <div className="my-container room-menu custom-bg">
      <h2>{t("available_rooms")}</h2>
      <p style={{ textAlign: "center" }}>
        {t("players", { count: ccu })},{" "}
        {t("rooms", { count: preparationRooms.length })}
      </p>
      {user ? (
        <>
          <ul>
            {preparationRooms.map((r) => (
              <li key={r.roomId}>
                <RoomItem room={r} click={joinPrepRoom} />
              </li>
            ))}
          </ul>
          <button
            onClick={quickPlay}
            className="bubbly green create-room-button"
          >
            {t("quick_play")}
          </button>
          <button
            onClick={() => createRoom()}
            disabled={isFreshNewUser}
            className="bubbly blue create-room-button"
          >
            {t("create_custom_room")}
          </button>
        </>
      ) : (
        <p className="subtitle">{t("loading")}</p>
      )}
    </div>
  )
}
