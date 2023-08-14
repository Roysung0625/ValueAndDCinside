const pool = require("../model/connection");
const query = require("../model/query");

const commentRegex = /\[\d+\]/;

module.exports = {
  async wordCutting(id, wordArr) {
    //console.log(wordArr);
    const conn = await pool.getConnection();
    
    for (word of wordArr) {
      if(word.match(commentRegex))
        continue;
      if(word.match(/^.$/))
        continue;
      word.replace(/\?|ㅋ|.|!|,/g, "");
      
      //console.log("word : " + word);
      await query.insertWord(conn, id, word);
    }
    conn.release();
  },
};
