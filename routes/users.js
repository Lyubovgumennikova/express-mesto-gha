const router = require('express').Router();
const validations = require('../middlewares/validations');

const {
  // createUser,
  getUsers,
  getUserMe,
  updateProfiletUser,
  updateAvatartUser,

} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserMe);
router.patch('/users/me', validations.profiletUser, updateProfiletUser);
router.patch('/users/me/avatar', validations.avatar, updateAvatartUser);

module.exports = router;
