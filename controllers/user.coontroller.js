const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders.model');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    id: user.id,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { user } = req;

  const token = await generateJWT(user.id);

  res.json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

exports.findUserByOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const userOrders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: [
      {
        model: Meal,
        attributes: ['name'],
        include: [{ model: Restaurant, attributes: ['name', 'rating'] }],
      },
    ],
  });
  res.status(200).json({
    userOrders,
    status: 'success',
  });
});

exports.findUserByIdOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;
  const userOrders = await Order.findOne({
    where: { id, userId: sessionUser.id },
    include: [
      {
        model: Meal,
        attributes: ['name'],
        include: [{ model: Restaurant, attributes: ['name'] }],
      },
    ],
  });

  res.status(200).json({
    userOrders,
    status: 'success',
  });
});
