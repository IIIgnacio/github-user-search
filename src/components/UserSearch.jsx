 import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  CardMedia,
} from "@mui/material";
import { API_URL } from "../config/constants";
import axios from "axios";
import { useHistory } from "../contexts/RequestContext";

const UserSearch = ({ handleSearchQuery }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState();
  console.log(user);
  const [error, setError] = useState("");
  const { setHistory } = useHistory();

  const handleSearch = async () => {
    try {
      const response = await axios
        .get(`${API_URL}/user/${username}`)
        .then((res) => res.data);

      setUser(response.user);
      setHistory((prev) => ({
        ...prev,
        searchs: [
          ...prev.searchs,
          {
            login: response.user.login,
          },
        ],
      }));

      handleSearchQuery(response);
      setError("");
    } catch (error) {
      setUser({});
      setError("Failed to fetch user data");
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        display: "grid",
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Search GitHub User
      </Typography>
      <TextField
        type="text"
        label="Enter a username to search"
        placeholder="Enter a username to search"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {user && ( // Esto verifica que user tenga contenido antes de intentar mostrar sus propiedades
            <Link href={user.url} style={{ textDecoration: 'none', }} target="_blank" rel="noopener noreferrer">
            <Grid
            container
            spacing={3}
            mt={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Grid item xs={3}>
              <Stack spacing={2}>
                <Card sx={{ maxWidth: 450 }}>
                  <CardActionArea LinkComponent={user.url}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={user.avatar_url}
                      alt="Avatar IMG"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {user.login}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Repos {user.publicRepos}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Followers {user.followers}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Link>
      )}
    </Box>
  );
};

export default UserSearch;

