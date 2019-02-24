const passport = require('passport');
const router = require('express').Router();
const auth = require('../../middlewares/auth');
const Users = require('../../models/users');
const errorRoute = require('../error');

// POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body } = req;

  // validate the email address
  if (!body.email) {
    return errorRoute(res, { message: 'Email is a required field', status: 422 }, next);
  }

  // validate the password
  if (!body.password) {
    return errorRoute(res, { message: 'Password is a required field', status: 422 }, next);
  }

  // create the user model
  const user = new Users(body);

  // set the password
  user.setPassword(body.password);

  // save the user to the db
  return user.save()
    .then(() => res.json({ user: user.toAuthJSON() }))
    .catch(err => errorRoute(res, err, next));
});

// POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body } = req;

  // validate the username address
  if (!body.username) {
    return errorRoute(res, { message: 'Username is a required field', status: 422 }, next);
  }

  // validate the password
  if (!body.password) {
    return errorRoute(res, { message: 'Password is a required field', status: 422 }, next);
  }

  // authenticate the username and password (see src/config/passport.js)
  return passport.authenticate('local', (err, passportUser) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json(user.toAuthJSON());
    }

    return errorRoute(res, { message: 'Incorrect email or password', status: 400 }, next);
  })(req, res, next);
});

// DELETE a user
router.delete('/:id', (req, res, next) => {
  Users.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      return errorRoute(res, { message: 'There was a problem deleting the user', status: 400 }, next);
    }
    res.status(200).json({ message: `User ${user.name} was deleted.` });
  });
});

// GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { user } = req;

  return Users.findById(user.id)
    .then(user => {
      if (!user) {
        return errorRoute(res, { message: 'There was a problem getting current user', status: 401 }, next);
      }

      return res.json(user.toAuthJSON());
    });
});

module.exports = router;
