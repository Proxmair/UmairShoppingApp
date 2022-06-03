import React, { memo, Fragment, useEffect} from 'react'
import ImageSlider from './ImageSlider.js'
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { getBanner } from '../../actions/bannerAction'
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import ProductList from '../Product/ProductList.js';
import "./Home.css";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading: ProductLoading, error, products } = useSelector((state) => state.products);
  const { loading: BannerLoading, error: BannerError, banners } = useSelector((state) => state.banners);
  useEffect(() => {
    if (error || BannerError) {
      if (error) { alert.error(error); }
      if (BannerError) { alert.error(BannerError); }
      dispatch(clearErrors());
    }
    dispatch(getProduct("", 1, [0, 25000], false, 3));
    dispatch(getBanner());
  }, [dispatch, error, alert, BannerError]);
  return (
    <Fragment>
        <MetaData title="Proxmair Ecommerce Home page" />
        {BannerLoading ? <Loader /> : banners.length!==0 ? <ImageSlider banners={banners} /> : null}
        {ProductLoading ? <Loader /> : products.length!==0 ? <ProductList products={products} heading='Recommended Products' /> : null}
    </Fragment>
  )
}
export default memo(Home)