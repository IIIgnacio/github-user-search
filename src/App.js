import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RepoSearch from './components/RepoSearch'
import UserSearch from './components/UserSearch'
import UserCard from './components/UserCard'
import Layout from './Layout'

function App() {
  const [searchHistory, setSearchHistory] = useState([])

  const handleSearchQuery = (userData) => {
    // Actualiza el estado con el nuevo usuario
    setSearchHistory((prevHistory) => {
      // Verifica si el usuario ya existe en el historial
      const isExistingUser = prevHistory.some((user) => user.id === userData.id)

      if (!isExistingUser) {
        // Si el usuario no existe, lo añáde al arreglo y devuelve el nuevo estado
        return [...prevHistory, userData]
      } else {
        // Si el usuario ya existe, devuelve el estado anterior sin cambios
        return prevHistory
      }
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='RepoSearch' element={<RepoSearch />} />
          <Route
            path='UserSearch'
            element={<UserSearch handleSearchQuery={handleSearchQuery} />}
          />
          <Route
            path='UserCard'
            element={<UserCard searchHistory={searchHistory} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
