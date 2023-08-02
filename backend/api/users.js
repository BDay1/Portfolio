const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { createUser,  getUser} = require('../db/users');
const { requireAdmin, requireUser } = require('./utils');
const { getAllProjects } = require('../db');
const { getAllArts } = require('../db');
const { JWT_SECRET } = process.env;

// GET: api/users
router.get('/', async (req, res, next) => {
    try {
      const users = await getAllUsers();
      res.send(users);
    } catch (error) {
      throw error;
    }
  });
  
  //Register
  router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const _user = await getUserByUsername(username);
  
      if (_user) {
        throw new Error("User " + user.username + " is already taken")
      }
  
      const user = await createUser({username, password});
      const token = jwt.sign({ id: user.id, username}, process.env.JWT_SECRET, { expiresIn: "1w" })
  
      res.send({message: 'You successfully registered', user: user, token: token})
    } catch (message) {
      res.send(message)
    }
  });
  

  //Login
router.post('/login', async(req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({message: 'please supply both a username and password'})
  }
  
  try {
    const user = await getUser({username, password});
    const userInfo = await getUserInfoByUser(user.id)
    
    if (user) {
      const token = jwt.sign(user, JWT_SECRET);     
      res.send({message: 'you have been logged in', user, token, userInfo})
    } else {
      next({message: 'username or password is incorrect'})
    }
  } catch (message) {
    res.send(message);
  }
});

router.get('/me', requireUser, async(req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.send({message:'at /me', user: user});
  } catch (message) {
    res.send(message);
  }
});

router.get('/admin',  async(req, res, next) => {
  try {
    const users = await getAllUsers();
    const allProjects = await getAllProjects();
    const allArts = await getAllArts();

    const getInfo = async (user) => {
      const adminDetails = await getUserById(user.id);
      return { ...user, adminDetails };
    }

    const promises = users.map(getInfo);

    const usersWithInfo = await Promise.all(promises);

    res.send({message: "logged in as admin", usersWithInfo, allProjects, allArts})
  } catch (message){
    res.send(message);
  }
});

module.exports = router;