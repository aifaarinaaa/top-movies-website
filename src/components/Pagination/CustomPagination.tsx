import Pagination from "@mui/material/Pagination";
import React from "react";

type CustomPaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};
const CustomPagination = ({ setPage, totalPages }: CustomPaginationProps) => {
  const handlePageChange = (event: any, page: number) => {
    console.log(page);
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Pagination
        count={totalPages}
        color="secondary"
        // onChange={(e) => handlePageChange(e.target.textContent)}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CustomPagination;
