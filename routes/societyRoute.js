import express from "express";
import { addSociety, getCurrentSociety, deleteSociety, getAllSocieties, updateSociety } from "../controllers/societyController.js";



let societyRouter = express.Router();

societyRouter.get("/",getAllSocieties);
societyRouter.get("/:id",getCurrentSociety);
societyRouter.post("/",addSociety);
societyRouter.put("/:id",updateSociety);
societyRouter.delete("/:id",deleteSociety);

export default societyRouter;