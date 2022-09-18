import cx from 'classnames'
import { useEffect } from 'react'

import useUpdate from 'hooks/useUpdate'
import { Wiimote } from 'services/wiimote'

import styles from './CoreButtons.module.css'

type CoreButtonsProps = {
  wiimote: Wiimote
}

const CoreButtons = ({ wiimote }: CoreButtonsProps) => {
  const update = useUpdate()

  useEffect(() => {
    if (!wiimote) {
      return
    }
    wiimote.onCoreButtonChange = update
    return () => {
      wiimote.onCoreButtonChange = null
    }
  }, [update, wiimote])

  return (
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
  )
}

export default CoreButtons
