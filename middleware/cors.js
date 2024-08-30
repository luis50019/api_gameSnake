import cors from 'cors';

const ACCEPT_ORIGINS = [
  'http://localhost:5173'
]

export const middlewareCors =({acceptedOrigins = ACCEPT_ORIGINS} ={})=>{
  return cors({
    origin: (origin,callback)=>{
      if(acceptedOrigins.includes(origin)){
        return callback(null,true)
      }
      if(!origin){
        return callback(null,true)
      }
      return callback(new Error('Error allowed by cors'))
    }
  })
}
