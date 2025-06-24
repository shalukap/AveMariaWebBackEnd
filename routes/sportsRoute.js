import express from "express";
import { addSports, deleteSports, getAllSports, getCurrentSports, updateSports } from "../controllers/sportsController.js";
import authUser from "../middlewares/adminMiddleware.js";


let sportsRouter = express.Router();

sportsRouter.get("/",getAllSports);
sportsRouter.get("/:id",getCurrentSports);
sportsRouter.post("/",authUser,addSports);
sportsRouter.put("/:id",authUser,updateSports);
sportsRouter.delete("/:id",authUser,deleteSports);

export default sportsRouter;