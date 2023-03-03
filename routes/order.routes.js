const { Router } = require('express');
const {
  findAllOrderUser,
  createOrder,
  findOrderByIdPending,
  deleteOrder,
} = require('../controllers/order.controller');
const { orderExist } = require('../middlewares/order.middleware');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/user.middleware');

const router = Router();

router.use(protect);

router.get('/me', findAllOrderUser);

router.post('/', createOrder);

router.patch('/.id', orderExist, protectAccountOwner, findOrderByIdPending);

router.delete('/:id', orderExist, protectAccountOwner, deleteOrder);

module.exports = {
  orderRouter: router,
};
