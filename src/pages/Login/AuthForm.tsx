import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

import Social from "./Social";
import { setUserToStore } from "../../store/slices/authSlice";
import { useLoginUserMutation } from "../../store/api/userApi";

import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

interface Inputs {
  username: string;
  password: string;
}

const AuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginWithFormData, resultObject] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: import.meta.env.VITE_APP_DEFAULT_USERNAME,
      password: import.meta.env.VITE_APP_DEFAULT_PASSWORD,
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // TO DO: validate form data
    try {
      const user = await loginWithFormData(data).unwrap();
      dispatch(setUserToStore(user));
      navigate("/profile");
    } catch (err) {
      console.log(err);
      toast("Invalid username or password", {
        type: "error",
        position: "bottom-right",
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-login">{t("Email Address")}</InputLabel>
            <OutlinedInput
              fullWidth
              type="email"
              id="email-login"
              {...register("username")}
              placeholder="Enter email address"
              error={Boolean(errors.username)}
            />
            {errors.username && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {errors.username as ReactNode}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">{t("Password")}</InputLabel>
            <OutlinedInput
              fullWidth
              id="-password-login"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              error={Boolean(errors.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    size="large"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter password"
            />
            {errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {errors.password as ReactNode}
              </FormHelperText>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  name="checked"
                  color="primary"
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                />
              }
              label={
                <Typography variant="h6">{t("Keep me sign in")}</Typography>
              }
            />
            <Link
              to=""
              variant="h6"
              color="text.primary"
              component={RouterLink}
            >
              {t("Forgot Password?")}
            </Link>
          </Stack>
        </Grid>
        {/* {errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Grid>
        )} */}
        <Grid item xs={12}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            disabled={false}
            disableElevation
            variant="contained"
          >
            {t("Login")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography variant="caption">{t("Login with")}</Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <Social />
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthLogin;
