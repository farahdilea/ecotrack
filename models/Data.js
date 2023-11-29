const db=require("../config/db")
class DataModel {

    static async getData(){
      try {
        const result = await new Promise((resolve, reject) => {
          db.query("SELECT * FROM posts", [], (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    } 

} 



module.exports=DataModel
