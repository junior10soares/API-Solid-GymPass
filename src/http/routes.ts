import { FastifyInstance } from 'fastify'
import { verifyJwt } from './middlewares/verify-jwt'
import { register } from './controllers/users/register'
import { authenticate } from './controllers/users/authenticate'
import { profile } from './controllers/users/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register) // criando seção de usuarios registrar

  app.post('/sessions', authenticate) // criando seção p autenticar
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
