const { Router } = require('express');
const {
  signup,
  login,
  updateUser,
  deleteUser,
  findUserByIdOrder,
  findUserByOrder,
} = require('../controllers/user.coontroller');
const {
  validUserByEmail,
  validPassword,
  validUser,
  protectAccountOwner,
  protect,
} = require('../middlewares/user.middleware');
const {
  sigupValidations,
  validateFields,
  loginValidation,
  updateUserValidation,
} = require('../middlewares/validation.middleware');

const router = Router();

router.post('/signup', sigupValidations, validateFields, signup);

router.post(
  '/login',
  loginValidation,
  validUserByEmail,
  validPassword,
  validateFields,
  login
);

router.use(protect);

router.patch(
  '/:id',
  updateUserValidation,
  validateFields,
  validUser,
  protectAccountOwner,
  updateUser
);

router.delete(
  '/:id',
  validateFields,
  validUser,
  protectAccountOwner,
  deleteUser
);

router.get('/orders', findUserByOrder);

router.get('/orders/:id', findUserByIdOrder);

module.exports = {
  userRouter: router,
};
