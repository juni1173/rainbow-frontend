import { TextFieldProps } from "@mui/material";
import { ChangeEvent, MouseEventHandler, ReactNode } from "react";

export type CustomTextFieldProps = TextFieldProps & {
  helperText?: any;
  placeholder?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onStartIconClick?: MouseEventHandler<HTMLSpanElement>;
  onEndIconClick?: MouseEventHandler<HTMLSpanElement>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  width?: string | number;
  height?: string;
  background?: string;
  fixedEndText?: string;
  min?: string | number;
  type?: string;
  acceptedFileFormats?: string;
  readOnly?: boolean;
};
