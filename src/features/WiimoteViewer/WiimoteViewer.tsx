import cx from 'classnames'
import { useEffect, useState } from 'react'

import wiimoteBack from 'assets/wiimote-back.jpg'
import wiimoteFront from 'assets/wiimote-front.jpg'
import { Wiimote } from 'services/wiimote'

import styles from './WiimoteViewer.module.css'

type WiimoteViewerProps = {
  wiimote: Wiimote
}

const WiimoteViewer = ({ wiimote }: WiimoteViewerProps) => {
  const [coreButtons, setCoreButtons] = useState(wiimote.coreButtons)

  useEffect(() => {
    if (!wiimote) {
      return
    }
    wiimote.onButtonChange = () => setCoreButtons({ ...wiimote.coreButtons })
    return () => {
      wiimote.onButtonChange = null
    }
  }, [wiimote])

  return (
    <div className={styles.root}>
      <div className={styles.images}>
        <img className={styles.image} src={wiimoteFront} />
        <img className={styles.image} src={wiimoteBack} />
        {coreButtons.dPadLeft && (
          <div className={cx(styles.button, styles.dPadLeft)} />
        )}
        {coreButtons.dPadRight && (
          <div className={cx(styles.button, styles.dPadRight)} />
        )}
        {coreButtons.dPadDown && (
          <div className={cx(styles.button, styles.dPadDown)} />
        )}
        {coreButtons.dPadUp && (
          <div className={cx(styles.button, styles.dPadUp)} />
        )}
        {coreButtons.plus && <div className={cx(styles.button, styles.plus)} />}
      </div>
    </div>
  )
}

export default WiimoteViewer
