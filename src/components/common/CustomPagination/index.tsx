"use client";
import {
  Box,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";

interface Props {
  page: number;
  count: number;
  onChange: (val: number) => void;
}

const CustomPagination = ({ page, count, onChange }: Props) => {
  return (
    <Box display="flex" justifyContent="end" mt={3}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        siblingCount={1}
        boundaryCount={1}
        renderItem={(item: PaginationRenderItemParams) =>
          item.type === "page" ? (
            <PaginationItem
              //   onClick={() => onChange(item.page!)}
              sx={{
                mx: 0.5,
                borderRadius: "8px",
                fontWeight: 600,
                minWidth: "40px",
                px: 2,
                py: 1,
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: item.selected ? "#F5F0FF" : "#FFFFFF",
                color: item.selected ? "#6A38C1" : "#4B4B4B",

                border: item.selected
                  ? "2px solid #6A38C1"
                  : "1px solid #E0E0E0",
                boxShadow: item.selected
                  ? "0px 4px 12px rgba(106, 56, 193, 0.25)"
                  : "0px 1px 4px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#ECE8FF",
                },
              }}
              {...item}
            />
          ) : (
            <PaginationItem {...item} />
          )
        }
      />
    </Box>
  );
};

export default CustomPagination;
