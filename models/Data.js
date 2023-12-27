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
    
    static async addData(id, userid, air_Q, water_Q, humid, tempr, winds, resou, location,date) {
        try {
            const userScore = await new Promise((resolve, reject) => {
                db.query("SELECT score FROM user WHERE user_id = ?", [userid], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (result && result.length > 0 && result[0].score !== undefined) {
                            resolve(result[0].score);
                        } else {
                            reject(new Error("Score not found for the user."));
                        }
                    }
                });
            });
    
            const updatedScore = userScore + 1;
    
            await new Promise((resolve, reject) => {
                db.query("UPDATE user SET score = ? WHERE user_id = ?", [updatedScore, userid], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            const insertResult = await new Promise((resolve, reject) => {
                db.query("INSERT INTO posts(post_id, user_id, air_quality, water_quality, humidity, temp_C, wind_speed, resource, location,date) VALUES (?,?,?,?,?,?,?,?,?,?)",
                    [id, userid, air_Q, water_Q, humid, tempr, winds, resou, location], (error, result) => {
                        if (!error) {
                            resolve(true);
                        } else {
                            reject(error);
                        }
                    }

                );
            });
    
            return insertResult;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    
//------------------------------------
    
static async updatePost(id,tempr)
{
 return new Promise (resolve=> { db.query("UPDATE posts SET temp_C=? WHERE post_id=?",[tempr,id], (error, result) => {
            if (!error) 
           resolve(true)
          else 
           resolve(false)
       } )
      })
}
//-------------------------------------------- 
static async deletePost(id)
{
  return new Promise (resolve=> { db.query("DELETE FROM posts WHERE post_id=? ",[id], (error, result) => {
         if (!error) 
           resolve(true)
          else 
           resolve(false)
         } )
      })
}   
} 
module.exports=DataModel
