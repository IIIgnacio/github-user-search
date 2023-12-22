import React, { useState, useEffect } from 'react'
import { API_URL } from '../config/constants'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import axios from 'axios'

export const UserCard = ({ username }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState([])

  useEffect(() => {
    try {
      const response = axios
        .get(`${API_URL}/userDatabase/${searchQuery}`)
        .then((res) => res.data)
      console.log(response)
      setUser(response.user || [])
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }, [searchQuery])

  return (
    <Container Container maxWidth='xs' sx={{ mt: 3 }}>
      <Typography variant='h3' component='h1' align='center' gutterBottom>
        GitHub Historial Searchs
      </Typography>
      <Box width='300px' marginTop={2}>
        <Card>
          <CardContent>
            <img src={user.avatar_url} alt='User Avatar' />
            <Typography gutterBottom variant='h5' component='div'>
              {user.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {user.login}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Followers: {user.followers}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Public Repos: {user.public_repos}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default UserCard
