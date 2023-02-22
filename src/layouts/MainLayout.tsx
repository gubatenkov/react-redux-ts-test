import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

import Topbar from "@/components/Topbar/index";

import "react-toastify/dist/ReactToastify.css";
import useAppSelector from "../hooks/useSelector";

const MainLayout = () => {
  const { i18n } = useTranslation();
  const { lang } = useAppSelector((state) => state.auth);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Topbar />
      <Box
        component="main"
        sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default MainLayout;
