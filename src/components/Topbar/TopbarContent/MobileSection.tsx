import { FC, useEffect, useRef, useState } from "react";

// @ts-ignore
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  Toolbar,
} from "@mui/material";

import Search from "./Search";
import Profile from "./Profile";
import type { User } from "../../../store/slices/authSlice";
import Transitions from "@/components/@extended/Transitions";

import { MoreOutlined } from "@ant-design/icons";

interface MobileSectionProps {
  user: User | null;
}

const MobileSection: FC<MobileSectionProps> = ({ user }) => {
  const theme = useTheme();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (anchorRef.current && prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          disableRipple
          component="span"
          color="inherit"
          ref={anchorRef}
          aria-haspopup="true"
          onClick={handleToggle}
          aria-controls={open ? "menu-list-grow" : undefined}
          sx={{
            bgcolor: open ? "grey.300" : "grey.100",
          }}
        >
          <MoreOutlined />
        </IconButton>
      </Box>
      <Popper
        transition
        open={open}
        disablePortal
        role={undefined}
        placement="bottom-end"
        anchorEl={anchorRef.current}
        style={{
          width: "100%",
        }}
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
            <Paper sx={{ boxShadow: theme.customShadows.z1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <AppBar color="inherit">
                  <Toolbar>
                    <Search />
                    <Profile user={user} />
                  </Toolbar>
                </AppBar>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default MobileSection;
