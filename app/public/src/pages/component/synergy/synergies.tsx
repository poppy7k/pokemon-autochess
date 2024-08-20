import React from "react"
import { useTranslation } from "react-i18next"
import { SynergyTriggers } from "../../../../../types/Config"
import { Synergy } from "../../../../../types/enum/Synergy"
import SynergyComponent from "./synergy-component"

import "./synergies.css"

export default function Synergies(props: { synergies: [string, number][] }) {
  const { t } = useTranslation()
  return (
    <div className="synergies-container my-container">
      <h2 className="synergies-header">{t("synergies")}</h2>
      {Object.keys(Synergy)
        .sort((a, b) => {
          const fa = props.synergies.find((e) => e[0] == a)
          const fb = props.synergies.find((e) => e[0] == b)
          const sa = fa ? fa : 0
          const sb = fb ? fb : 0
          if (sa[1] == sb[1]) {
            if (sa[1] >= SynergyTriggers[a][0]) {
              return -1
            } else {
              return 1
            }
          } else {
            return sb[1] - sa[1]
          }
        })
        .map((type, index) => {
          const s = props.synergies.find((e) => e[0] == type)
          if (s && s[1] > 0) {
            return (
              <SynergyComponent
                key={type}
                type={type as Synergy}
                value={s[1]}
                index={index}
              />
            )
          } else {
            return null
          }
        })}
    </div>
  )
}
