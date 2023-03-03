const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, reciverAcountNumber } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: reciverAcountNumber,
      status: true,
    },
  });

  if (!meal) {
    return next(
      new AppError('That meal does not exist in the restaurant', 404)
    );
  }
  const mealId = meal.id;

  const totalPrice = quantity * meal.price;

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    quantity,
    totalPrice,
  });

  res.status(201).json({
    status: 'success',
    message: 'The restaurant has been created',
    newOrder,
  });
});

exports.findAllOrderUser = catchAsync(async (req, res, next) => {
  const order = await Order.findAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['name', 'address'],
          },
        ],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    order,
  });
});

exports.findOrderByIdPending = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({
    order,
    status: 'success',
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'delete' });

  res.status(200).json({
    order,
    status: 'success',
  });
});
