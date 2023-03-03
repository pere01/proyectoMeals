const Order = require('../models/orders.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id, status: 'active' },
  });

  if (!order) {
    return next(
      new AppError('There is no order that was made in the petition', 404)
    );
  }

  req.order = order;

  next();
});
