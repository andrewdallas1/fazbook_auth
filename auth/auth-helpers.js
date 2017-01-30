// imports bcrypt
const bcrypt = require('bcryptjs');
// imports database models route
const models = require('../db/models/index');
// checks if password entered is correct
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
// checks if user is already logged in
function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).josn(
    { status: 'You are already logged in' }
  );
    return next();
}

// creates new user and redirects to users root page
function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(() => {
    res.redirect('/');
  });
}

// checks if user is logged in and if not requests that they log in
function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });

  return next();
}

// exports functions created in this file
module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser
}


