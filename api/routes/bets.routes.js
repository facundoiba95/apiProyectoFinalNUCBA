import { Router } from "express";
import { checkBet, getBets, sendBet } from "../controllers/bets.controller.js";
import { verifyToken } from "../middlewares/AuthJwt.js";

const router = Router();

router.post('/sendBet', [ verifyToken ], sendBet);
router.post('/checkBet',[ verifyToken ], checkBet)
router.get('/getBets', getBets);

export default router;