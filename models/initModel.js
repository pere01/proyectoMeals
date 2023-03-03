const Meal = require('./meals.model');
const Order = require('./orders.model');
const Restaurant = require('./restaurant.model');
const Review = require('./reviews.model');
const User = require('./user.model');

const initModel = () => {
  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasMany(Review);
  Review.belongsTo(User);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Meal.hasMany(Order);
  Order.belongsTo(Meal);
};

module.exports = initModel;
