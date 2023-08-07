import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";
import '../Styling/Header.css';

const Header = ({ setCurrentUser, isLoggedIn, setIsLoggedIn, setToken}) => {
    const navigate = useNavigate();
    return (
        <>
        <section className="header" id="header-component">
            <div className="logo">
                 
        </div>          

               
                       <nav id="navBar">
                       
                                <button className="nav"
                         onClick={() => {
                            navigate('/Menu')
                         }}>
                            <p>
                    <span className="bg"></span>
                    <span className="base"></span>
                    <span className="text">Menu</span>
                    </p>
                         </button>
                        
                         </nav>
                         

           
        </section>

        </>

    );
};


export default Header;