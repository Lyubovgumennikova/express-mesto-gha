const router = require('express').Router();
const validations = require('../middlewares/validations');
const auth = require('../middlewares/auth');

const {
  // createUser,
  getUser,
  getUserId,
  updateProfiletUser,
  updateAvatartUser,

} = require('../controllers/users');

// router.post('/users', createUser);
router.get('/users', getUser);
router.get('/users/me', auth, getUserId);
router.patch('/users/me', updateProfiletUser);
router.patch('/users/me/avatar', validations.avatar, updateAvatartUser);

module.exports = router;
