import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import Logo from '../../../images/Promair_Logo_Color.png'
import "./Footer.css";

const message="Logo Image";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1><img src={Logo} alt={message} /></h1>
        <p>Copyrights 2022 &copy; Umair ul Islam</p>
      </div>

      <div className="rightFooter">
        <h4>Support me on</h4>
        <a href="http://instagram.com/meabhisingh">Fiverr</a>
        <a href="http://youtube.com/6packprogramemr">LinkedIn</a>
        <a href="http://instagram.com/meabhisingh">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
