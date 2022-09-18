import { useCallback, useState } from 'react'

const useUpdate = () => {
  const [, setLatestUpdate] = useState({})
  return useCallback(() => setLatestUpdate({}), [])
}

export default useUpdate
