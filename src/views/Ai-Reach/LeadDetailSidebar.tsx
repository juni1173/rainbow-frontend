import {
  Call,
  Inquiry,
  Mail,
  Notes,
  SmallMail,
  SmallPhone,
  Urgent,
} from "@/assests/icons";
import { Box, Typography, Stack, Chip, TextField } from "@mui/material";

const LeadDetailsSidebar = () => (
  <Box width="30%" p={4} bgcolor="#fff" borderLeft="1px solid #DFE1E7">
    <Typography fontWeight={600} mb={3} variant="h5" color="#0D0D12">
      Lead Details
    </Typography>
    <Stack spacing={4}>
      <Box>
        <Typography variant="body2" color="#666D80" mb={1}>
          Name
        </Typography>
        <Typography variant="body2" color="#0D0D12" fontWeight={600}>
          Danielle Patel
        </Typography>
      </Box>
      <Box>
        <Box display={"flex"} alignItems={"center"} gap={1} mb={1}>
          <SmallPhone />
          <Typography variant="body2" color="#666D80">
            Phone Number
          </Typography>
        </Box>
        <Typography variant="body2" color="#0D0D12" fontWeight={600}>
          123 2356367 2376
        </Typography>
      </Box>
      <Box>
        <Box display={"flex"} alignItems={"center"} gap={1} mb={1}>
          <SmallMail />
          <Typography variant="body2" color="#666D80">
            Email
          </Typography>
        </Box>
        <Typography variant="body2" color="#0D0D12" fontWeight={600}>
          anything@gmail.com
        </Typography>
      </Box>
      <Box>
        <Box display={"flex"} alignItems={"center"} gap={1} mb={1}>
          <Inquiry />
          <Typography variant="body2" color="#666D80">
            Inquiry Type
          </Typography>
        </Box>
        <Typography variant="body2" color="#0062FF" fontWeight={500}>
          Bruial Forces
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" color="#666D80" mb={1}>
          Communication By
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            padding: "6px 10px",
            background: "#ECEFF3",
            color: "#36394A",
            maxWidth: "120px",
          }}
        >
          <Call />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ cursor: "pointer" }}
          >
            Call logs
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="body2" color="#666D80" mb={1}>
          Status
        </Typography>
        <Chip
          label="Hot - Awaiting Response"
          size="medium"
          sx={{
            background: "#FFF0F3",
            color: "#36394A",
            fontSize: "14",
            fontWeight: "600",
          }}
          icon={<Urgent />}
        />
      </Box>
      <Box>
        <Box display={"flex"} alignItems={"center"} gap={1} mb={1}>
          <Notes />
          <Typography variant="body2" color="#666D80">
            Notes
          </Typography>
        </Box>

        <TextField
          multiline
          rows={5}
          variant="outlined"
          fullWidth
          placeholder="Add notes here..."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 400,
              color: "#A4ACB9",
            },
            "& .MuiOutlinedInput-input": {
              fontSize: "14px",
              fontWeight: 400,
              color: "#0D0D12",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#A4ACB9",
              fontWeight: 400,
              fontSize: "14px",
              opacity: 1,
            },
          }}
        />
      </Box>
    </Stack>
  </Box>
);

export default LeadDetailsSidebar;
