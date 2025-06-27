import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Meeting } from '@/src/assests/icons';

interface StatusButtonProps {
  type: 'addressed' | 'snoozed' | 'meeting';
  label: string;
  onClick?: () => void;
}

const statusStyles = {
  addressed: {
    borderColor: '#339446',
    backgroundColor: '#F1FEEF',
    textColor: '#339446',
    dotColor: '#339446',
    icon: null,
    hasDot: true,
  },
  snoozed: {
    borderColor: '#36394A',
    backgroundColor: 'transparent',
    textColor: '#36394A',
    dotColor: '#36394A',
    icon: null,
    hasDot: true,
  },
  meeting: {
    borderColor: '#7A4DF5',
    backgroundColor: 'transparent',
    textColor: '#7A4DF5',
    dotColor: '',
    icon: <Meeting sx={{ fontSize: 18, color: '#8647F5' }} />,
    hasDot: false,
  },
};

const StatusButton: React.FC<StatusButtonProps> = ({ type, label, onClick }) => {
  const {
    borderColor,
    backgroundColor,
    textColor,
    dotColor,
    icon,
    hasDot,
  } = statusStyles[type];

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        borderColor,
        backgroundColor,
        borderRadius: '24px',
        height: 40,
        px: 2,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: 14,
        color: textColor,
        '&:hover': {
          backgroundColor,
        },
      }}
      startIcon={
        hasDot ? (
          <FiberManualRecordIcon sx={{ fontSize: 12, color: dotColor }} />
        ) : (
          icon
        )
      }
    >
      {label}
    </Button>
  );
};

export default StatusButton;
