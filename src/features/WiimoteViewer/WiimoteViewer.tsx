import VibrationIcon from '@mui/icons-material/Vibration'
import cx from 'classnames'
import { useEffect, useState } from 'react'

import wiimoteBack from 'assets/wiimote-back.jpg'
import wiimoteFront from 'assets/wiimote-front.jpg'
import { Wiimote } from 'services/wiimote'
import { Leds } from 'services/wiimote/types'

import styles from './WiimoteViewer.module.css'

type WiimoteViewerProps = {
  wiimote: Wiimote
}

const WiimoteViewer = ({ wiimote }: WiimoteViewerProps) => {
  // TODO Extract update logic into a hook
  const [, setLatestUpdate] = useState({})
  const update = () => setLatestUpdate({})

  useEffect(() => {
    if (!wiimote) {
      return
    }
    wiimote.onButtonChange = update
    return () => {
      wiimote.onButtonChange = null
    }
  }, [wiimote])

  useEffect(() => {
    if (!wiimote) {
      return
    }
    wiimote.onStatus = update
    return () => {
      wiimote.onStatus = null
    }
  })

  return (
    <div className={styles.root}>
      <div className={styles.images}>
        <img className={styles.image} src={wiimoteFront} />
        <img className={styles.image} src={wiimoteBack} />
        {/* TODO Extract core buttons component */}
        <div>
          {wiimote.coreButtons.dPadLeft && (
            <div className={cx(styles.button, styles.dPadLeft)} />
          )}
          {wiimote.coreButtons.dPadRight && (
            <div className={cx(styles.button, styles.dPadRight)} />
          )}
          {wiimote.coreButtons.dPadDown && (
            <div className={cx(styles.button, styles.dPadDown)} />
          )}
          {wiimote.coreButtons.dPadUp && (
            <div className={cx(styles.button, styles.dPadUp)} />
          )}
          {wiimote.coreButtons.plus && (
            <div className={cx(styles.button, styles.plus)} />
          )}
          {wiimote.coreButtons.two && (
            <div className={cx(styles.button, styles.two)} />
          )}
          {wiimote.coreButtons.one && (
            <div className={cx(styles.button, styles.one)} />
          )}
          {wiimote.coreButtons.b && (
            <div className={cx(styles.button, styles.theB)} />
          )}
          {wiimote.coreButtons.a && (
            <div className={cx(styles.button, styles.theA)} />
          )}
          {wiimote.coreButtons.minus && (
            <div className={cx(styles.button, styles.minus)} />
          )}
          {wiimote.coreButtons.home && (
            <div className={cx(styles.button, styles.home)} />
          )}
        </div>
        {/* TODO Extract leds component */}
        <div>
          {wiimote.leds.map((isLit, i) => (
            <button
              className={cx(styles.led, { [styles.lit]: isLit })}
              key={i}
              onClick={async () => {
                await wiimote.sendLeds(
                  wiimote.leds.map((led, ledIndex) =>
                    ledIndex === i ? !led : led
                  ) as Leds
                )
                update()
              }}
            />
          ))}
        </div>
        {/* TODO Extract rumble component */}
        <button
          className={cx(styles.rumble, { [styles.enabled]: wiimote.rumble })}
          onClick={async () => {
            await wiimote.sendRumble(!wiimote.rumble)
            update()
          }}
        >
          <VibrationIcon className={styles.icon} />
        </button>
      </div>
    </div>
  )
}

export default WiimoteViewer
