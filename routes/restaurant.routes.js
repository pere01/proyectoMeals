const { Router } = require('express');
const {
  findRestaurants,
  createReview,
  findRestaurant,
  updateRestaurant,
  deleteRestaurant,
  deleteReview,
} = require('../controllers/restaurant.controller');
const {
  validExistRestaurant,
  validExistRestaurantId,
} = require('../middlewares/restaurants.middleware');
const { validExistReview } = require('../middlewares/review.middleware');
const { protect } = require('../middlewares/user.middleware');
const {
  createRestaurantValidation,
  validateFields,
  createReviewValidation,
} = require('../middlewares/validation.middleware');

const router = Router();

router.get('/', findRestaurants);

router.get('/:id', findRestaurant);

router.use(protect);

router.post('/', createRestaurantValidation, validateFields);

router.patch('/:id', validateFields, updateRestaurant);

router.delete('/:id', validateFields, deleteRestaurant);

router.post(
  '/reviews/:id',
  createReviewValidation,
  validateFields,
  validExistRestaurant,
  createReview
);

router.patch(
  '/reviews/:restaurantId/:id',
  createReviewValidation,
  validateFields,
  validExistRestaurantId,
  validExistReview
);

router.delete(
  '/reviews/:restaurantId/:id',
  validateFields,
  validExistReview,
  deleteReview
);

module.exports = {
  restaurantRouter: router,
};
