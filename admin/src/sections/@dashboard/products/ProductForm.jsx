import React, { useState, useEffect, forwardRef } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import {
  Modal,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../styles/productForm.css";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/iconify";
import ImageGallery from "../../../components/image-upload/imageUpload";
import ControlledInputText from "../../../components/controlled-input";
import RichEditor from "../../../components/rich-editor";
import getFullUrl from "../../../utils/getFullUrl";
import LabelsInput from "../../../components/LabelsInput";

function ProductForm({ initialProductData, onSubmit, isEditing, isLoading }) {
  const methods = useForm();
  const { handleSubmit, control, reset, watch } = methods;

  const originalPrice = watch("price.original");
  const discountPrice = watch("price.discount");
  const discountPercent = originalPrice ? ((originalPrice - discountPrice) / originalPrice) * 100 : 0;

  const [description, setDescription] = useState("");
  const [displayImage, setDisplayImage] = useState(false);
  const [coverImage, setCoverImage] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (isEditing && initialProductData) {
      const selectedProduct = initialProductData.product;

      reset({
        name: selectedProduct.name || "",
        code: selectedProduct.code || "",
        "price.original": selectedProduct.price?.original || "",
        "price.discount": selectedProduct.price?.discount || "",
        balance: selectedProduct.balance || "",
        category: selectedProduct.category?.length > 0 ? selectedProduct.category[0] : "",
        brand: selectedProduct.brand || "",
        isActive: selectedProduct.isActive || false,
      });
      setDescription(selectedProduct.description || "");
      setCoverImage(selectedProduct.image?.cover || "");
      setDisplayImage(!!selectedProduct.image?.cover); // Check if cover image exists
      setGalleryImages(selectedProduct.image?.images || []); // Set gallery images
      setLabels(selectedProduct.labels || []); // Set labels
    } else if (!isEditing) {
      reset(); // Reset form when not in editing mode
      setDescription("");
      setDisplayImage(false); // Reset displayImage
      setGalleryImages([]); // Reset galleryImages
      setLabels([]); // Reset labels
    }
  }, [isEditing, initialProductData, reset]);

  const handleFormSubmit = (data) => {
    data.description = description;
    data.image = { cover: coverImage, images: galleryImages };
    data.galleryImages = galleryImages;
    data.labels = labels;
    delete data["price.original"];
    delete data["price.discount"];
    onSubmit(data);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleImageUpload = (imageUrl) => {
    // Find the first empty index in galleryImages
    const emptyIndex = galleryImages.findIndex((image) => !image);

    // If there's an empty index, set the imageUrl at that index
    if (emptyIndex !== -1) {
      const updatedGalleryImages = [...galleryImages];
      updatedGalleryImages[emptyIndex] = imageUrl;
      setGalleryImages(updatedGalleryImages);
    } else {
      // If there's no empty index, append the imageUrl to the end of galleryImages
      setGalleryImages([...galleryImages, imageUrl]);
    }
  };
  const handleOpenModal = (props) => {
    setOpenModal(true);
    setModalType(props);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const ImageGalleryWithRef = forwardRef((props, ref) => <ImageGallery ref={ref} {...props} />);
  return (
    <FormProvider {...methods}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Modal open={openModal} onClose={handleCloseModal}>
          {modalType === "cover" ? (
            <ImageGalleryWithRef setImage={setCoverImage} handleCloseModal={handleCloseModal} />
          ) : (
            <ImageGalleryWithRef setImage={handleImageUpload} handleCloseModal={handleCloseModal} />
          )}
        </Modal>
        <Typography variant="h6" gutterBottom>
          {isEditing ? "Edit Product" : "New Product"}
        </Typography>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                className="UploadButton"
                style={{ aspectRatio: "1/1" }}
                onClick={() => {
                  if (!coverImage) {
                    handleOpenModal("cover");
                  } else {
                    setCoverImage("");
                  }
                }}
              >
                {coverImage ? (
                  <div>
                    <img
                      src={getFullUrl(coverImage) || null}
                      alt="Product Cover"
                      style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                    />
                    <span className="replaceText">Delete Cover</span>
                  </div>
                ) : (
                  <>
                    <Iconify icon="tabler:camera-plus" /> <span style={{ marginLeft: "8px" }}>Add Cover</span>
                  </>
                )}
              </Button>
            </Grid>
            {[1, 2, 3, 4, 5].map((index) => (
              <Grid item xs={2} key={index}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  onClick={() => {
                    if (!galleryImages[index - 1]) {
                      handleOpenModal("gallery");
                    } else {
                      // Create a new array without the item at the current index
                      const newGalleryImages = [...galleryImages];
                      newGalleryImages.splice(index - 1, 1);

                      // Update the galleryImages state
                      setGalleryImages(newGalleryImages);
                    }
                  }}
                  className="UploadButton"
                  htmlFor={`gallery-image-upload-${index}`}
                  disabled={index > galleryImages.length + 1}
                  style={{ aspectRatio: "1/1" }}
                >
                  {galleryImages[index - 1] ? (
                    <>
                      <img
                        src={getFullUrl(galleryImages[index - 1]) || null}
                        alt="test"
                        style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "cover" }}
                      />
                      <span className="replaceText">Delete Image</span>
                    </>
                  ) : (
                    <>
                      <Iconify icon="tabler:camera-plus" /> <span style={{ marginLeft: "8px" }}>Add Image</span>
                    </>
                  )}
                </Button>
              </Grid>
            ))}

            {/* Product info section */}
            <Grid item xs={12}>
              <ControlledInputText
                name="name"
                label="Product Name"
                rules={{ required: true }}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledInputText name="code" label="Code" rules={{ required: true }} control={control} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <ControlledInputText
                name="balance"
                label="Balance"
                rules={{ required: true }}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledInputText name="brand" label="Brand" rules={{ required: true }} control={control} fullWidth />
            </Grid>
            <Grid item xs={5}>
              <ControlledInputText
                name="price.original"
                label="Original Price"
                rules={{ required: true }}
                control={control}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <ControlledInputText
                name="price.discount"
                label="Discount Price"
                rules={{ required: true }}
                control={control}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField label="Discount %" value={discountPercent.toFixed(2)} disabled fullWidth />
            </Grid>
            <Grid item xs={8}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field, fieldState: { error } }) => (
                    <Select {...field} error={Boolean(error)} labelId="category-label" label="Category">
                      <MenuItem value="Electronics">Electronics</MenuItem>
                      <MenuItem value="Clothing">Clothing</MenuItem>
                      <MenuItem value="Home">Home</MenuItem>
                      {/* Add more categories as needed  */}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="isActive"
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="is-active-label">Status</InputLabel>
                    <Select {...field} error={Boolean(error)} labelId="is-active-label" label="Status">
                      <MenuItem value>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Description</Typography>
              <Box paddingY={2}>
                <ReactQuill value={description} onChange={handleDescriptionChange} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box paddingY={2}>
                <LabelsInput labels={labels} setLabels={setLabels} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton loading={isLoading} type="submit" variant="contained" color="primary" fullWidth>
                {isEditing ? "Edit Product" : "Add Product"}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </FormProvider>
  );
}

export default ProductForm;
