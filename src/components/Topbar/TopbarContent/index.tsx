import { useDispatch } from "react-redux";
import { GithubOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Link,
  Stack,
  Theme,
  Button,
  IconButton,
  Typography,
  ButtonGroup,
  useMediaQuery,
  styled,
  Switch,
} from "@mui/material";

import Profile from "./Profile";
import Notification from "./Notification";
import MobileSection from "./MobileSection";
import useAppSelector from "../../../hooks/useSelector";
import { setLangToStore } from "../../../store/slices/authSlice";

const buttons = [
  {
    id: 1,
    path: "/",
    text: "Root",
  },
  {
    id: 2,
    path: "/profile",
    text: "Profile",
  },
  {
    id: 3,
    path: "/news",
    text: "News",
  },
];

const TopbarContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const matchesXs = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down("md");
  });

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ButtonGroup
        size="small"
        aria-label="small button group"
        sx={{ marginLeft: "50%", transform: "translateX(-50%)" }}
      >
        {buttons
          .filter((btn) => (btn.path === "/" && user ? null : btn))
          .map((btn) =>
            btn.path !== location.pathname ? (
              <Button key={btn.id} onClick={() => navigate(btn.path)}>
                {btn.text}
              </Button>
            ) : null
          )}
      </ButtonGroup>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <MySwitch />
        <SourceCode />
        {user ? (
          <>
            <Notification />
            {!matchesXs && <Profile user={user} />}
            {matchesXs && <MobileSection user={user} />}
          </>
        ) : null}
      </Box>
    </Box>
  );
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

function MySwitch() {
  const dispatch = useDispatch();
  const { lang } = useAppSelector((state) => state.auth);

  const handleChange = (lang: "eng" | "ua") => dispatch(setLangToStore(lang));

  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      sx={{ marginRight: "12px" }}
    >
      <Typography variant="body2">ENG</Typography>
      <AntSwitch
        checked={lang == "ua"}
        onChange={() => handleChange(lang === "eng" ? "ua" : "eng")}
        inputProps={{
          "aria-label": "switch lang",
          value: lang,
        }}
      />
      <Typography variant="body2">UA</Typography>
    </Stack>
  );
}

function SourceCode() {
  return (
    <IconButton
      disableRipple
      target="_blank"
      component={Link}
      color="secondary"
      title="Source repository"
      sx={{ color: "text.primary", bgcolor: "grey.100" }}
      href="https://github.com/"
    >
      <GithubOutlined />
    </IconButton>
  );
}

export default TopbarContent;
