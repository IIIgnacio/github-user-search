import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RepoSearch from './components/RepoSearch'
import UserSearch from './components/UserSearch'
import UserCard from './components/UserCard'
import Layout from './Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='RepoSearch' element={<RepoSearch />} />
          <Route path='UserSearch' element={<UserSearch />} />
          <Route path='UserCard' element={<UserCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
