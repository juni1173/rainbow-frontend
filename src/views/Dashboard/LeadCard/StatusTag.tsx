import { Chip } from '@mui/material';
import React from 'react';

interface StatusTagProps {
  label: string;
  color?: string; 
  icon?: React.ReactElement;
}

const StatusTag = ({ label, color = '#F6F8FA', icon }: StatusTagProps) => {
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
      }}
    />
  );
};

export default StatusTag;
