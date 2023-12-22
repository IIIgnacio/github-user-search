import React, { useState } from 'react'
import { Typography, TextField, Button, Box, Avatar } from '@mui/material'
import { API_URL } from '../config/constants'
import axios from 'axios'

const UserSearch = ({ handleSearchQuery }) => {
const [username, setUsername] = useState('');
const [user, setUser] = useState({});
const [error, setError] = useState('');

const handleSearch = async () => {
  setError('');
  try {
    const response = await axios.get(`${API_URL}/user/${username}`);
    const data = response.data;
    console.log(data);

    if (data) {
      setUser(data); 
      handleSearchQuery(data);
    } else {
      setUser({
        avatar_url: data.avatar_url,
        login: data.login,
        name: data.name,
        publicRepos: data.public_repos,  
        followers: data.followers
      });
      setError('No user data found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    setUser({}); 
    setError('Failed to fetch user data');
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
        {' '}
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
      {user && (  // Esto verifica que user tenga contenido antes de intentar mostrar sus propiedades
      <Box
      sx={{
        mt: 2,
        display: 'grid',
        gap: 2,
        textAling: 'center',
      }}
>
      <Avatar src={user.avatar_url} alt="User Avatar" />  
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

  };

export default UserSearch
