import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./BannerList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getBanner,
  deleteBanner,
} from "../../actions/bannerAction.js";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar.js";
import { DELETE_BANNER_RESET } from "../../constant/bannerConstant.js"; 
const BannerList = ({history}) => {
  const message="Banner Image";
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, banners } = useSelector((state) => state.banners);
  const { error: deleteError, isDeleted } = useSelector((state) => state.banner);
  const deleteBannerHandler = (id) => {
    dispatch(deleteBanner(id)); 
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Banner Deleted Successfully");
      history.push("/admin/banners");
      dispatch({ type: DELETE_BANNER_RESET }); 
    }
    dispatch(getBanner());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  const columns = [
    { field: "id", headerName: "BANNER ID", minWidth: 300, flex: 2 },
    { field: "image", headerName: "IMAGES", minWidth: 300, flex: 2,
    renderCell:(params)=>{
      return(
        <Fragment>
          <img  className="DataGrid-Banner-Images" src={params.row.image} alt={message}/>
        </Fragment>
      )
    } },
    {
      field: "actions",
      flex: 2,
      headerName: "Actions",
      minWidth: 250,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() =>deleteBannerHandler(params.getValue(params.id, "id"))}><DeleteIcon /></Button>
          </Fragment>
        );
      },
    }
  ]
  const rows = [];
  banners &&
      banners.forEach((item) => {
      rows.push({
        id: item._id,
        image:item.image.url
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL BANNERS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL BANNERS</h1>
           <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          /> 
        </div>
      </div>
    </Fragment>
  )
}

export default BannerList;
