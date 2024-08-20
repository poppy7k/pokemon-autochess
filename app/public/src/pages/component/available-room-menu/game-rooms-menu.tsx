import { Client, Room, RoomAvailable } from "colyseus.js";
import firebase from "firebase/compat/app";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GameState from "../../../../../rooms/states/game-state";
import { ICustomLobbyState, IGameMetadata } from "../../../../../types";
import { throttle } from "../../../../../utils/function";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { leaveLobby } from "../../../stores/LobbyStore";
import { localStore, LocalStoreKeys } from "../../utils/store";
import GameRoomItem from "./game-room-item";

export function GameRoomsMenu() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const gameRooms: RoomAvailable[] = useAppSelector(
        (state) => state.lobby.gameRooms
    )
    const navigate = useNavigate()
    const client: Client = useAppSelector((state) => state.network.client)
    const [isJoining, setJoining] = useState<boolean>(false)
    const lobby: Room<ICustomLobbyState> | undefined = useAppSelector(
        (state) => state.network.lobby
    )

    const joinGame = throttle(async function joinGame(
        selectedRoom: RoomAvailable<IGameMetadata>,
        spectate: boolean
    ) {
        if (lobby && !isJoining) {
            setJoining(true)
            const idToken = await firebase.auth().currentUser?.getIdToken()
            if (idToken) {
                const game: Room<GameState> = await client.joinById(
                    selectedRoom.roomId,
                    {
                        idToken,
                        spectate
                    }
                )
                localStore.set(
                    LocalStoreKeys.RECONNECTION_TOKEN,
                    game.reconnectionToken,
                    30
                )
                await lobby.leave()
                game.connection.close()
                dispatch(leaveLobby())
                navigate("/game")
            }
        }
    }, 1000)

    const nbUsersInGameRoom = useAppSelector((state) => state.lobby.gameRooms.reduce((total, r) => total + r.clients, 0))

    return <div className="my-container room-menu custom-bg">
        <h2>{t("in_game")}</h2>
        <p style={{ textAlign: "center" }}>{t("players", { count: nbUsersInGameRoom })}, {t("rooms", { count: gameRooms.length })}</p>
        <ul className="hidden-scrollable">
            {gameRooms.map((r) => (
                <li key={r.roomId}>
                    <GameRoomItem
                        room={r}
                        onJoin={(spectate) => joinGame(r, spectate)}
                    />
                </li>
            ))}
        </ul>
    </div>
}