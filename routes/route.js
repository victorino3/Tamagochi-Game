import {dbase} from "../server/connection.js"
import express, { response } from "express"
import {fileURLToPath} from 'url';
import { join } from "path"
import fs from "fs"
import path from 'path';
const router = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let saveSessionId = 0

//get all user in db
router.post('/login',(req,res)=>{
    const name = req.body.username;
    const password = req.body.password;
    console.log(name,password)
    dbase.query(
        'SELECT * FROM `userprops` WHERE `name` = ? AND `password` = ?',
        [name, password],
        function(err, results) {
         let [image] = results
         saveSessionId = image.id
         res.json({message:image.image})
        }
       
      );
      
})

router.post('/register', (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const imageX = req.body.imagem
    const imagem = imageX.replace("image/","")
    console.log(username,password,imagem)
    dbase.query('INSERT INTO userprops (name, password, image) VALUES(?,?,?)',
    [username, password, imagem],(error,results) => {
       if (error) return res.json({ error: error });
       res.send(results)
       });
})

router.post("/upload/startergy/all",(req,res)=>{
    const feed = req.body.bothScoreFeed
    const shower = req.body.bothScoreShower
    const life =  req.body.bothScoreLife
    const id = saveSessionId
    dbase.query('REPLACE INTO stratergy (id, feed, shower, life) VALUES(?, ?, ?, ?)', 
    [id, feed, shower,life ],(error,results) => {
        if (error) return res.json({ error: error });
        res.send(results)
    });

})

//let sql = "INSERT INTO imagerandom (`image`,`name`) VALUES ('"+image_path+"','"+name+"');";
router.get('/getdata',(req,res)=>{
    dbase.query(
        'SELECT * FROM `stratergy` WHERE `id` = ?',
        [saveSessionId],
        function(err, results) {
         let [image] = results
         console.log(image)
         res.json({message:image})
        }
       
      );
      
})
export {router}
