import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Box, Skeleton, Button } from "@mui/material";

import NewsCard from "@/components/NewsCard";

import useAppSelector from "../hooks/useSelector";
import { useLazyFetchNewsQuery } from "../store/api/newsApi";
import { loadNextPage, setArticlesToStore } from "../store/slices/newsSlice";

const News = () => {
  const perPage = 10;
  const dispatch = useDispatch();
  const { page, articles } = useAppSelector((state) => state.news);
  const [fetchArticlesByPage, { isLoading }] = useLazyFetchNewsQuery();
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const fetchArticles = async () => {
    try {
      const posts = await fetchArticlesByPage(page).unwrap();
      const paginatedPosts = posts.slice(start, end);
      dispatch(setArticlesToStore(paginatedPosts));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const handleLoadMoreClick = () => dispatch(loadNextPage());

  return (
    <>
      <Box
        sx={{
          width: "100%",
          margin: "0 auto",
          maxWidth: "940px",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isLoading
          ? [1, 2, 3, 4].map((n) => (
              <Skeleton
                key={n}
                variant="rounded"
                sx={{
                  width: "100%",
                  height: "120px",
                }}
              />
            ))
          : articles.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
      </Box>

      <Box
        sx={{
          width: "100%",
          margin: "2rem auto",
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          component="button"
          disabled={isLoading}
          onClick={handleLoadMoreClick}
          startIcon={isLoading ? <LoadingOutlined /> : null}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      </Box>
    </>
  );
};

export default News;
