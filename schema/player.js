import z from 'zod'

const schemaPlayer = z.object({
  userName: z.string(),
  record: z.number().positive().int(),
  password: z.string()
})

export const validatePlayer=(object)=>{
  return schemaPlayer.partial().safeParse(object)
}
