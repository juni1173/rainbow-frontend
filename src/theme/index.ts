"use client";
import { createTheme } from "@mui/material";
import colors from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    success: {
      main: colors.success,
    },
    error: {
      main: colors.error,
    },
  },
  typography: {
    fontFamily: "Switzer",
    h1: {
      fontSize: "40px",
      fontWeight: 600,
      lineHeight: "48px",
      letterSpacing: "-0.64px",
      color: colors.heading,
      "@media (max-width:1060px)": {
        fontSize: "34px",
        fontWeight: 600,
        lineHeight: "38px",
      },
       "@media (max-width:600px)": {
        fontSize: "30px",
        fontWeight: 500,
        lineHeight: "38px",
      },
       "@media (max-width:400px)": {
        fontSize: "27px",
        fontWeight: 500,
        lineHeight: "38px",
      },
    },
    h2: {
      color: colors.heading,
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: "28.4px",
      letterSpacing: "-0.64px",
      "@media (max-width:660px)": {
        fontSize: "28px",
        fontWeight: 500,
        lineHeight: "35px",
      },
    },
    h3: {
      fontSize: "32px",
      fontWeight: 600,
      lineHeight: "38.4px",
      letterSpacing: "-0.32px",
      color: colors.heading,
      "@media (max-width:660px)": {
        fontSize: "16px",
      },
    },
    h4: {
      fontSize: "28px",
      fontWeight: 400,
      color: colors.heading,
      letterSpacing: "-0.32px",
      "@media (max-width:660px)": {
        fontSize: "16px",
      },
    },
    h5: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "28.8px",
      color: colors.heading,
      "@media (max-width:660px)": {
        fontSize: "16px",
      },
    },
    h6: {
      fontSize: "20px",
      lineHeight: "24px",
      letterSpacing: "-0.32px",
      fontFamily: "Switzer",
      fontWeight: 400,
      color: colors.heading,
    },
    body1: {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "26.1px",
      color: colors.heading,
      "@media (max-width:1200px)": {
        fontSize: "16px",
        fontWeight: 500,
      },
    },
    body2: {
      fontSize: "16px",
      fontWeight: 400,
      color: colors.heading,
      lineHeight: "20.2px",
      "@media (max-width:660px)": {
        fontSize: "13px",
      },
      "@media (max-width:430px)": {
        fontSize: "12px",
      },
    },
    subtitle1: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20.3px",
      letterSpacing: "0.3px",
      color: "rgba(52, 64, 84, 1)",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      letterSpacing: "0.4px",
      color: colors.heading,
      lineHeight: "17.4px",
      "@media (max-width:660px)": {
        fontSize: "10px",
      },
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (max-width: 599px)": {
            paddingInline: "20px !important",
          },
          "@media (max-width: 1079px) and (min-width: 600px)": {
            paddingInline: "40px !important",
          },
          "@media (max-width: 1199px) and (min-width: 1080px)": {
            paddingInline: "60px !important",
          },
          "@media (max-width: 1439px) and (min-width: 1200px)": {
            paddingInline: "70px !important",
          },
          "@media (min-width: 1440px)": {
            paddingInline: "80px !important",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: "none",
          fontWeight: 600,
          borderRadius: "8px",
          textTransform: "none",
          letterSpacing: "1px",
          boxShadow:
            "0px 3px 2px -2px rgba(0, 0, 0, 0.06), 0px 5px 3px -2px rgba(0, 0, 0, 0.02)",
          "&:hover": {
            boxShadow: "none",
            color: colors.outline,
            background: colors.common,
          },
          "&.Mui-disabled": {
            color: "#fff",
            background: colors.disabled,
          },
        },
        contained: {
          color: "#fff",
          backgroundColor: colors.primary,
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "rgba(51, 121, 197, 1)",
            color: "#fff",
          },
        },
        text: {
          color: colors.primary,
          background: "transparent",
          boxShadow: "none",
          "&:hover": {
            background: "none",
            color: "#fff",
            padding: 0,
          },
        },
        outlined: {
          transition: "0.6s",
          background: "#fff",
          border: `1px solid ${colors.outline}`,
          borderRadius: "8px",
          letterSpacing: "0.4px",
          color: "#344054",
          "&:hover": {
            border: `1.5px solid ${colors.secondary}`,
            background: colors.outlineHover,
            color: "#344054",
          },
        },
        sizeLarge: {
          fontSize: "16px",
          padding: "16px",
          fontWeight: 600,
        },
        sizeMedium: {
          fontSize: "14px",
          padding: "8px 12px",
          borderRadius: "8px",
          fontWeight: 400,
        },
        sizeSmall: {
          padding: "16px",
        },
      },
    },
  },
});

export default theme;
