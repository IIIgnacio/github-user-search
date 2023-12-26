import React, { useState } from 'react'
import { Typography, TextField, Button, Box, Avatar } from '@mui/material'
import { API_URL } from '../config/constants'
import axios from 'axios'
import { useHistory } from '../contexts/RequestContext'

const UserSearch = ({ handleSearchQuery }) => {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState({})
  const [error, setError] = useState('')
  const { setHistory } = useHistory()

  const handleSearch = async () => {
    try {
      const response = await axios
        .get(`${API_URL}/user/${username}`)
        .then((res) => res.data)

      setUser(response.user)
      setHistory((prev) => ({
        ...prev,
        searchs: [
          ...prev.searchs,
          {
            login: response.user.login,
          },
        ],
      }))

      handleSearchQuery(response)
      setError('')
    } catch (error) {
      setUser({})
      setError('Failed to fetch user data')
    }
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: 'grid',
        gap: 2,
        textAling: 'center',
      }}
    >
      <Typography variant='h3' component='h1' align='center' gutterBottom>
        Search GitHub User
      </Typography>
      <TextField
        type='text'
        label='Enter a username to search'
        placeholder='Enter a username to search'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant='contained' onClick={handleSearch}>
        Search
      </Button>
      {user && ( // Esto verifica que user tenga contenido antes de intentar mostrar sus propiedades
        <Box
          sx={{
            mt: 2,
            display: 'grid',
            gap: 2,
            textAling: 'center',
          }}
        >
          <Avatar src={user.avatar_url} alt='User Avatar' />
          <Typography variant='body1' paragraph>
            Username: {user.login}
          </Typography>
          <Typography variant='body1' paragraph>
            Name: {user.name}
          </Typography>
          <Typography variant='body1' paragraph>
            Public Repos: {user.publicRepos}
          </Typography>
          <Typography variant='body1' paragraph>
            Followers: {user.followers}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default UserSearch
