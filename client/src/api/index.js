//------------ USERS ------------//

//REGISTER USER
export const registerUser = async (userObject) => {
    try{
        const response = await fetch(`api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        });
        const result = await response.json();
        console.log("This is result:", result);
        if (result) {
            const {message, user, token} = result;
            localStorage.setItem('token', token);
            return {message, user, token};
        }
        if (result.error) {
            return result;
        }
        return;
    } catch (error){
        console.error(error);
    }
};

//LOGIN USER
export const loginUser = async (userObject) => {
    try{
        const response = await fetch(`api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        });
        const result = await response.json();
        console.log("line 39",result);
        if (result.user){
            const {message, user, token} = result;
            localStorage.setItem('token', token);
            return {message, token, user};
        }
        if (result.error){
            return result;
        }
        const token = result.token;
        console.log("This is token:", token);
        return;
    } catch (error) {
        console.error(error);
    }  
};

//GET ME
export const getMe = async (token) => {

    try {
      const response = await fetch(`api/users/me`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log('result',result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

// GET ALL USERS
export const getAllUsers = async () => {
    try {

      const response = await fetch(`api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const users = await response.json();
  
      return users;
    } catch (err) {
      console.error(err);
    }
  }


export const updateUser = async (userId, userData, token) => {
  console.log(userData)
  try {
    const response = await fetch(`api/users/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    const updatedUser = await response.json();
    console.log('this is updaatedUser->',updatedUser);
    return updatedUser;
  } catch (err) {
    console.error(err);
  }
}


//------------ PROJECTS ------------//


// CREATE PROJECT
export const createProject = async (projectData) => {
  try {
    const response = await fetch(`api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });
    const newProject = await response.json();
    console.log(newProject);
    return newProject;
  } catch (err) {
    console.error(err);
  }
}

// GET ALL PROJECTS
export const getAllProjects = async () => {
  try {
    const response = await fetch(`api/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const projects = await response.json();
    return projects;
  } catch (err) {
    console.error(err);
  }
}

// GET PROJECT BY ID
export const getProjectById = async (projectId) => {
  try {
    const response = await fetch(`api/projects/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const project = await response.json();
    console.log(project);
    return project;
  } catch (err) {
    console.error(err);
  }
}
// UPDATE PROJECT
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await fetch(`api/projects/${projectId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });
    const updatedProject = await response.json();
    console.log(updatedProject);
    return updatedProject;
  } catch (err) {
    console.error(err);
  }
}
  
// DELETE PROJECT
export const destroyProject = async (projectId, token) => {
  try {
    const response = await fetch(`api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const deletedProject = await response.json();
    console.log(deletedProject);
    return deletedProject;
  } catch (err) {
    console.error(err);
  }
}


//------------ ARTS ------------//


// CREATE ART
export const createArt = async (artData) => {
  try {
    const response = await fetch(`api/arts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(artData)
    });
    const newArt = await response.json();
    console.log(newArt);
    return newArt;
  } catch (err) {
    console.error(err);
  }
}

// GET ALL ARTS
export const getAllArts = async () => {
  try {
    const response = await fetch(`api/arts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const arts = await response.json();
    return arts;
  } catch (err) {
    console.error(err);
  }
}

// GET ART BY ID
export const getArtById = async (artId) => {
  try {
    const response = await fetch(`api/arts/${artId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const art = await response.json();
    console.log(art);
    return art;
  } catch (err) {
    console.error(err);
  }
}
// UPDATE ART
export const updateArt = async (artId, artData) => {
  try {
    const response = await fetch(`api/arts/${artId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(artData)
    });
    const updatedArt = await response.json();
    console.log(updatedArt);
    return updatedArt;
  } catch (err) {
    console.error(err);
  }
}
  
// DELETE ART
export const destroyArt = async (artId, token) => {
  try {
    const response = await fetch(`api/arts/${artId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const deletedArt = await response.json();
    console.log(deletedArt);
    return deletedArt;
  } catch (err) {
    console.error(err);
  }
}