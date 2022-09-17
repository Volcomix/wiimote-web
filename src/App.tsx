import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

import styles from './App.module.css'

const App = () => {
  const [device, setDevice] = useState<HIDDevice>()

  useEffect(() => {
    if (!device) {
      return
    }

    device.oninputreport = (event) => {
      switch (event.reportId) {
        case 0x30:
          console.log(event.data)
          break
      }
    }

    return () => {
      device.oninputreport = null
    }
  }, [device])

  return (
    <>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <CssVarsProvider>
          <div className={styles.root}>
            {!device ? (
              <Button
                variant="outlined"
                onClick={async () => {
                  if ('hid' in navigator) {
                    const [device] = await navigator.hid.requestDevice({
                      filters: [{ vendorId: 0x057e }],
                    })
                    setDevice(device)
                    await device.open()
                  }
                }}
              >
                Add wiimote
              </Button>
            ) : (
              <Typography>{device.productName}</Typography>
            )}
          </div>
        </CssVarsProvider>
      </StyledEngineProvider>
    </>
  )
}

export default App
