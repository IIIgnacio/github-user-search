import React, { useState, useEffect } from 'react';
import { API_URL } from "../config/constants";
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const UserCard = ({ username }) => {
  const [userData, setUserData] = useState("");

  return (
    <Container
    Container
    maxWidth="xs"
    sx={{mt:3}}
    >
      <Typography
      variant="h3"
      component="h1"
      align="center"
      gutterBottom
      >GitHub Historial Searchs
      </Typography>
      <Box width='300px' marginTop={2}>
      <Card>
        <CardContent>
              <img src={userData.avatar_url} alt="User Avatar" />
              <Typography gutterBottom variant="h5" component='div'>{userData.name}</Typography>
              <Typography variant="body2" color='text.secondary'>
                {userData.login}
              </Typography>
              <Typography variant="body2" color='text.secondary'>
                Followers: {userData.followers}
              </Typography>
              <Typography variant="body2" color='text.secondary'>
                Public Repos: {userData.public_repos}
              </Typography>
        </CardContent>
      </Card>
    </Box>
    </Container>
    
  );
};

export default UserCard;
