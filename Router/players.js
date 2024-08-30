import { Router } from "express";
import { playerController } from "../controller/player.js";
export const createPlayerRouter = () => {
  const playersRouter = Router();

  playersRouter.get('/', playerController.getRankingPlayers)
  playersRouter.post('/',playerController.createPlayer)
  playersRouter.put('/',playerController.updateRecord)
  playersRouter.post('/register',playerController.singUp)

  return playersRouter
}
