const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:user_id', getUser);
router.patch('/:user_id', updateUser);
router.delete('/:user_id', deleteUser);

module.exports = router;