const client = require("./client");

async function createProject({ title, description, imageUrl }) {
    try {
      const { rows: [ project ] } = await client.query(`
        INSERT INTO projects( title, description, imageUrl)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [ title, description, imageUrl]);
  
      return project;
    } catch (error) {
      console.error("Error creating project", error);
      throw error;
    }
  }

  async function getProjectById(id) {
    try {
      const { rows:  [project]  } = await client.query(`
        SELECT * FROM projects
        WHERE id=$1;
      `, [id]);
  
      return project;
    } catch (error) {
      console.error(`Error getting project by id: ${id}`, error);
      throw error;
    }
  }
  
  async function getAllProjects() {
    try {
      const { rows: projects } = await client.query(`
        SELECT * FROM projects;
      `);
     
      return projects;
    } catch (error) {
      console.error("Error getting all projects", error);
      throw error;
    }
  }

  async function updateProject({ id, ...fields }) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");
  
    try {
      const { rows: [ updatedproject ] } = await client.query(`
        UPDATE projects
        SET ${setString}
        WHERE id=$${Object.keys(fields).length + 1}
        RETURNING *;
      `, [...Object.values(fields), id]);
  
      return updatedproject;
    } catch (error) {
      console.error("Error updating project", error);
      throw error;
    }
  }
  
  async function destroyProject(id) {
      try {
        const { rows: [deletedproject] } = await client.query(`
          DELETE FROM projects
          WHERE id=$1
          RETURNING *;
        `, [id]);
    
       
        return deletedproject;
      } catch (error) {
        console.error("Error deleting project", error);
        throw error;
      }
    }

    module.exports = {
        createProject,
        getProjectById,
        getAllProjects,
        updateProject,
        destroyProject
      };