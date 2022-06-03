import React,{useState,memo} from 'react'
import './Header.css'
import Logo from '../../../images/Promair_Logo_Color.png'
import { Link ,useHistory} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
const Header = () => {
  let history=useHistory();
  const imageAltmessage="Logo_Image"
  const [showSearchbar, setshowSearchbar] = useState("")
  const [showMenubar, setshowMenubar] = useState("")
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler=(e)=>{
    console.log(history)
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  const setAllOff=()=>{
    setshowSearchbar("");
    setshowMenubar("");
  }
  return (
    <div className='header'>
      <div className='header-logo'>
      <Link to={'/'}><img className='header-logo-image' src={Logo} alt={imageAltmessage} /></Link>
      </div>
      <div className='header-navbar'>  
        <div className='header-navbar-link menu ' onClick={() => setshowMenubar("show-menubar")}><div><MenuIcon/><p>Menu</p></div></div>
        <div className='header-navbar-link link-in-menu '><Link onClick={setAllOff} to={'/'}><HomeIcon/><p>Home</p></Link></div>
        <div className='header-navbar-link link-in-menu '><Link onClick={setAllOff} to={'/about'}><InfoIcon/><p>About</p></Link></div>
        <div className='header-navbar-link link-in-menu '><Link onClick={setAllOff} to={'/products'}><ShoppingBagIcon/><p>Products</p></Link></div>
        <div className='header-navbar-link link-in-menu '><Link onClick={setAllOff} to={'/contact'}><CallIcon/><p>Contact</p></Link></div>
        <div className='header-navbar-link' onClick={() => setshowSearchbar("show-searchbar")}><div><SearchIcon/><p>Search</p></div></div>
      </div>
      <div className='header-login'>
        <div><Link to={'/login'}><AccountCircleIcon className='header-login-icon'/></Link></div>
      </div>
      <div className={`header-searchBar ${showSearchbar}`}>
        <div className="header-search-feild">
            <button onClick={() => setshowSearchbar("")} ><ClearIcon/></button>
            <input type="text" placeholder="Search a Product ..." onChange={(e) => setKeyword(e.target.value)}/>
            <button onClick={searchSubmitHandler} ><SearchIcon/></button>
        </div>
      </div>
      <div className={`header-menuBar ${showMenubar}`}>
        <div><h3>Menu</h3><button onClick={() => setshowMenubar("")}><ClearIcon/></button></div>
        <hr/>
        <div className='header-menubar-links'>
          <div><Link onClick={setAllOff} to={'/'}><HomeIcon/><p>Home</p></Link></div>
          <div><Link onClick={setAllOff} to={'/about'}><InfoIcon/><p>About</p></Link></div>
          <div><Link onClick={setAllOff} to={'/products'}><ShoppingBagIcon/><p>Products</p></Link></div>
          <div><Link onClick={setAllOff} to={'/contact'}><CallIcon/><p>Contact</p></Link></div>
        </div>
      </div>
    </div>
  )
}

export default memo(Header);