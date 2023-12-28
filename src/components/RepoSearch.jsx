import React, { useState } from 'react';
import { Typography, TextField, Button, Box, List, ListItem, Link, Grid, Card, CardContent } from '@mui/material';
import { API_URL } from '../config/constants';

const RepoSearch = () => {
  const [name, setName] = useState('');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/repos/${name}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setRepos(data.repositories.result || []);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Failed to fetch repositories. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        display: "grid",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Search GitHub Repositories
      </Typography>
      <TextField
        type="text"
        label="Enter a keyword to search"
        placeholder="Enter a keyword to search"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {repos.length > 0 && (
        <Box mt={2}>
          <Typography variant="h2"> Search Results:</Typography>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2} justifyContent="center">
                {repos.map((repo) => (
                  <Grid item key={repo.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <List>
                      <ListItem>
                        <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                        </Link>
                      </ListItem>
                    </List>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default RepoSearch;
