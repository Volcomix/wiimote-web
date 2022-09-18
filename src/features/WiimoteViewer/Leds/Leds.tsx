import cx from 'classnames'
import { useEffect } from 'react'

import useUpdate from 'hooks/useUpdate'
import { Leds as LedsType, Wiimote } from 'services/wiimote'

import styles from './Leds.module.css'

type LedsProps = {
  wiimote: Wiimote
}

const Leds = ({ wiimote }: LedsProps) => {
  const update = useUpdate()

  useEffect(() => {
    if (!wiimote) {
      return
    }
    wiimote.onStatus = update
    update()
    return () => {
      wiimote.onStatus = null
    }
  }, [update, wiimote])

  return (
    <div>
      {wiimote.leds.map((isLit, i) => (
        <button
          className={cx(styles.led, { [styles.lit]: isLit })}
          key={i}
          onClick={async () => {
            await wiimote.sendLeds(
              wiimote.leds.map((led, ledIndex) =>
                ledIndex === i ? !led : led
              ) as LedsType
            )
            update()
          }}
        />
      ))}
    </div>
  )
}

export default Leds
