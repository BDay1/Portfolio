import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Header from './Header';
import { Footer, Header, AboutMe, Projects} from "./index";
import'/Styling/Main.css'

function App() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser,setCurrentUser] = useState('');


    return (
        <> 
        
         <Header 
         />
        <Routes>
          <Route path="/" element= {<Main  />}/>
    
    
          <Route path="/AboutMe" element= {<AboutMe />}/>
    
    
          <Route path="/Contact Me" element= 
          {<EmailForm />}/>
    
    
          <Route path="/Projects" element=
           {<Projects />}/>
        
          <Route path="/Login" element= {<Login token={token}
              setToken={setToken} 
              currentUser={currentUser} 
              setCurrentUser={setCurrentUser}  
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}/>}/>
    
        </Routes> 
          <Footer/>
        
        <div className="App">
          <div>
            
            
          </div>
        </div>
        </>
      )
    }
    
    export default App