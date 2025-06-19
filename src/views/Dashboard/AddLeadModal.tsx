"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import CustomButton from "@/components/common/CustomButton";
import { useForm } from "react-hook-form";
import { inquiryStatuses, inquiryTypes, tags } from "./data";
import CustomTextField from "@/components/common/CustomTextfield";
import { CloseRounded } from "@mui/icons-material";
import CustomSelect from "@/components/common/CustomSelect";
import { Controller } from "react-hook-form";
import { useCreateLeadMutation } from "@/redux/services/leads/leadsApi";
import { toast } from "react-toastify";

const AddLeadModal = ({
  open,
  onClose,
  refetchLeads,
}: {
  open: boolean;
  onClose: () => void;
  refetchLeads: () => void;
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [createLead, { isLoading }] = useCreateLeadMutation();

  const onSubmit = async (data: any) => {
    try {
      const payload = [data];
      await createLead(payload).unwrap();
      toast.success("Lead created successfully!");
      onClose();
      reset();
      refetchLeads();
    } catch (error) {
      console.error("Failed to create lead:", error);
      toast.error("Failed to create lead");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        pr={4}
      >
        <DialogTitle>
          <Typography variant="h4" fontWeight={600} sx={{ mt: 2 }}>
            Add New Lead
          </Typography>
        </DialogTitle>
        <CloseRounded onClick={onClose} sx={{ cursor: "pointer" }} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ p: "22px 28px" }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <CustomTextField
              label="First Name"
              {...register("first_name", { required: true })}
              placeholder="Enter first name"
            />
            <CustomTextField label="Last Name" {...register("last_name")} />
            <CustomTextField
              label="Email"
              type="email"
              placeholder="Enter email address"
              {...register("email", { required: true })}
            />
            <CustomTextField
              label="Phone"
              {...register("phone", { required: true })}
              placeholder="Enter phone number"
            />
            <Controller
              name="inquiry_type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelect
                  label="Inquiry Type"
                  placeholder="Select inquiry type"
                  value={field.value}
                  onChange={field.onChange}
                  options={inquiryTypes.map((type) => ({
                    label: type,
                    value: type,
                  }))}
                />
              )}
            />
            <Controller
              name="inquiry_status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelect
                  label="Inquiry Status"
                  placeholder="Select inquiry status"
                  value={field.value}
                  onChange={field.onChange}
                  options={inquiryStatuses.map((status) => ({
                    label: status,
                    value: status,
                  }))}
                />
              )}
            />

            <Controller
              name="tag"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelect
                  label="Tag"
                  placeholder="Select tag"
                  value={field.value}
                  onChange={field.onChange}
                  options={tags.map((tag) => ({ label: tag, value: tag }))}
                />
              )}
            />

            <CustomTextField
              label="Notes"
              placeholder="Add any notes or comments"
              {...register("notes")}
            />
            <CustomTextField
              label="Time Zone"
              {...register("time_zone")}
              placeholder="Select time zone"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: "16px 24px" }}>
          <CustomButton onClick={onClose} variant="outlined">
            Cancel
          </CustomButton>
          <CustomButton
            type="submit"
            variant="contained"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              "Add Lead"
            )}
          </CustomButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddLeadModal;
