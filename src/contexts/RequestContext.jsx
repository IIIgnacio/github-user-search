import { createContext, useContext, useState } from 'react'

const HistoryContext = createContext()

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState({
    users: [],
    repositorys: [],
    searchs: [],
  })

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

export const useHistory = () => useContext(HistoryContext)
