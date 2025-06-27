"use client";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Divider,
} from "@mui/material";
import CustomTextField from "@/src/components/common/CustomTextfield";
import CustomButton from "@/src/components/common/CustomButton";
import { MailBlack } from "@/src/assests/icons";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCreateUserMutation } from "@/src/redux/services/users/usersApi";
const AddNewUserModal = ({ open, onClose, refetchUsers }: any) => {
  const [createUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userName: "",
      email: "",
    },
  });

  const watchUserName = watch("userName");
  const watchEmail = watch("email");

  const onSubmit = async (formData: any) => {
    try {
      const result = await createUser({
        first_name: formData.userName,
        email: formData.email,
        role: "admin",
      }).unwrap();
      if (refetchUsers) {
        refetchUsers();
      }
      toast.success("User added successfully ");
      reset();
      onClose();
      console.log("User created:", result);
    } catch (error) {
      toast.error("Failed to add user");

      reset();
      onClose();
      console.error("User creation failed:", error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle sx={{ fontWeight: "bold", padding: "20px 24px" }}>
          Add New Solo User
        </DialogTitle>
        <Box pr={3.5} onClick={onClose} sx={{ cursor: "pointer" }}>
          <CloseIcon />
        </Box>
      </Box>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ padding: "34px 28px" }}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box>
              <CustomTextField
                label="User Name"
                placeholder="Enter user name"
                {...register("userName", { required: true })}
              />
            </Box>
            <Box>
              <CustomTextField
                label="Email"
                placeholder="Enter email address"
                startIcon={<MailBlack />}
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "end",
            paddingRight: "28px",
            paddingBottom: "28px",
          }}
        >
          <CustomButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={
              !watchUserName?.trim() ||
              !watchEmail?.trim() ||
              !isValid ||
              isLoading
            }
            sx={{
              minWidth: 140,
              height: 40,
              position: "relative",
              fontWeight: 600,
            }}
          >
            {isLoading ? "Adding User....." : "Add New User"}
          </CustomButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddNewUserModal;
