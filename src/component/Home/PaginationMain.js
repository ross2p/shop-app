import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";

export default function PaginationMain({
  fetch,
  offset = 1,
  pageSize,
  sortBy,
}) {
  const [page, setPage] = useState(offset);
  const [totalPages, setTotalPages] = useState(pageSize);

  const loadPages = async (offset) => {
    try {
      const data = await fetch({ offset, pageSize, sortBy });
      setPage(data.pageable.offset + 1);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    loadPages(page);
  }, [page, sortBy]);

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(e, value) => setPage(value)}
      color="primary"
    />
  );
}
