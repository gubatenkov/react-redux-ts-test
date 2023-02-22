import { FC } from "react";
import { useDispatch } from "react-redux";
import { Grid, Stack, Typography } from "@mui/material";

import MainCard from "./MainCard";
import type { Article } from "../store/api/newsApi";
import { removeArticleById } from "../store/slices/newsSlice";

const NewsCard: FC<Article> = ({ id, title, body }) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(removeArticleById(id));
  };

  return (
    <MainCard
      // @ts-ignore
      onClick={handleClick}
      contentSX={{ p: 2.25 }}
      sx={{ cursor: "pointer", "&:hover": { scale: "1.01" } }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h4" color="textPrimary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="body1" color="inherit">
              {body}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default NewsCard;
