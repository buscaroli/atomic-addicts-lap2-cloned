const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entries');

const { verifyToken } = require('../middleware/auth');
//add verifyToken to all routes once finished

router.get('/', entriesController.getAllEntries);
router.get('/:id', entriesController.getEntriesByUserId);
router.post('/', entriesController.createNewEntry);
router.patch('/:id', entriesController.updateEntryById);
router.delete('/:id', entriesController.deleteEntryById);
//increase/decrease water/smoking routes
router.get('/increase/smoking/', verifyToken, entriesController.increaseSmokingNum);
router.get('/decrease/smoking/', verifyToken, entriesController.decreaseSmokingNum);
router.get('/increase/water/', verifyToken, entriesController.increaseWaterNum);
router.get('/decrease/water/', verifyToken, entriesController.decreaseWaterNum);
//complete/incomplete water/smoking routes
router.get('/increase/sleep/', verifyToken, entriesController.completeSleep);
router.get('/decrease/sleep/', verifyToken, entriesController.incompleteSleep);
router.get('/increase/exercise/', verifyToken, entriesController.completeExercise);
router.get('/decrease/exercise/', verifyToken, entriesController.incompleteExercise);
//streak routes
router.get('/streak/all/', verifyToken, entriesController.getAllHabitsStreak);
router.get('/streak/sleep/', verifyToken, entriesController.getSleepStreak);
router.get('/streak/exercise/', verifyToken, entriesController.getExerciseStreak);
router.get('/streak/water/', verifyToken, entriesController.getWaterStreak);
router.get('/streak/smoking/', verifyToken, entriesController.getSmokingStreak);
router.get('/streak/money/', verifyToken, entriesController.getMoneyStreak);
//get last 7 days of entries for habit
router.get('/seven/all/', verifyToken, entriesController.getAllHabitsEntries);
router.get('/seven/exercise/', verifyToken, entriesController.getExerciseEntries);
router.get('/seven/smoking/', verifyToken, entriesController.getSmokingEntries);
router.get('/seven/water/', verifyToken, entriesController.getWaterEntries);
router.get('/seven/money/', verifyToken, entriesController.getMoneyEntries);
router.get('/seven/sleep/', verifyToken, entriesController.getSleepEntries);
//calendar routes
router.get('/calendar/all/', verifyToken, entriesController.getAllCalendarEntries);
router.get('/calendar/sleep/', verifyToken, entriesController.getSleepCalendarEntries);
router.get('/calendar/exercise/', verifyToken, entriesController.getExerciseCalendarEntries);
router.get('/calendar/smoking/', verifyToken, entriesController.getSmokingCalendarEntries);
router.get('/calendar/money/', verifyToken, entriesController.getMoneyCalendarEntries);
router.get('/calendar/water/', verifyToken, entriesController.getWaterCalendarEntries);

module.exports = router;