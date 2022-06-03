import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBanner } from "../../actions/bannerAction.js";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import LinkIcon from '@mui/icons-material/Link';
import SideBar from "./Sidebar";
import { NEW_BANNER_RESET } from "../../constant/bannerConstant";

const NewBanner = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newBanner);
 
  const [link, setLink] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Banner Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_BANNER_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createBannerSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("Link", link);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createBanner(myForm));
  };

  const createBannerImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  }; 

  return (
    <Fragment>
      <MetaData title="Create Banner" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createBannerSubmitHandler}
          >
            <h1>Create Banner</h1>



            <div>
              <LinkIcon />
              <input
                type="text"
                placeholder="Tag of Banner"
                required
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="sliderImage"
                accept="image/*"
                onChange={createBannerImagesChange}
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Banner Slide" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewBanner;

