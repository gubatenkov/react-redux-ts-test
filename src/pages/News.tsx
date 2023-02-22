import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Box, Skeleton, Button } from "@mui/material";

import NewsCard from "@/components/NewsCard";
import useAppSelector from "../hooks/useSelector";
import { useLazyFetchNewsQuery } from "../store/api/newsApi";
import { loadNextPage, setArticlesToStore } from "../store/slices/newsSlice";

const News = () => {
  const dispatch = useDispatch();
  const { page, articles } = useAppSelector((state) => state.news);
  const [fetchArticlesByPage, { isLoading }] = useLazyFetchNewsQuery();

  const fetchArticles = async () => {
    try {
      const res = await fetchArticlesByPage(page).unwrap();
      if (res.status === "ok") {
        dispatch(setArticlesToStore(res.articles));
      }
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
          : articles.map((article, idx) => (
              <NewsCard key={`${article.title} + ${idx}`} {...article} />
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
