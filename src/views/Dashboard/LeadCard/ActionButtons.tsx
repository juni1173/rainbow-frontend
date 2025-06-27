import { Stack, IconButton } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Call, Mail, Meeting, Phone } from '@/src/assests/icons';

const iconStyle = {
  border: '1px solid #7A4DF5',
  borderRadius: '50%',
  width: 52,
  height: 52,
  color: '#8647F5',
};

const ActionButtons = () => (
  <Stack direction="row" spacing={2}>
    <IconButton sx={iconStyle}>
      <Phone />
    </IconButton>
    <IconButton sx={iconStyle}>
      <Mail />
    </IconButton>
    <IconButton sx={iconStyle}>
      <Meeting />
    </IconButton>
  </Stack>
);

export default ActionButtons;
