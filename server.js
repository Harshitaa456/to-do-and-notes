const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the current folder
app.use(express.static(__dirname));

// Route for root ("/") to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
const fs=require("fs");
app.post('/add-task',(req,res)=> {
  const newTask=req.body;
  fs.readfile('data.json','utf8',(err,data)=>{
    let tasks=[];
    if(!err&&data){
      tasks=JSON.parse(data);
    }
    tasks.push({...newTask,completed:false});
    fs.writeFile('data.json',JSON.stringify(tasks,null,2),err => {
      if(err){
        console.error('Error saving:',err);
        return res.status(500).json({success:false});

      }
      res.json({success:true, task: newTask });
    });

  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
