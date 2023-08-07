<style>
  @import url('https://fonts.googleapis.com/css2?family=Bigelow+Rules&display=swap');
</style>
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Header from './Header';
// import { Footer, AboutMe, Projects, Art} from "./index";
import {getAllProjects, getAllUsers, getMe, getAllArts} from '../api';

import'../Styling/App.css'

function App() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser,setCurrentUser] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [projectsList, setProjectsList] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [project, setProject] = useState(null);

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('currentUser');
  
      if (storedToken && storedUser) {
        setToken(storedToken);
        setCurrentUser(storedUser);
        setIsLoggedIn(true);
      }
    }, []);
   
    useEffect(() => {
      const fetchUser = async () => {
        try{
          if (token) {
            const fetchedUser = await getMe(token);
            setIsAdmin(fetchedUser.user.isAdmin);
            setCurrentUser(fetchedUser)
          }
        }
      catch (error) {
      console.error(error)
      }
      };
        fetchUser()
    }, [token]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try{
            let allUsers = await getAllUsers();
            setUsersList(allUsers);
        }
      catch (error) {
      console.error(error);
      }
      };
        fetchUsers()
    }, []);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try{
            const fetchedProjects = await getAllProjects();
            setProjectsList(fetchedProjects);
        }
      catch (error) {
      console.error(error);
      }
      };
        fetchProjects()
    }, []);

    useEffect(() => {
      const fetchArts = async () => {
        try{
            const fetchedArts = await getAllArts();
            setArtsList(fetchedArts);
        }
      catch (error) {
      console.error(error);
      }
      };
        fetchArts()
    }, []);
  
  


    return (
        <> 
        
         <Header  isLoggedIn ={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setToken={setToken}
         />
         <div>
          <h1>Welcome!</h1>
          <p>My name is Brooke Day, I am a recent graduate from Fullstack Academy's Web Development Boot camp! Through a rigorous 3 month course I learned many skills both technical skills and practical skills. I am also a digital artist. I use my art to create products for my Etsy shop and freelance pieces such as customized wall art, stickers or digital downloads to use as they please. This site is a display of my coding abilities and a showcase for my art! I hope you enjoy!
          </p>
         </div>
        {/* <Routes>
          <Route path="/" element= {<Home  />}/>
    
    
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
    
        </Routes>  */}
          {/* <Footer/> */}
        
        <div className="App">
          <div>
            
            
          </div>
        </div>
        </>
      )
    }
    
    export default App