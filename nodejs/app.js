const express = require('express');
const app = express();
const mongoose = require("mongoose")
const request = require("request")
const cheerio = require("cheerio")
const job = require('./models/job')
const url = 'https://ca.indeed.com/jobs?q='
const reqTest = ['software developer','toronto']
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://peter:peter@cluster0-ent51.mongodb.net/job?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
const bodyparser = require("body-parser")
app.use(bodyparser.json())
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true })
const con  = mongoose.connection
con.on('open',()=>{
    console.log('connected');
    
})
app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
        next()
})
app.listen(3000,()=>{
    console.log('started')
    
})
//test


//cralwer
    app.post("/crawler", async (req,res)  =>{
 

             for(let i =0;i<510;i+=10){
                              let page = i>0 ? '&start='+i : ''; 

                          request(`${url}${reqTest[0]}&l=${reqTest[1]}${page}`, (error,response,html)=>{

                              if(!error && response.statusCode==200){
                                 const $ = cheerio.load(html) 
 
                                $('.jobsearch-SerpJobCard h2 a').each(async(i,el)=>{
                              const item =   $(el).text();
                              
                              const j2 = new job({
                                title : item
                            })
                            try{
                                const j3 = await j2.save()
                                res.send(j3)
                            }catch(e){
                                console.log(e);
                                
                            }
                            

                            })
                    }
    
                     })
              }


    })
    //search
app.get("/search", async (req,res)=>{
   

        try {
                const j1 = await job.find()

                  console.log(j1,'1');

                  res.send(j1)

             }
             catch (e){
            res.send(e)
            }
})
    //edit
    app.patch("/:id", async (req,res)=>{
    try{
        let id = req.params.id
        console.log(id);
        
        const j1 = await job.findById(id)
        j1.title = req.body.title
      j1.save()
        res.send(j1)

    } catch(e){
        console.log(e);
        
    }
})
app.delete("/:id", async(req,res)=>{
    try{
        const j1 = await job.findById(req.params.id)
        j1.remove()
        res.send(j1)

    } catch(e){
        console.log(e);
        
    }
    
})
    
        
    
    



// })

    




module.exports = app;