import express from "express";
import { addCalenderEvent, deleteCalenderEvent, getAllCalenderEvents, getCurrentCalenderEvent, updateCalenderEvent } from "../controllers/calenderController.js";



let calenderRouter = express.Router();

calenderRouter.get("/",getAllCalenderEvents);
calenderRouter.get("/:id",getCurrentCalenderEvent);
calenderRouter.post("/",addCalenderEvent);
calenderRouter.put("/:id",updateCalenderEvent);
calenderRouter.delete("/:id",deleteCalenderEvent);

export default calenderRouter;