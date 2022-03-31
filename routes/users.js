const router = require('express').Router();
const validations = require('../middlewares/validations');

const {
  getUsers,
  getUserId,
  getUserMe,
  updateProfiletUser,
  updateAvatartUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserMe);
router.get('/users/:id', validations.index, getUserId);
router.patch('/users/me', validations.profiletUser, updateProfiletUser);
router.patch('/users/me/avatar', validations.avatar, updateAvatartUser);

module.exports = router;
