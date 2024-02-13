/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions  */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
  Container,
  Stack,
  Typography,
  Button,
  OutlinedInput,
  InputAdornment,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ProductList } from "../sections/@dashboard/products";
import Iconify from "../components/iconify";
import { getProductsList } from "../api/products";
import { useDebouncedState } from "../hooks/useDebounceState";
import ProductPerPage from "../sections/@dashboard/products/ProductPerPage";

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

export default function ProductsPage() {
  const [searchWord, setSearchWord] = useDebouncedState("", 200);
  const [multiSelect, setMultiSelect] = useState(false);
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);

  const productsList = useQuery({
    queryKey: ["products-list", searchWord, page, perPage],
    queryFn: () =>
      getProductsList(page, perPage, {
        params: {
          Keyword: searchWord || undefined,
        },
      }),
  });

  const handleMultiSelectClick = () => {
    setMultiSelect(!multiSelect);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate();

  const handleNewProductClick = () => {
    navigate("/dashboard/newproduct");
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <StyledSearch
              placeholder="Search Product..."
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon={searchWord.length > 1 ? "lucide:x" : "eva:search-fill"}
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              }
            />
          </Stack>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Button
              variant="contained"
              size="large"
              color="warning"
              startIcon={<Iconify icon={multiSelect ? "eva:checkmark-circle-2-fill" : "eva:minus-circle-outline"} />}
              onClick={handleMultiSelectClick}
            >
              {multiSelect ? "Multi-Select On" : "Multi-Select Off"}
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleNewProductClick}
            >
              New Product
            </Button>
          </Stack>
        </Stack>
        {productsList.isLoading && (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        )}
        <Stack direction="row" spacing={1} justifyContent="space-between" flexShrink={0} sx={{ my: 1 }}>
          <ProductPerPage onPerPageChange={handlePerPageChange} />
        </Stack>
        <ProductList key="Chad" products={productsList.data?.products} multiSelect={multiSelect} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination count={productsList.data?.totalPages} page={page} onChange={handlePageChange} />
        </Box>
      </Container>
    </>
  );
}
