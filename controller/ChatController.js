const chatModel=require("../models/chat")


class ChatController{


  static async getchat(req, res) {
    console.log("get all users whose location");
    var results = await chatModel.getchat(req.query.location);
    if (results) {
        res.send(results);
        console.log("111111111111"); 
    } else {
        res.status(500).send("Error fetching users");
    }
}

static async getchati(req, res) {
  console.log("get all users whose interest");
  var results = await chatModel.getchati(req.query.interest);
  if (results) {
      res.send(results);
  } else {
      res.status(500).send("Error fetching users");
  }
}





    static async addchat(req,res)
    {
        console.log("add a new chat")
         var x=await chatModel.addchat(req.body.user1_id,req.body.user2_id,req.body.msg)
         if(x==true)
           res.send("added successfully");
         else
         {
           res.send ("add failed") 
      
         } 

    }




}

module.exports=ChatController
