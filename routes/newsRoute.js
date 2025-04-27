import express from "express";
import { addNews, getAllNews,getCurrentNews,updateNews,deleteNews } from "../controllers/newsController.js";



let newsRouter = express.Router();

newsRouter.get("/",getAllNews);
newsRouter.get("/:id",getCurrentNews);
newsRouter.post("/",addNews);
newsRouter.put("/:id",updateNews);
newsRouter.delete("/:id",deleteNews);
//newsRouter.post("/upload",uploadMiddleware,uploadFiles);

export default newsRouter;