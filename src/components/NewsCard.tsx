import { FC } from "react";
import { useDispatch } from "react-redux";
import { Grid, Stack, Typography } from "@mui/material";

import MainCard from "./MainCard";
import type { Article } from "../store/api/newsApi";
import { removeArticleByTitle } from "../store/slices/newsSlice";

const NewsCard: FC<Article> = ({ title, description }) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(removeArticleByTitle(title));
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
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

export default NewsCard;
