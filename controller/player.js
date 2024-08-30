import { gameModel } from "../model/mysql.js";

export class playerController{
  static getRankingPlayers = async (req,res)=>{
    try {
      const Players = await gameModel.getRankingPlayer();
      const rankingPlayers = Players.sort((a,b)=> a.record - b.record)
      res.status(201).json(rankingPlayers)
    } catch (error) {
      throw new Error('Erro get ranking of the players')
    }
  }
  static singUp =async(req,res)=>{
    try {
      const result = req.body;
      const player = await gameModel.getPlayer({
        userName: result.userName,
        password:result.password
      })
      //if player is not exist create a new player
      if(player.length == 0){
        const createPlayer = await gameModel.createPlayer({data:result});
        res.json(createPlayer)
      }else{
        res.json(player)
      }
    } catch (error) {
      console.log(error);
    }
  }
  static createPlayer= async(req,res)=>{
    try{
      const result = req.body;
      const newPlayer = await gameModel.createPlayer({data:result})
      res.json(newPlayer)
    }catch(e){
      console.log(e);
    }
  }
  static async updateRecord(req,res){
    try {
      const result = req.body
      const updatePlayer = await gameModel.updateRecord({
        id:result.id,
        newRecord:result.record
      })
      res.json(updatePlayer)
    } catch (error) {
      
    }
  }
}