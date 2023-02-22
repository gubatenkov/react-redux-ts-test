import { FC } from "react";

import { Box } from "@mui/material";

import AuthCard from "./AuthCard";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => (
  <Box
    sx={{
      pt: { sm: 3, md: 6 },
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <AuthCard>{children}</AuthCard>
  </Box>
);

export default AuthWrapper;
