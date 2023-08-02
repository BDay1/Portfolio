const client = require("./client");

async function createArt({ title, description, imageUrl }) {
    try {
      const { rows: [ art ] } = await client.query(`
        INSERT INTO arts( title, description, imageUrl)
        VALUES ($1, $2, $3, )
        RETURNING *;
      `, [ title, description, imageUrl]);
  
      return art;
    } catch (error) {
      console.error("Error creating art", error);
      throw error;
    }
  }

  async function getArtById(id) {
    try {
      const { rows:  [art]  } = await client.query(`
        SELECT * FROM arts
        WHERE id=$1;
      `, [id]);
  
      return art;
    } catch (error) {
      console.error(`Error getting art by id: ${id}`, error);
      throw error;
    }
  }
  
  async function getAllArts() {
    try {
      const { rows: arts } = await client.query(`
        SELECT * FROM arts;
      `);
     
      return arts;
    } catch (error) {
      console.error("Error getting all arts", error);
      throw error;
    }
  }

  async function updateArt({ id, ...fields }) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");
  
    try {
      const { rows: [ updatedart ] } = await client.query(`
        UPDATE arts
        SET ${setString}
        WHERE id=$${Object.keys(fields).length + 1}
        RETURNING *;
      `, [...Object.values(fields), id]);
  
      return updatedart;
    } catch (error) {
      console.error("Error updating art", error);
      throw error;
    }
  }
  
  async function destroyArt(id) {
      try {
        const { rows: [deletedart] } = await client.query(`
          DELETE FROM arts
          WHERE id=$1
          RETURNING *;
        `, [id]);
    
       
        return deletedart;
      } catch (error) {
        console.error("Error deleting art", error);
        throw error;
      }
    }

    module.exports = {
        createArt,
        getArtById,
        getAllArts,
        updateArt,
        destroyArt
      };