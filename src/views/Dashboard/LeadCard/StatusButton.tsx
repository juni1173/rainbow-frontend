import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Meeting } from '@/assests/icons';

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
    icon: <Meeting sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: '#8647F5' }} />,
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
        height: { xs: 32, sm: 36, md: 40 },
        px: { xs: 1.5, sm: 2, md: 2.5 },
        textTransform: 'none',
        fontWeight: 600,
        fontSize: { xs: 12, sm: 13, md: 14 },
        color: textColor,
        '&:hover': {
          backgroundColor,
        },
      }}
      startIcon={
        hasDot ? (
          <FiberManualRecordIcon sx={{ fontSize: { xs: 10, sm: 11, md: 12 }, color: dotColor }} />
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
