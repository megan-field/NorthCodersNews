const User = require('../models/users');

const getAllUsers = (req, res, next) => {
  User.find({}, { __v: false })
    .then(users => res.send({ users }))
    .catch(err => next(err));
};

const getUsersByUsername = (req, res, next) => {
  const { username } = req.params;
  User.find({ username }, { __v: false })
    .then(user => {
      if (user.length > 0) res.send({ user });
      else return res.status(404).send({ message: 'Not a Valid User' });
    })
    .catch(err => next(err));
};

module.exports = { getUsersByUsername, getAllUsers };
