const express=require('express')
const reportcontroller=require("../controllers/ReportsController")
const router=require ('express').Router();
const Datacontroller=require("../controller/DataController") 
const resourcescontroller= require("../controller/resourcesController")

    router.get("/allResources",resourcescontroller.getallResources) 
    router.get("/getmyResource",resourcescontroller.getmyResource)
    router.get("/alldata",Datacontroller.getallData) 
    router.post("/addPost",Datacontroller.addNewPost)
    router.post("/updatePost",Datacontroller.updatePost)
    router.post("/deletePost",Datacontroller.deletePost)
//-------------------------------------------------------------
    router.get("/allreports",reportcontroller.getallreports)
    router.post("/addreport",reportcontroller.addnewreport)
    router.post("/deletereport",reportcontroller.deletereport)
    router.post("/editreport",reportcontroller.updatereport)

module.exports=router
