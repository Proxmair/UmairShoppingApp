import React, { useState } from "react";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";
import {Link} from 'react-router-dom'
import './Header.css';
const UserOptions = ({user}) => {
  const { cartItems } = useSelector((state) => state.cart);
  const alert = useAlert();
  const dispatch = useDispatch();
  const [showsubicon, setShowsubicon] = useState("showsubiconclass")
  const imageAltmessage="Avatar Image"
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  function showsubiconHandler(e){
    if(e._reactName==="onMouseLeave"){
      setShowsubicon("showsubiconclass")
    }
    else if(e._reactName==="onMouseEnter")
    {
      setShowsubicon("")
    }
  }
  return (
    <div onMouseEnter={showsubiconHandler} onMouseLeave={showsubiconHandler} className='speedial-container' >
      <div className="speedial-icon">
          <img  src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt={imageAltmessage}/>
      </div>
      <div onMouseEnter={showsubiconHandler} className="speedial-subicons">
      { user.role === "admin"?
        <Tooltip title="Dashboard" placement="left" arrow><div className={`subicon ${showsubicon}`}><Link to={'/admin/dashboard'}><DashboardIcon/></Link></div></Tooltip>:null}
        <Tooltip title="Account" placement="left" arrow><div className={`subicon ${showsubicon}`}><Link to={'/account'}><PersonIcon/></Link></div></Tooltip>
        <Tooltip title="Orders" placement="left" arrow><div className={`subicon ${showsubicon}`}><Link to={'/orders'}><ListAltIcon/></Link></div></Tooltip>
        <Tooltip title={`Cart ${cartItems.length}`} placement="left" arrow><div className={`subicon ${showsubicon}`}><Link to={'/cart'}><ShoppingCartIcon/></Link></div></Tooltip>
        <Tooltip title="Logout" placement="left" arrow><div className={`subicon ${showsubicon}`}><Link onClick={logoutUser} to={'/'}><ExitToAppIcon/></Link></div></Tooltip>
      </div>
    </div>
  )
}

export default UserOptions