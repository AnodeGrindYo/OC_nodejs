const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  console.log("Signup...");
  bcrypt.hash(req.body.password, 10) // pw salted 10 time
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Nouvel utilisateur créé !'}))
        .catch(error => res.status(400).json({ error })); // Bad request (client side error)
    })
    .catch(error => res.status(500).json({ error })); // internal server error
};

exports.login = (req, res, next) => {
  console.log("Login...");
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        console.log("User not found ! : " + req.body.email);
        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          console.log(req.body.email + " is now connected !");
          if (!valid) {
            console.log("The password is not valid for user " + req.body.email + ", he tried : " + req.body.password);
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
          }
          res.status(200).json({
            userId: user._id,
            token: 'TOKEN'
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};