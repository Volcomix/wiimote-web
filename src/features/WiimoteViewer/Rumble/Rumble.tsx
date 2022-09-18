import VibrationIcon from '@mui/icons-material/Vibration'
import cx from 'classnames'
import { useEffect, useState } from 'react'

import { Wiimote } from 'services/wiimote'

import styles from './Rumble.module.css'

type RumbleProps = {
  wiimote: Wiimote
}

const Rumble = ({ wiimote }: RumbleProps) => {
  const [rumble, setRumble] = useState(wiimote.rumble)

  useEffect(() => {
    if (!rumble) {
      return
    }
    const intervalId = setInterval(() => {
      wiimote.sendRumble(true)
      setTimeout(() => wiimote.sendRumble(false), 10)
    }, 30)
    return () => clearInterval(intervalId)
  }, [rumble, wiimote])

  return (
    <button
      className={cx(styles.root, { [styles.enabled]: rumble })}
      onClick={() => setRumble(!rumble)}
    >
      <VibrationIcon className={styles.icon} />
    </button>
  )
}

export default Rumble
