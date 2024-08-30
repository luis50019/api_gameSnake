import express, { json } from 'express'
import { middlewareCors } from './middleware/cors.js';
import { createPlayerRouter } from './Router/players.js';
const app = express();
const PORT = process.env.PORT || 3560;

app.disable('x-powered-by')
app.use(json());
app.use(middlewareCors());
app.use('/gameSnake',createPlayerRouter())

app.listen(PORT,()=>{
  console.log(`server http://localhost:${PORT}`);
})
