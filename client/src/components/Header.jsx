import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";
import '../Styling/Header.css';

const Header = ({ setCurrentUser, isLoggedIn, setIsLoggedIn, setToken}) => {
    const navigate = useNavigate();
    return (
        <>
                     

        <div id="div1">
      
        <div id="divaa3">
          <img id="img3" src="../images/menu icon.png"/>
          <input id="btnc1" type="button" value="About"/>
          <input id="btnc2" type="button" value="Projects" onclick="location.href="/>

          <input id="btnc3" type="button" value="Art"/>
          
          
        
      </div>
      <div id="divaaa3"></div>
      <div id="divaaa4"></div>
      <div id="tearDrops">
      <div id="rock1"></div>
      <div id="rock2"></div>
      <div id="rock3"></div>
      <div id="rock4"></div>
      <div id="rock5"></div>
      <div id="rock6"></div>
      <div id="rock7"></div>
      <div id="rock8"></div>
      </div>
    </div>
                         

           
       

        </>

    );
};


export default Header;