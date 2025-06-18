"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddNewUserModal from "./AddUserModal";
import { tabItems } from "./data";
import CustomButton from "@/components/common/CustomButton";
import CustomTabs from "@/components/common/CustomTabs";
import { Add, DeleteOutline } from "@mui/icons-material";
import SettingsPanel from "./SettingPanel";
import {
  useDeactivateUserMutation,
  useGetUsersQuery,
} from "@/redux/services/users/usersApi";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeTab, setActiveTab] = useState("Admin Dashboard");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );

  const {
    data: users,
    isLoading: isUsersLoading,
    isError,
    refetch,
  } = useGetUsersQuery();

  const [deactivateUser, { isLoading: isDeactivating }] =
    useDeactivateUserMutation();

  const handleDeactivate = async (email: string) => {
    try {
      await deactivateUser({ email }).unwrap();
      refetch();
      toast.success("User deactivated successfully");
    } catch (error) {
      console.error("Failed to deactivate user:", error);
    }
  };

  return (
    <Box sx={{ padding: "48px" }}>
      <Box sx={{ marginBottom: "24px" }}>
        <Typography variant="h1">Admin Oversight</Typography>
      </Box>

      <Box mb={2.5}>
        <CustomTabs
          tabs={tabItems}
          onTabChange={(label) => setActiveTab(label)}
        />
      </Box>

      <SettingsPanel />

      <Box p={4} bgcolor="#fff" borderRadius={2} boxShadow={1}>
        <Typography variant="h6" gutterBottom fontSize={24} fontWeight={600}>
          User management
        </Typography>
        <Box sx={{ height: "350px", overflowY: "auto" }}>
          <Box mt={2}>
            {isUsersLoading && <CircularProgress size={24} />}
            {isError && (
              <Typography color="error">Failed to load users.</Typography>
            )}
            {users?.data?.length > 0 &&
              users.data.map((user: any, index: number) => (
                <Box key={index}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    py={1.5}
                  >
                    <Box flex={1}>
                      <Typography fontWeight={600} fontSize={14}>
                        {user.name || user.first_name}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} flex={1}>
                      <MailOutlineIcon
                        fontSize="small"
                        sx={{ color: "#888" }}
                      />
                      <Typography
                        fontSize={14}
                        color="#666D80"
                        fontWeight={400}
                      >
                        {user.email}
                      </Typography>
                    </Box>

                    <Box textAlign="right" pr={6}>
                      <Typography
                        fontSize={14}
                        color="#0D0D12"
                        fontWeight={400}
                      >
                        {user.role || "—"}
                      </Typography>
                    </Box>
                    <Box
                      textAlign="right"
                      pr={6}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedUserEmail(user.email);
                        setConfirmOpen(true);
                      }}
                    >
                      <DeleteOutline />
                    </Box>
                  </Box>
                  {index !== users.length - 1 && <Divider />}
                </Box>
              ))}
          </Box>

          <AddNewUserModal
            open={open}
            onClose={handleClose}
            refetchUsers={refetch}
          />
        </Box>
        <Box mt={2}>
          <CustomButton
            variant="outlined"
            color="primary"
            onClick={handleOpen}
            startIcon={<Add />}
            sx={{
              fontSize: 14,
              fontWeight: "600",
              borderColor: "#6B39F4",
              color: "#6B39F4",
            }}
          >
            Add New Solo User
          </CustomButton>
        </Box>
      </Box>
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        PaperProps={{
          sx: {
            padding: "14px 10px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            paddingBottom: 0,
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Are you sure you want to deactivate this user?
          </Typography>
        </DialogTitle>

        <DialogActions
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            paddingTop: 0,
          }}
        >
          <CustomButton
            onClick={() => {
              setConfirmOpen(false);
              setSelectedUserEmail(null);
              
            }}
            variant="outlined"
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={async () => {
              if (selectedUserEmail) {
                await handleDeactivate(selectedUserEmail);
                setConfirmOpen(false);
                setSelectedUserEmail(null);
              }
            }}
            variant="contained"
            background="red"
            disabled={isDeactivating}
            sx={{
              minWidth: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isDeactivating ? "Deactivating....." : "Deactivate"}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
