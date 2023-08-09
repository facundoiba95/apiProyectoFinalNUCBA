import { Router } from "express";
import { getMatchesLeagueArgentina, getMatchesLeagues, getMatchesLeaguesToday } from '../controllers/matches.js'

const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/getMatchesLeagues', getMatchesLeagues )
router.post('/getMatchesLeaguesToday', getMatchesLeaguesToday )
router.post('/getMatchesLeagueArgentina', getMatchesLeagueArgentina)

export default router;