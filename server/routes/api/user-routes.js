const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveHero,
  deleteHero,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveHero);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/heroes/:heroId').delete(authMiddleware, deleteHero);

module.exports = router;
