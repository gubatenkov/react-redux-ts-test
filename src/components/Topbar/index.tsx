// @ts-ignore
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, AppBarProps, useMediaQuery } from "@mui/material";

import AppBarStyled from "./AppBarStyled";
import TopbarContent from "./TopbarContent";

const Topbar = () => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  // const iconBackColor = "grey.100";
  // const iconBackColorOpen = "grey.200";

  const mainHeader = (
    <Toolbar
      sx={{
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      <TopbarContent />
    </Toolbar>
  );

  // app-bar params
  const appBar: AppBarProps = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      // boxShadow: theme.customShadows.z1
    },
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled {...appBar}>{mainHeader}</AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

export default Topbar;
