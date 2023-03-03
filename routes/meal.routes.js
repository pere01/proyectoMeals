const { Router } = require('express');
const {
  createMeal,
  findAllMeal,
  findMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');
const { protect } = require('../middlewares/user.middleware');
const { protectAccountOwner } = require('../middlewares/user.middleware');
const {
  createMealValidations,
} = require('../middlewares/validation.middleware');

const router = Router();

router.get('/', findAllMeal);

router.get('/:id', findMealById);

router.use(protect);

router.post('/:id', createMealValidations, protectAccountOwner, createMeal);

router.patch('/:id', protectAccountOwner, updateMeal);

router.delete('/:id', protectAccountOwner, deleteMeal);
module.exports = {
  mealsRouter: router,
};
