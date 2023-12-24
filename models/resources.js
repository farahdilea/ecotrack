const db=require("../config/db")
class resourceModel {
       
    static async getResources(){
        try {
          const result = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM resources", [], (error, result) => {
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
//------------------------------------------------------------------

static async getmyResource(topic){
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM `resources` WHERE `topic`=?", [topic], (error, result) => {
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
module.exports=resourceModel
