const Diary = require("../model/Diary");

async function getAll(req, res) {
  try {
    const diarydetails = await Diary.getAll();
    console.log(diarydetails)
    res.status(200).json(diarydetails);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function getDiaryDetailsByCategory(req, res) {
  try {
    const category_id = parseInt(req.params.category_id);
    const diarydetail = await Diary.getDiaryDetailsByCategory(category_id);
    res.status(200).json(diarydetail);
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function getDiaryDetailsByDate(req, res) {
  try {
    const date = parseInt(req.params.date);
    const diarydetail = await Diary.getDiaryDetailsByDate(date);
    res.status(200).json(diarydetail);
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function getDiaryDetailsByDesc(req, res) {
  try {
    const desc = parseInt(req.params.desc);
    const diarydetail = await Diary.getDiaryDetailsByDesc(desc);
    res.status(200).json(diarydetail);
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function getDiaryDetailsByID(req, res) {
  try {
    const id = parseInt(req.params.id);
    const diarydetail = await Diary.getDiaryDetailsByID(id);
    res.status(200).json(diarydetail);
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function createDiaryNotes(req, res) {
  try {
    const diaryDetails = req.body;
    const diary = await Diary.createDiaryNotes(diaryDetails);
    res.status(200).json(diary);
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function updateDiary(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const diaryDetail = await Diary.getDiaryDetailsByID(id);
    const result = await diaryDetail.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function deleteDiary(req, res) {
  try {
    const id = parseInt(req.params.id);
    const diary = await Diary.getDiaryDetailsByID(id);
    const result = await diary.deleteDiary();
    res.status(200).json(result);
  } 
  catch (err) {
      res.status(404).json({ error: err.message })
  }
}

module.exports = {
  getAll, 
  getDiaryDetailsByCategory, 
  getDiaryDetailsByDate, 
  getDiaryDetailsByDesc, 
  getDiaryDetailsByID, 
  createDiaryNotes,
  updateDiary,
  deleteDiary
}
