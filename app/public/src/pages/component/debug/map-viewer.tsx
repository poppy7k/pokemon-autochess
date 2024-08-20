import Phaser from "phaser"
import MoveToPlugin from "phaser3-rex-plugins/plugins/moveto-plugin"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { DungeonPMDO } from "../../../../../types/enum/Dungeon"
import { DebugScene } from "../../../game/scenes/debug-scene"
import "./debug-scene.css"

export default function MapViewerContainer() {
  const gameRef = useRef<Phaser.Game>()
  const debugScene = useRef<DebugScene>()

  const width = 1950
  const height = 1000

  const initialized = useRef<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  const [statusMessage, setStatusMessage] = useState<string>("")
  const maps = Object.values(DungeonPMDO)
  const [map, setMap] = useState<DungeonPMDO>(maps[0])

  const onProgress = () =>
    setStatusMessage(debugScene?.current?.loadingManager?.statusMessage ?? "")

  const onComplete = useCallback(() => {
    setStatusMessage("Loading map...")
    debugScene.current?.updateMap(map).then(() => setLoaded(true))
  }, [map])

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      debugScene.current = new DebugScene(height, width, onProgress, onComplete)

      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: "debug-scene",
        pixelArt: true,
        width,
        height,
        scale: { mode: Phaser.Scale.FIT },
        dom: {
          createContainer: true
        },
        disableContextMenu: true,
        scene: [debugScene.current],
        backgroundColor: "var(--color-bg-primary)",
        plugins: {
          global: [
            {
              key: "rexMoveTo",
              plugin: MoveToPlugin,
              start: true
            }
          ]
        }
      })
    }
  }, [height, initialized, onComplete, width])

  useEffect(() => {
    if (initialized.current === true && loaded === true) {
      debugScene.current?.updateMap(map)
    }
  }, [map])

  return (
    <div id="debug-scene" className="map-viewer">
      {!loaded && <p id="status-message">{statusMessage}</p>}
      <div id="debug-scene-controls">
        <select
          onChange={(event) => setMap(event?.target.value as DungeonPMDO)}
        >
          {maps.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
