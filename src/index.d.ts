declare module "@mui/material/styles" {
  interface Theme {
    palette: any;
    transitions: any;
    zIndex: any;
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
