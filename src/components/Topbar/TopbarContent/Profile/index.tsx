import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";
// @ts-ignore
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Direction,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";

import ProfileTab from "./ProfileTab";
import SettingTab from "./SettingTab";
import MainCard from "@/components/MainCard";
import Transitions from "@/components/@extended/Transitions";
import { removeUserFromStore, User } from "../../../../store/slices/authSlice";

import avatar1 from "@/assets/images/users/avatar-1.png";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
  dir: Direction;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

interface ProfileProps {
  user: User | null;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  const iconBackColorOpen = "grey.300";
  const dispatch = useDispatch();
  const theme: Theme = useTheme();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleLogout = async () => {
    dispatch(removeUserFromStore());
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as Node | null)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            src={avatar1}
            alt="profile user"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="subtitle1">
            {user ? user.firstName : "John Doe"}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  boxShadow: theme.shadows[1],
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                          >
                            <Avatar
                              src={avatar1}
                              alt="profile user"
                              sx={{ width: 32, height: 32 }}
                            />
                            <Stack>
                              <Typography variant="h6">
                                {user
                                  ? `${user.firstName} ${user.lastName}`
                                  : "John Doe"}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Admin
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton
                            size="large"
                            color="secondary"
                            onClick={handleLogout}
                          >
                            <LogoutOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="profile tabs"
                          >
                            <Tab
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "capitalize",
                              }}
                              icon={
                                <UserOutlined
                                  style={{
                                    marginBottom: 0,
                                    marginRight: "10px",
                                  }}
                                />
                              }
                              label="Profile"
                              {...a11yProps(0)}
                            />
                            <Tab
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "capitalize",
                              }}
                              icon={
                                <SettingOutlined
                                  style={{
                                    marginBottom: 0,
                                    marginRight: "10px",
                                  }}
                                />
                              }
                              label="Setting"
                              {...a11yProps(1)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab handleLogout={handleLogout} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <SettingTab />
                        </TabPanel>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
