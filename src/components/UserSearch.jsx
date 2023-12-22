import React, { useState } from 'react'
import { Typography, TextField, Button, Box } from '@mui/material'
import { API_URL } from '../config/constants'
import axios from 'axios'

const UserSearch = ({ handleSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState([])

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${searchQuery}`)
      const data = response.data
      console.log(data)
      setUser(data.user || [])
      handleSearchQuery(searchQuery)
      //funcion que recibe searchQuery, definirlo en app.js y almacenarlo en un estado local en app.js
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  // pasarle el estado al componente padre y que el componente padre se lo pase a userCard, de ahi hacer que el useEffect dependa de searchQuery para que
  // cuando cambie searchQuery se tire devuelta la request

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
        {' '}
        Search GitHub User
      </Typography>
      <TextField
        type='text'
        label='Enter a keyword to search'
        placeholder='Enter a keyword to search'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant='contained' onClick={() => handleSearch()}>
        Search
      </Button>
      <Box mt={2}>
        {/* <Avatar alt="img" src={user.avatar_url} /> */}
        <Typography variant='body1' paragraph>
          Description: {user.login}
        </Typography>
        <Typography variant='body1' paragraph>
          Description: {user.public_repos}
        </Typography>
        <Typography variant='body1' paragraph>
          Description: {user.followers}
        </Typography>
      </Box>
    </Box>
  )
}

export default UserSearch
