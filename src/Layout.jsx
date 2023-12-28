import { Container } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from './components/pagination/navbar'
import { Outlet } from 'react-router-dom'
import { HistoryProvider } from './contexts/RequestContext'

const Layout = () => {
  return (
    <Container>
      <HistoryProvider>
        <ResponsiveAppBar />
        <Outlet />
      </HistoryProvider>
    </Container>
  )
}

export default Layout
