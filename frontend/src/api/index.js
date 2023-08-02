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

 

  
// GET USERS WITH INFO
export const getUsersWithInfo = async (token) => {
  try {
    const response = await fetch(`api/users/admin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch(error) {
    console.error(error);
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

export const changeAdminStatus = async (target, token) => {
  try {
    const response = await fetch(`api/users/admin`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(target)
    });
    const updatedUser = await response.json();
    console.log('this is updaatedUser->',updatedUser);
    return updatedUser;
  } catch (err) {
    console.error(err);
  }
}





