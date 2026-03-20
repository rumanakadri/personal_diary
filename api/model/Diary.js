const db = require('../database/connect')

class Diary {
    constructor({id, category_id, notes, date}) {
        this.id = id,
        this.category_id = category_id,
        this.notes = notes,
        this.date = date
    }

    static async getAll() {
    const response = await db.query("SELECT * FROM diary;")
    if (response.rows.length === 0) {
        throw new Error('No notes available')
    }
    return response.rows.map(d => new Diary(d))
  }

  static async getDiaryDetailsByCategory(category_id){
    const response = await db.query("SELECT * FROM diary WHERE category_id = $1;",[category_id]);
    if (response.rows.length === 0) {
        throw new Error('No notes available with that category')
    }
    return response.rows.map(d => new Diary(d))
  }

  static async getDiaryDetailsByDate(date){
    const response = await db.query("SELECT * FROM diary WHERE date = $1;",[date]);
    if (response.rows.length === 0) {
        throw new Error('No notes available with that date')
    }
    return response.rows.map(d => new Diary(d))
  }

  static async getDiaryDetailsByDesc(desc){
    const response = await db.query("SELECT * FROM diary WHERE LOWER(desc) LIKE LOWER(%$1%);",[desc]);
    if (response.rows.length === 0) {
        throw new Error('No notes available with that desc')
    }
    return response.rows.map(d => new Diary(d))
  }
  
 static async getDiaryDetailsByID(id){
    const response = await db.query("SELECT * FROM diary WHERE id = $1;",[id]);
    if (response.rows.length === 0) {
        throw new Error('No notes available with that id')
    }
    return response.rows.map(d => new Diary(d))
  }
  
  static async createDiaryNotes(diaryDetails) {
    const { category_id, name, date} = diaryDetails;
    let response = 
    await db.query ("INSERT into diary (category_id, name, date) VALUES ($1, $2, $3) RETURNING *;", 
        [category_id, name, date]);
    return response.rows[0];
  }

  async updateDiary(data) {
    const response = await db.query("UPDATE diary SET date = $1, notes = $2, category_id = $3 WHERE id = $4 RETURNING id, date, notes;",
      [this.now(), this.id]);

    if (response.rows.length != 1) {
      throw new Error("Unable to update votes.")
    }

    return new Diary(response.rows[0]);
  }

  async deleteDiary() {
        const response = await db.query("DELETE FROM diary WHERE id = $1 RETURNING *;", [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete Diary Notes.");
        }
        return new Diary(response.rows[0]);
    }
}

module.exports = Diary;