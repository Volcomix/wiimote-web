import { useEffect } from 'react'

import wiimoteBack from 'assets/wiimote-back.jpg'
import wiimoteFront from 'assets/wiimote-front.jpg'
import { Wiimote } from 'services/wiimote'

import styles from './WiimoteViewer.module.css'

type WiimoteViewerProps = {
  wiimote: Wiimote
}

const WiimoteViewer = ({ wiimote }: WiimoteViewerProps) => {
  useEffect(() => {
    if (!wiimote) {
      return
    }
    wiimote.onButtonChange = () => {
      console.log(JSON.stringify(wiimote.coreButtons))
    }
    return () => {
      wiimote.onButtonChange = null
    }
  }, [wiimote])

  return (
    <div className={styles.root}>
      <img className={styles.image} src={wiimoteFront} />
      <img className={styles.image} src={wiimoteBack} />
    </div>
  )
}

export default WiimoteViewer
