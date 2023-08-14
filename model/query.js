
module.exports = {
  async insertWord(conn, id, keyword) {
    console.log("id : " + id + " keyword : " + keyword);
    await conn.execute(
      `
        INSERT INTO collectedWords(articleID, keyword) VALUES(
            ?, ?
        );`,
      [id, keyword],
      (res, err)=>{
        console.log(res);
        console.log(err);
      }
    );
  },

  async showTable(con) {
    return await con.execute("SELECT * FROM collectedWords");
  }
};
