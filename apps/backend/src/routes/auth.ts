import { Router } from "express";

import signup from "../controllers/auth/signup";
import login from "../controllers/auth/login";
import userLoggedIn from "../controllers/auth/userLoggedIn";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/", userLoggedIn);

export default router;