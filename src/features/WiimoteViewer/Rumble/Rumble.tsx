import VibrationIcon from '@mui/icons-material/Vibration'
import Slider from '@mui/material/Slider'
import cx from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { Wiimote } from 'services/wiimote'

import styles from './Rumble.module.css'

type RumbleProps = {
  wiimote: Wiimote
}

const RUMBLE_STEP = 30

const Rumble = ({ wiimote }: RumbleProps) => {
  const [rumble, setRumble] = useState(wiimote.rumble)
  const intensity = useRef(wiimote.rumble ? 100 : 0)

  useEffect(() => {
    if (!rumble) {
      return
    }
    const intervalId = setInterval(() => {
      wiimote.sendRumble(true)
      if (intensity.current < 100) {
        setTimeout(
          () => wiimote.sendRumble(false),
          RUMBLE_STEP * (intensity.current / 100)
        )
      }
    }, RUMBLE_STEP)
    return () => {
      clearInterval(intervalId)
      wiimote.sendRumble(false)
    }
  }, [rumble, wiimote])

  return (
    <>
      <button
        className={cx(styles.root, { [styles.enabled]: rumble })}
        onClick={() => setRumble(!rumble)}
      >
        <VibrationIcon className={styles.icon} />
      </button>
      <Slider
        className={styles.slider}
        orientation="vertical"
        defaultValue={0}
        onChange={(_, value) => {
          intensity.current = value as number
          if (value === 0) {
            setRumble(false)
          } else {
            setRumble(true)
          }
        }}
      />
    </>
  )
}

export default Rumble
