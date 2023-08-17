import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null> // recebe um email e devolve uma promisse user ou nulo
  create(data: Prisma.UserCreateInput): Promise<User>
}
