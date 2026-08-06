import express from "express";

import contactController from "../controllers/contact.controller.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

//for public
router.post("/", contactController.createContact);

//admin
router.get("/count", auth, roleBasedAuth(ROLE_ADMIN), contactController.getUnreadCount);

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), contactController.getAllContacts);

router.get("/:id", auth, roleBasedAuth(ROLE_ADMIN), contactController.getContactById);

router.patch("/:id/read", auth, roleBasedAuth(ROLE_ADMIN), contactController.markAsRead);

router.delete("/:id", auth, roleBasedAuth(ROLE_ADMIN), contactController.deleteContact);

export default router;