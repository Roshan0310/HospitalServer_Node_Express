const express = require("express"); //require
const app = new express(); //initialize 
const fs = require("fs"); // requiring file system for file write and reading the file
const { stringify } = require("querystring");

app.use(express.json()); //interpreting  the json

const data = require("./hospitalServer.json"); // requiring the json file

//GET Method 
app.get("/hospital",(req,res)=>{
    res.send(data);
});

//POST Method
app.post("/hospital",(req,res)=>{
    data.push(req.body);
    fs.writeFile("hospitalServer.json",JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Data cannot be written");
        }
        else{
            res.send("Data written successfully");
        }
    });
});

//PUT Method
app.put("/hospital/:hospitalName",(req,res)=>{
    let hospitalName = req.params.hospitalName;
    data.forEach((item)=>{
        if(item.HospitalName==hospitalName){
            item.HospitalLocation=req.body.HospitalLocation;
            item.PatientCount=req.body.PatientCount;
        }
    })
    fs.writeFile("hospitalServer.json",JSON.stringify(data),(err)=>{
        if(err){
            res.send("data could not be updated");
        }
        else{
            res.send("data updated successfully");
        }
    });
});

//DELETE Method
app.delete("/hospital/:hospitalName",(req,res)=>{
    let hospitalName = req.params.hospitalName;
    let val = data.filter(item => item.HospitalName !== hospitalName );
    fs.writeFile("hospitalServer.json",JSON.stringify(val),(err)=>{
        if(err){
            res.send("data could not be deleted");
        }
        else{
            res.send("data deleted successfully");
        }
    });
})

//creating the port
app.listen(3000);
console.log("server listening to port 3000");