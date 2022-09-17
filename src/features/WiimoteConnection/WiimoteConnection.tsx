import Button from '@mui/material/Button'

import * as wiimoteService from 'services/wiimote'
import { Wiimote } from 'services/wiimote'

import styles from './WiimoteConnection.module.css'

type WiimoteConnectionProps = {
  onConnect: (wiimote: Wiimote) => void
}

const WiimoteConnection = ({ onConnect }: WiimoteConnectionProps) => {
  return (
    <div className={styles.root}>
      <Button
        variant="outlined"
        onClick={async () => {
          const wiimote = await wiimoteService.connect()
          wiimote && onConnect(wiimote)
        }}
      >
        Connect wiimote
      </Button>
    </div>
  )
}

export default WiimoteConnection
