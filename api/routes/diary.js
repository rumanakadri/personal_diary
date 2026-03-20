const { Router } = require('express');

const diaryController = require('../controller/diary');

const diaryRouter = Router();

diaryRouter.get("/", diaryController.getAll);
diaryRouter.get("/categoryid/:category_id", diaryController.getDiaryDetailsByCategory);
diaryRouter.get("/date/:date", diaryController.getDiaryDetailsByDate);
diaryRouter.get("/desc/:desc", diaryController.getDiaryDetailsByDesc);
diaryRouter.get("/:id", diaryController.getDiaryDetailsByID);
diaryRouter.post("/", diaryController.createDiaryNotes);
diaryRouter.delete("/:id", diaryController.deleteDiary);
diaryRouter.patch("/:id", diaryController.updateDiary)

module.exports = diaryRouter;
