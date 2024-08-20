import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { Role, Title } from "../../../../../types"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { setSearchedUser, setSuggestions } from "../../../stores/LobbyStore"
import {
  ban,
  giveBooster,
  giveRole,
  giveTitle,
  searchName,
  unban
} from "../../../stores/NetworkStore"
import { AvatarTab } from "./avatar-tab"
import { GadgetsTab } from "./gadgets-tab"
import History from "./history"
import { NameTab } from "./name-tab"
import PlayerBox from "./player-box"
import "./profile.css"
import { SearchBar } from "./search-bar"
import SearchResults from "./search-results"
import { TitleTab } from "./title-tab"

export default function Profile() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.lobby.user)
  const suggestions = useAppSelector((state) => state.lobby.suggestions)
  const searchedUser = useAppSelector((state) => state.lobby.searchedUser)

  const profile = searchedUser ?? user

  function onSearchQueryChange(query: string) {
    if (query) {
      dispatch(searchName(query))
    } else {
      resetSearch()
    }
  }

  const resetSearch = useCallback(() => {
    dispatch(setSearchedUser(undefined))
    dispatch(setSuggestions([]))
  }, [dispatch])

  return (
    <div className="profile-modal">
      <div className="profile-box">
        <h2>{profile?.name ?? ""} {t("profile")}</h2>
        {profile && <PlayerBox user={profile} />}
      </div>

      <SearchBar onChange={onSearchQueryChange} />

      <div className="profile-actions">
        {searchedUser ? (
          <OtherProfileActions resetSearch={resetSearch} />
        ) : suggestions.length > 0 ? (
          <SearchResults />
        ) : (
          <MyProfileMenu />
        )}
      </div>

      {profile && <History history={profile.history.map(r=>r)} />}
    </div>
  )
}

function MyProfileMenu() {
  const { t } = useTranslation()
  return (
    <Tabs>
      <TabList>
        <Tab>{t("name")}</Tab>
        <Tab>{t("avatar")}</Tab>
        <Tab>{t("title_label")}</Tab>
        <Tab>{t("gadgets")}</Tab>
      </TabList>

      <TabPanel>
        <NameTab />
      </TabPanel>
      <TabPanel>
        <AvatarTab />
      </TabPanel>
      <TabPanel>
        <TitleTab />
      </TabPanel>
      <TabPanel>
        <GadgetsTab />
      </TabPanel>
    </Tabs>
  )
}

function OtherProfileActions({ resetSearch }) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const role = useAppSelector((state) => state.lobby.user?.role)
  const user = useAppSelector((state) => state.lobby.searchedUser)
  const [title, setTitle] = useState<Title>(user?.title || Title.ACE_TRAINER)
  const [profileRole, setProfileRole] = useState<Role>(user?.role ?? Role.BASIC)

  const giveButton =
    user && role && role === Role.ADMIN ? (
      <button
        className="bubbly green"
        onClick={() => {
          dispatch(
            giveBooster({
              numberOfBoosters: Number(prompt("How many boosters ?")) || 1,
              uid: user.id
            })
          )
        }}
      >
        <p style={{ margin: "0px" }}>{t("give_boosters")}</p>
      </button>
    ) : null

  const banButton =
    user && role && (role === Role.ADMIN || role === Role.MODERATOR) ? (
      <button
        className="bubbly red"
        onClick={() => {
          const reason = prompt(`Reason for the ban:`)
          dispatch(ban({ uid: user.id, reason: reason ? reason : "" }))
        }}
      >
        <p style={{ margin: "0px" }}>{t("ban_user")}</p>
      </button>
    ) : null

  const unbanButton =
    user && role && (role === Role.ADMIN || role === Role.MODERATOR) ? (
      <button
        className="bubbly red"
        onClick={() => {
          dispatch(unban({ uid: user.id, name: user.name }))
        }}
      >
        <p style={{ margin: "0px" }}>{t("unban_user")}</p>
      </button>
    ) : null

  const roleButton =
    user && role && role === Role.ADMIN ? (
      <div className="my-input-group">
        <button
          className="bubbly orange"
          onClick={() => {
            dispatch(giveRole({ uid: user.id, role: profileRole }))
            alert(`Role ${profileRole} given to ${user.name}`)
          }}
        >
          {t("give_role")}
        </button>
        <select
          value={profileRole}
          onChange={(e) => {
            setProfileRole(e.target.value as Role)
          }}
        >
          {Object.keys(Role).map((r) => (
            <option key={r} value={r}>
              {t("role." + r).toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    ) : null

  const titleButton =
    user && role && role === Role.ADMIN ? (
      <div className="my-input-group">
        <button
          className="bubbly blue"
          onClick={() => {
            dispatch(giveTitle({ uid: user.id, title: title }))
            alert(`Title ${title} given to ${user.name}`)
          }}
        >
          {t("give_title")}
        </button>
        <select
          value={title}
          onChange={(e) => {
            setTitle(e.target.value as Title)
          }}
        >
          {Object.keys(Title).map((ti) => (
            <option key={ti} value={ti}>
              {ti}
            </option>
          ))}
        </select>
      </div>
    ) : null

  return role === Role.ADMIN || role === Role.MODERATOR ? (
    <>
      {giveButton}
      {roleButton}
      {titleButton}
      {banButton}
      {unbanButton}
      <button className="bubbly blue" onClick={resetSearch}>
        {t("back_to_my_profile")}
      </button>
    </>
  ) : null
}
