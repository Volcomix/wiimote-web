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
  const [leds, setLeds] = useState(wiimote.leds)

  useEffect(() => {
    if (!wiimote) {
      return
    }
    wiimote.onButtonChange = () => setCoreButtons({ ...wiimote.coreButtons })
    return () => {
      wiimote.onButtonChange = null
    }
  }, [wiimote])

  useEffect(() => {
    if (!wiimote) {
      return
    }
    wiimote.onStatus = () => setLeds([...wiimote.leds])
    return () => {
      wiimote.onStatus = null
    }
  })

  return (
    <div className={styles.root}>
      <div className={styles.images}>
        <img className={styles.image} src={wiimoteFront} />
        <img className={styles.image} src={wiimoteBack} />
        <div>
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
          {coreButtons.plus && (
            <div className={cx(styles.button, styles.plus)} />
          )}
          {coreButtons.two && <div className={cx(styles.button, styles.two)} />}
          {coreButtons.one && <div className={cx(styles.button, styles.one)} />}
          {coreButtons.b && <div className={cx(styles.button, styles.theB)} />}
          {coreButtons.a && <div className={cx(styles.button, styles.theA)} />}
          {coreButtons.minus && (
            <div className={cx(styles.button, styles.minus)} />
          )}
          {coreButtons.home && (
            <div className={cx(styles.button, styles.home)} />
          )}
        </div>
        <div>
          {leds.map((isLit, i) => (
            <div className={cx(styles.led, { [styles.lit]: isLit })} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WiimoteViewer
