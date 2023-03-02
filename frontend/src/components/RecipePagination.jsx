import "../assets/css/Home.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as React from "react";

// pagination
export default function RecipePagination({ setPage, page, totalPage }) {
  let pages = 1;
  if (totalPage > pages) {
    pages = totalPage;
  }
  const handleChange = (event, value) => {
    window.scroll(0, 0);
    setPage(value);
  };

  return (
    <Stack spacing={2} className="pagination">
      <Pagination count={pages} page={page} onChange={handleChange} />
    </Stack>
  );
}
