/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from 'react'
import { API_URL } from '../config/constants'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import axios from 'axios'
import { useHistory } from '../contexts/RequestContext'

const HistoryCard = () => {
  const { history, setHistory } = useHistory()
  const searchedLogins = useRef(new Set()) // Use useRef para mantener la persistencia entre renders

  console.log(history)

  useEffect(() => {
    history.searchs.forEach(async (search) => {
      if (!searchedLogins.current.has(search.login)) {
        console.log('Fetching:', search.login)
        try {
          const response = await axios.get(`${API_URL}/user/${search.login}`)
          setHistory((prev) => ({
            ...prev,
            users: [...prev.users, response.data.user], // Asumiendo que la respuesta tiene una estructura { data: { user: ... } }
          }))
          searchedLogins.current.add(search.login)
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
    })
  }, [history.searchs])

  return (
    <Box className='flex flex-col'>
      {history.users.length > 0 &&
        history.users.map((user) => (
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
        ))}
    </Box>
  )
}

export default HistoryCard
