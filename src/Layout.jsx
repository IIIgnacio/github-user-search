import { Container } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from './components/pagination/navbar'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
      <Container>
          <ResponsiveAppBar />
          <Outlet />
      </Container>
  )
}

export default Layout