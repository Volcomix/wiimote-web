import VibrationIcon from '@mui/icons-material/Vibration'
import cx from 'classnames'

import useUpdate from 'hooks/useUpdate'
import { Wiimote } from 'services/wiimote'

import styles from './Rumble.module.css'

type RumbleProps = {
  wiimote: Wiimote
}

const Rumble = ({ wiimote }: RumbleProps) => {
  const update = useUpdate()

  return (
    <button
      className={cx(styles.root, { [styles.enabled]: wiimote.rumble })}
      onClick={async () => {
        await wiimote.sendRumble(!wiimote.rumble)
        update()
      }}
    >
      <VibrationIcon className={styles.icon} />
    </button>
  )
}

export default Rumble
