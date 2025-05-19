import React, { ReactNode } from "react";
import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material";

import styles from "./index.module.scss";
export interface CustomButtonProps extends ButtonProps {
  borderRadius?: string;
  icon?: ReactNode;
  width?: string;
  padding?: string;
  fontSize?: string;
  background?: string;
  customColor?: string;
  fontWeight?: string;
  hoverColor?: string;
  border?: string;
  type?: "button" | "submit" | "reset";
}
const CustomButton: React.FC<CustomButtonProps> = ({
  borderRadius = "8px",
  icon = null,
  width = "auto",
  padding = "8px 16px",
  background,
  customColor,
  children,
  fontWeight = "600",
  fontSize = "14px",
  hoverColor = "rgba(152, 162, 179, 1)",
  border,
  type = "button",
  ...rest
}) => {
  const isRound = borderRadius === "50%";
  return (
    <Button
      type={type}
      sx={{
        borderRadius: borderRadius,
        width: isRound ? "40px" : width,
        height: isRound ? "40px" : "auto",
        padding: isRound ? "0" : padding,
        background: background,
        color: customColor,
        fontWeight: fontWeight,
        fontSize: fontSize,
        border: border ? `1px solid ${border}` : "",
        transition: "background 0.3s ease, color 0.3s ease",
        "&:hover": {
          background: customColor ? hoverColor : "",
          color: customColor ? "#fff" : "",
        },
      }}
      className={styles.button}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </Button>
  );
};

export default CustomButton;
