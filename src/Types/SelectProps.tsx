import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { StaticImageData } from "next/image";

export interface OptionType {
  label: string;
  value: string | number;
  image?: string | StaticImageData;
  icon?: React.ReactNode;
  status?: string;
  color?: string;
}

export interface CustomSelectProps {
  label?: string;
  variant?: "black" | "blue" | "white";
  value: any;
  width?: string;

  onChange: (event: SelectChangeEvent) => void;
  options: OptionType[];
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  readOnly?: boolean;
  minWidth?: number | string;
  labelId?: string;
  id?: string;
  multiple?: boolean;
  placeholder?: string;

  MenuProps?: any;
  disablePortal?: boolean;
  background?: string;
  height?: string;
}
