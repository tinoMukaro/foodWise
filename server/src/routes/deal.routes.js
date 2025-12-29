import express from "express";
import {
  create_deal,
  get_my_deals,
  get_deal_by_id,
  update_deal,
  delete_deal,
  update_deal_status,
  getDealsForUser
} from "../controllers/deals.controller.js";
import { authenticateBusiness } from "../middleware/business.middleware.js";
import { UserAuth } from "../middleware/user.middleware.js";

const dealsRouter = express.Router();


dealsRouter.get("/", authenticateBusiness, get_my_deals);
dealsRouter.get("/all",UserAuth, getDealsForUser);

dealsRouter.get("/:id", get_deal_by_id);
// Protected routes (business only)
dealsRouter.get("/", authenticateBusiness, get_my_deals);
dealsRouter.post("/", authenticateBusiness, create_deal);
dealsRouter.put("/:id", authenticateBusiness, update_deal);
dealsRouter.delete("/:id", authenticateBusiness, delete_deal);
dealsRouter.patch("/:id/status", authenticateBusiness, update_deal_status);

export default dealsRouter;