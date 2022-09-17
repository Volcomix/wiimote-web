import CssBaseline from '@mui/material/CssBaseline'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from '@mui/material/styles'
import { useEffect, useState } from 'react'

import WiimoteConnection from 'features/WiimoteConnection'
import WiimoteViewer from 'features/WiimoteViewer'
import { Wiimote } from 'services/wiimote'

const App = () => {
  const [wiimote, setWiimote] = useState<Wiimote | null>(null)

  useEffect(() => {
    if (!wiimote) {
      return
    }
    wiimote.onDisconnect = () => setWiimote(null)
  }, [wiimote])

  return (
    <>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <CssVarsProvider>
          {!wiimote ? (
            <WiimoteConnection onConnect={setWiimote} />
          ) : (
            <WiimoteViewer wiimote={wiimote} />
          )}
        </CssVarsProvider>
      </StyledEngineProvider>
    </>
  )
}

export default App
