const Meal = require('../models/meals.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistMealId = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const meal = await Meal.findOne({
    where: { id, status: 'active' },
    include: [{ model: Restaurant, attributes: ['name', 'address', 'rating'] }],
  });

  if (!meal) {
    return next(
      new AppError('The meal you are looking for does not exist', 404)
    );
  }

  req.meal = meal;
  next();
});
