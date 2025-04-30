import { formatDate } from "../date.js";
import News from "../models/NewsModel.js";
import path from "path";
import fs from "fs";
import multer from "multer";
import {fileURLToPath} from "url";
import { log } from "console";
/*
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadUrl = path.join(__dirname, "../uploads");

if(!fs.existsSync(uploadUrl)){
    fs.mkdirSync(uploadUrl,{recursive:true});
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
*/

export function getAllNews(req, res) {
    const user=req.user;
    if (!user) {
        News.find({isApproved:true}).sort({nid:-1}).then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        })
    }else{
        News.find().sort({nid:-1}).then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        })

    }
}

export async function addNews(req, res) {   
    const user=req.user;
    if (!user) {
        res.status(401).json({ msg: "Please login" });
        return
    }
    if (user.role != "Admin" && user.role != "Author" && user.role != "Photographer") {
        res.status(401).json({ msg: "Please login as Authorized" });
        return
    }
    //generate newsID

    let lastId=await News.find().sort({nid:-1}).limit(1);    
    let nid=""    
    if(lastId.length==0){
        nid="NID00001";
    }else{
        lastId=lastId[0].nid;
        nid="NID"+(parseInt(lastId.substring(4))+1).toString().padStart(5,"0");
    }
    const data=req.body    
    data.nid=nid
    data.repotedBy=user.name
    let news=new News(data);      
    await news.save().then(()=>{
        res.json("New News Added")
    }).catch((err)=>{
        res.json(err)
    })  

}

export async function getCurrentNews(req, res) {    
    const id=req.params.id          
   await News.findOne({nid:id}).then((result) => {
        res.json(result);    
        
    }).catch((err) => {
        res.json(err)
    })
}
export async function updateNews(req, res) {
    const user=req.user;   
    if (!user) {
        res.status(401).json({ msg: "Please login" });
        return
    }
    if (user.role != "Admin" && user.role != "Author" && user.role != "Photographer") {
        res.status(401).json({ msg: "Please login as Authorized" });
        return
    }
    
    const id=req.params.id    
    const data=req.body
  
   
    
    await News.updateOne({nid:id},data).then(()=>{
        res.json("News Updated")
    }).catch((err)=>{
        res.json(err)
    })
}

export async function deleteNews(req, res) {
     
    const user=req.user;   
    if (!user) {
        res.status(401).json({ msg: "Please login" });
        return
    }
    if (user.role != "Admin") {
        res.status(401).json({ msg: "Please login as Authorized" });
        return
    }
    const id=req.params.id
    await News.deleteOne({nid:id}).then(()=>{
        res.json("News Deleted Successfully")
    }).catch((err)=>{
        res.json(err)
    })
}

export async function uploadFiles(req, res) {
    
    const { files } = req.body;
  

  const fileUrls = files.map(file => {
    // Decode Base64 and save to disk/cloud
    const buffer = Buffer.from(file.data.split(',')[1], 'base64');
    // Save buffer to a file and return URL
    return `http://localhost:3000/uploads/${file.filename}`;
  });
  res.json({ urls: fileUrls });
};
    /*
    
    if (!req.file) {
        return res.json({ msg: "No file uploaded" });
    } 
    const fileUrls=req.files.map(file=>'http://localhost:3000/'+file.filename);
   res.json(fileUrls);
}*/

//export const uploadMiddleware=upload.array("files",10);