import React, { useState } from 'react';
import { Typography, TextField, Button, Box, List, ListItem, Link } from '@mui/material';
import { API_URL } from '../config/constants';

const RepoSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${API_URL}search/repositories?q=${searchQuery}`);
      const data = await response.json();
      setRepos(data.items || []);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  return (
    <Box
    sx={{
      mt: 2,
      display: "grid",
      gap: 2,
      textAling: "center"
}}>
      <Typography       
      variant="h3"
      component="h1"
      align="center"
      gutterBottom
      >Search GitHub Repositories</Typography>
      <TextField
        type="text"
        label="Enter a keyword to search"
        placeholder="Enter a keyword to search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {repos.length > 0 && (
        <Box mt={2}>
          <Typography variant="h3">Search Results:</Typography>
          <List>
            {repos.map((repo) => (
              <ListItem key={repo.id}>
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.full_name}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default RepoSearch;
