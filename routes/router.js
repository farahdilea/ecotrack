const express=require('express')
const reportcontroller=require("../controllers/ReportsController")
const router=require ('express').Router();
const Datacontroller=require("../controller/DataController") 
const chatcontroller=require("../controllers/ChatController")
const resourcescontroller= require("../controller/resourcesController")

    router.get("/allResources",resourcescontroller.getallResources) 
    router.get("/getmyResource",resourcescontroller.getmyResource)
    router.post("/addResource",resourcescontroller.addResource)
//------------------------------------------------------------
    router.get("/alldata",Datacontroller.getallData) 
   router.post("/addData",Datacontroller.addNewPost)
    router.post("/updatePost",Datacontroller.updatePost)
    router.delete("/deletePost",Datacontroller.deletePost)
//-------------------------------------------------------------
    router.get("/allreports",reportcontroller.getallreports)
    router.post("/addreport",reportcontroller.addnewreport)
    router.post("/deletereport",reportcontroller.deletereport)
    router.post("/editreport",reportcontroller.updatereport)
//--------------------------------------------------------------
  router.get("/getchat",chatcontroller.getchat)  //get users by location to chat with
   router.get("/getchati",chatcontroller.getchati)   //get users by intersts to chat with
    router.post("/addchat",chatcontroller.addchat)
    router.get("/getchati",chatcontroller.getchati)
   

module.exports=router
