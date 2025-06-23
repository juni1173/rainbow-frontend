import { Chip, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

interface StatusTagProps {
  label: string;
  color?: string; 
  icon?: React.ReactElement;
}

const StatusTag = ({ label, color = '#F6F8FA', icon }: StatusTagProps) => {
  const theme = useTheme();
 // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // when screen size is less than 600px

  return (
    <Chip
      label={label}
      size="small"
      icon={icon}
      color="default"
      sx={{
        backgroundColor: color,
        color: '#36394A',
        fontSize: '12px',
        fontWeight: 500,
        height: 24,
        // "@media(max-width: 600px)" : {
        //   paddingLeft: "3px",
        //   borderRadius: "6px",
        // }
      }}
    />
  );
};

export default StatusTag;
