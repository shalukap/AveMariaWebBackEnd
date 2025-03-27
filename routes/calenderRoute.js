import express from "express";
import { addCalenderEvent, getAllCalenderEvents, getCurrentCalenderEvent, updateCalenderEvent } from "../controllers/calenderController.js";



let calenderRouter = express.Router();

calenderRouter.get("/",getAllCalenderEvents);
calenderRouter.get("/:id",getCurrentCalenderEvent);
calenderRouter.post("/",addCalenderEvent);
calenderRouter.put("/:id",updateCalenderEvent);

export default calenderRouter;