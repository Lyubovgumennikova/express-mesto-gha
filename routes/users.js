const router = require('express').Router();

const {
  createUser,
  getUser,
  // getUserId,
  updateProfiletUser,
  // updateAvatartUser,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUser);
// router.get('/users/:userId', getUserId);
router.patch('/users/me', updateProfiletUser);
// router.patch('/users/me/avatar', updateAvatartUser);

module.exports = router;
