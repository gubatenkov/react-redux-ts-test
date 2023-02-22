import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";

import { Grid, Stack, Typography } from "@mui/material";

import AuthForm from "./AuthForm";
import AuthWrapper from "./AuthWrapper";
import useAppSelector from "../../hooks/useSelector";

const Login = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/profile" replace={true} />;
  }

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">{t("Please, Login")}</Typography>
            <Typography
              to="/"
              variant="body1"
              color="primary"
              component={Link}
              sx={{ textDecoration: "none" }}
            >
              {t("Donʼt have an account?")}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
