import {dbase} from "../server/connection.js"
import express, { response } from "express"
import {fileURLToPath} from 'url';
import { join } from "path"
import fs from "fs"
import path from 'path';
const router = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let saveSessionId;

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
         //console.log(image.image)
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
let shower = 0;
let fight = 0;
let feed = 0
router.post("/upload/startergy/feed",(req,res)=>{
    const {feedScore} = req.body
    feed += feedScore
    dbase.query('REPLACE INTO stratergy (id, feed, shower, fight) VALUES(?, ?, ?, ?)', 
    [saveSessionId, feedScore, shower,fight ],(error,results) => {
        if (error) return res.json({ error: error });
        res.send(results)
    });

})
router.post("/upload/startergy/shower",(req,res)=>{
    const {showerScore} = req.body
    shower += showerScore
    dbase.query('REPLACE INTO stratergy (id, feed, shower, fight) VALUES(?, ?, ?, ?)', 
    [saveSessionId, feed, showerScore,fight ],(error,results) => {
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
