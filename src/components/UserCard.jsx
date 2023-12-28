import React, { useEffect } from "react";
import { API_URL } from "../config/constants";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Link,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "../contexts/RequestContext";

const HistoryCard = () => {
  const { history, setHistory } = useHistory();

  useEffect(() => {
    // Filtrar las búsquedas únicas antes de realizar llamadas a la API
    const uniqueSearches = history.searchs.filter(
      (value, index, self) =>
        self.findIndex((s) => s.login === value.login) === index
    );

    uniqueSearches.forEach(async (search) => {
      const hasLogin = history.users.some((user) => user.login === search.login);

      if (!hasLogin) {
        try {
          const response = await axios.get(`${API_URL}/user/${search.login}`);
          setHistory((prev) => ({
            ...prev,
            users: [...prev.users, response.data.user],
          }));
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    });
  }, [history.searchs, history.users, setHistory]);

  return (
    <Box mt={15}>
      <Grid container spacing={3}>
        {history.users.map((user) => (
          <Grid item key={user.login} xs={12} sm={6} md={4} lg={3}>
            <Link
              href={user.url}
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card sx={{ maxWidth: 355 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    image={user.avatar_url}
                    alt={`${user.login}'s Avatar`}
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
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HistoryCard;

