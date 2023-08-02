const {
  createProject,
  createArt,
  deleteProject,
  deleteArt,
  getAllProjects,
  getAllArt,
  } = require('./index.js');
  const 
    client
   = require('./client');
   const bcrypt = require('bcrypt');


   /*******DROP TABLES ********/
   const dropTables = async () => {
    try{
        await client.query(`
        DROP IF TABLE EXISTS art;
        DROP IF TABLE EXISTS projects;
        DROP IF TABLE EXISTS users;
        `);
    } catch (error){
        console.error("Well, that didnt work...")
        throw error;
    }
   }

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
      
        console.log("Arojects have been created!")
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
  
  
     
    } catch (error) {
      console.error("It broke....no work...test fail");
     throw error;
    }
  }
  