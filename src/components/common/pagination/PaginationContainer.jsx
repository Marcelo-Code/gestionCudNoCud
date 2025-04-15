import React, { useState } from "react";
import { Pagination as MuiPagination } from "@mui/material"; // ✅ renombramos el de MUI
import { CustomPagination } from "./CustomPagination";

export const PaginationContainer = ({ items, itemsPerPage = 10, children }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginationProps = {
    totalPages,
    page,
    handleChangePage,
    currentItems,
    children,
  };

  return <CustomPagination {...paginationProps} />;
};
