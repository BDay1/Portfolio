const {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,  
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  destroyProject,
  createArt,
  getArtById,
  getAllArts,
  updateArt,
  destroyArt
  } = require('./index.js');
  const 
    client
   = require('./client.js');
   const bcrypt = require('bcrypt');


   /*******DROP TABLES ********/
   const dropTables = async () => {
    try {
      await client.query(`
        DROP TABLE IF EXISTS art;
        DROP TABLE IF EXISTS projects;
        DROP TABLE IF EXISTS users;
      `);
      console.log('Tables dropped successfully');
    } catch (error) {
      console.error('Error dropping tables!', error);
      throw error;
    }
  };
  

   /*******CREATE TABLES ********/

   const createTables = async () => {
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
          );
          CREATE TABLE projects(
            id SERIAL PRIMARY KEY,
            title varchar(255) NOT NULL,
            description  varchar(500) NOT NULL,
            imageUrl varchar(255)
          );
          CREATE TABLE art(
            id SERIAL PRIMARY KEY,
            title varchar(255) NOT NULL,
            description  varchar(500) NOT NULL,
            imageUrl varchar(255)
          );
          `);
    } catch (error) {
        console.error("Made an error making tables!")
        throw error;
    }
  }

  /*******CREATE USERS ********/

  async function createInitialUsers() {
    try{ 
        await createUser({ 
            username: 'admin', 
            password: 'onlyAdmin',
            isAdmin: true,
          });
    } catch(error) {
        console.error("Just kidding nothing happened...");
        throw error;
    }
  }

  /******* CREATE PROJECTS ********/
async function createInitialProjects(){

    const projectsToCreate = [
      {
        title: "Friendship Gaming",
        description: "Mock ecommerce website displaying video games" ,
        imageUrl: "" ,
      }
    ]
    const projects = await Promise.all(
        projectsToCreate.map((project) => createProject(project))
      )
        console.log("Projects Created:", projects)
      
        console.log("Projects have been created!")
      }

      /******* CREATE ART ********/
async function createInitialArt(){

    const artToCreate = [
      {
        title: "",
        description: "" ,
        imageUrl:"" ,
      }
    ]
    const arts = await Promise.all(
        artToCreate.map((art) => createArt(art))
      )
        console.log("Arts Created:", arts)
      
        console.log("Arts have been created!")
      }
      
const rebuildDB = async () => {
        try {
          await dropTables();
          await createTables();
          await createInitialUsers();
          await createInitialProjects();
          await createInitialArt();
          
         await testDB();
        } catch (error) {
          console.error('Error during rebuildDB', error);
          throw error;
        } finally {
          await client.end();
        }
      };
      
      rebuildDB();

      /******* TESTS ********/



const testDB = async () => {
    try {
      console.log("Testing, Testing 1,2...?")
  
//       console.log("Calling getUser");
//  const gotuser = await getUser({username: 'admin', password: 'onlyAdmin'})
// console.log("getUser Result:", gotuser)

// console.log("Calling getUserById with 1");
//  const admin = await getUserById(1);
//  console.log("getUserById Result:", admin);
     
    } catch (error) {
      console.error("It broke....no work...test fail");
     throw error;
    }
  }
  