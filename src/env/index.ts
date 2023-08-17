import 'dotenv/config'
import { z } from 'zod'

// docker start api-solid-pg rodar docker
// docker ps -a lista os container

const envShema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333), // transf a porta em numero caso seja string
})

const _env = envShema.safeParse(process.env) // validando process.env

if (_env.success === false) {
  // se vier sucess é pq deu certo
  console.error('Invalid environment variables', _env.error.format()) // se for falso me retorna esse erro num formato mais legivel

  throw new Error('Invalid environment variables') // caso tenha esse erro nao execute mais NADA pare o servidor
}

export const env = _env.data // data p enviar cada inf passada lá em cima
