import wiimoteBack from 'assets/wiimote-back.jpg'
import wiimoteFront from 'assets/wiimote-front.jpg'
import { Wiimote } from 'services/wiimote'

import CoreButtons from './CoreButtons'
import Leds from './Leds'
import Rumble from './Rumble'

import styles from './WiimoteViewer.module.css'

type WiimoteViewerProps = {
  wiimote: Wiimote
}

const WiimoteViewer = ({ wiimote }: WiimoteViewerProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.wiimote}>
        <img className={styles.image} src={wiimoteFront} />
        <img className={styles.image} src={wiimoteBack} />
        <CoreButtons wiimote={wiimote} />
        <Leds wiimote={wiimote} />
        <Rumble wiimote={wiimote} />
      </div>
    </div>
  )
}

export default WiimoteViewer
