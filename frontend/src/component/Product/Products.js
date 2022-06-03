import React, { Fragment, useEffect, useState ,memo} from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductList from "./ProductList";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import FilterBox from './FilterBox.js';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading: ProductLoading,
    error,
    productCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);
  console.log(productCount);
  console.log(resultPerPage);
  return (

    <Fragment>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
        <FilterBox priceHandler={priceHandler} price={price} setPrice={setPrice} categories={categories} setCategory={setCategory} category={category} ratings={ratings} setRatings={setRatings}/>
        {ProductLoading ? <Loader /> : products.length !== 0 ? productCount>resultPerPage?
        (<Fragment>
          <ProductList products={products} heading='All Products'/>
          <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentPageNo}
            nextPageText={<ArrowForwardIosIcon/>}
            prevPageText={<ArrowBackIosNewIcon/>}
            firstPageText={<KeyboardDoubleArrowLeftIcon/>}
            lastPageText={<KeyboardDoubleArrowRightIcon/>}
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          /></div>
        </Fragment>):
        <ProductList products={products} heading='All Products'/>: <div className="no-match-found" ><h3>No Match Found</h3></div>}
    </Fragment>

  );
};

export default memo(Products);