import mysql from 'mysql2/promise'
import { confing } from './confing.js'

const connection = await mysql.createConnection(confing)

export class gameModel{
  static async getPlayer({userName,password}){
    try {
      const [player] = await connection.query(
        `SELECT BIN_TO_UUID(id)id,userName,record FROM players WHERE players.userName = ? AND players.password = ?`,
        [userName,password]
      )
      return player
    } catch (error) {
      throw new Error('Erro get players')
    }
  }
  static async getRankingPlayer(){
    try {
      const [players] = await connection.query(
        `SELECT DISTINCT BIN_TO_UUID(id)id, userName,record FROM players`
      )
      return players
    } catch (error) {
      throw new Error('Error get ranking players')
    }
  }

  static async createPlayer({data}){
    try {
      const {userName,password} = data;
      const [uuIdResult]= await connection.query('SELECT UUID() uuid')
      const [{uuid}] = uuIdResult;
      const [newPlayer] = await connection.query(
        `INSERT INTO players(id,userName,password) VALUES
        (UUID_TO_BIN(?),?,?);`,[uuid,userName,password]
      )
      
      const [player] = await connection.query(
        `SELECT BIN_TO_UUID(id)id,userName,record FROM players
        WHERE BIN_TO_UUID(players.id) = ?`,
        [uuid]
      );

      return player
    } catch (error) {
      throw new Error('Error create new player')
    }
  }
  static async updateRecord ({newRecord,id}){
    try {
      const [updateResult] = await connection.query(
        `UPDATE players SET record = ? WHERE BIN_TO_UUID(players.id) = ?`,
        [newRecord,id]
      )
      const [playerUpdate] = await connection.query(
        `SELECT BIN_TO_UUID(id)id,userName,record FROM players WHERE BIN_TO_UUID(players.id) = ?`,
        [id]
      )
      return playerUpdate
    } catch (error) {
      
    }
  }
}