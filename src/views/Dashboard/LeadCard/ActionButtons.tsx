import { Stack, IconButton } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Call, Mail, Meeting, Phone } from '@/assests/icons';
import styles from "./style.module.scss"

const iconStyle = {
  border: '1px solid #7A4DF5',
  borderRadius: '50%',
  width: {md: "42", lg: "52"},
  height: {md: "42", lg: "52"},
  color: '#8647F5',
  MarginLeft: "50px"
};

const ActionButtons = () => (
  <Stack direction="row" spacing={2} className={styles.actionButtons} 
>
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
