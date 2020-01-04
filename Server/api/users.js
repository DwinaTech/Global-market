const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const { 
  getUsers, 
  updateUser, 
  deleteUser,
  createUser, 
  getUserById, 
  getUserByEmail, 
} = require("../db/services/users");

router.get("/", (req, res) => {
  try {
    getUsers().then(users => {
      res.status(200).send({ success: true, users });
    });
  } catch (error) {
    res.status(504).send({ success: false, error });
  }
});

router.get("/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    getUserById(userId).then(user => {
      res.status(200).send({ success: true, user });
    });
  } catch (error) {
    res.status(504).send({ success: false, error });
  }
});

router.post("/email", (req, res) => {
  try {
    const { email } = req.body;
    getUserByEmail(email).then(user => {
      res.status(200).send({ success: true, user });
    });
  } catch (error) {
    res.status(504).send({ success: false, error });
  }
});

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  try {
    const bcryptPassword = bcrypt.hashSync(password, 10);
    createUser({ name, email, password: bcryptPassword }).then(user => {
      res.status(200).send({ success: true, user });
    });
  } catch (error) {    
    res.status(504).send({ success: false, error });
  }
});

router.patch("/", (req, res) => {
  try {
    const { userId, name, email, password } = req.body;
    updateUser({userId, name, email, password}).then(user => {
      res.status(200).send({ success: true, user });
    });
  } catch (error) {
    res.status(504).send({ success: false, error });
  }
});

router.delete("/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    deleteUser(userId).then(user => {
      res.status(200).send({ success: true, user });
    });
  } catch (error) {
    res.status(504).send({ success: false, error });
  }
});

module.exports = router;
