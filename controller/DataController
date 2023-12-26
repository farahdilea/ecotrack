const dataModel=require("../models/Data")

class Datacontroller{

static async getallData( req,res) {

var results=await dataModel.getData();
if(results) {
 res.send(results)
 } 
}
//--------------------------------------
static async addNewPost( req,res) {
var id=req.body.post_id
var userid=req.body.user_id
var air_Q=req.body.air_quality
var water_Q=req.body.water_quality
var humid=req.body.humidity
var tempr=req.body.temp_C
var winds=req.body.wind_speed
var resou=req.body.resource
var location=req.body.location
 
var x=await dataModel.addData(id,userid,air_Q,water_Q,humid,tempr,winds,resou,location)
      if(x==true)  
      res.send("added succefully")
    else  res.send("add failed")
    if(results) {
     res.send(results)
     } 
    }
//----------------------------------------
static async updatePost(req,res){
    var id=req.body.id
    var tempr=req.body.tempr

    var x=await dataModel.updatePost(id,tempr)
      if(x==true)  
      res.send("updated succefully")
    else  res.send("update failed")
    if(results) {
     res.send(results)
     } 
    
}
//----------------------------------------------------------

static async deletePost(req,res){
    var postid=req.body.postid
    //var userid=req.body.userid

    var x=await dataModel.deletePost(postid)
      if(x==true)  
      res.send("Deleted succefully")
    else  res.send("delete failed")
    if(results) {
     res.send(results)
     } 
    
}

}
module.exports=Datacontroller
