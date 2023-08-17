import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

// teste de authenticate
let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    // criar usuario teste
    await usersRepository.create({
      name: 'Junior Soares',
      email: 'edson.soares.jr@outlook.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'edson.soares.jr@outlook.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String)) // espera que o usuario seja qualquer string
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'edson.soares.jr@outlook.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Junior Soares',
      email: 'edson.soares.jr@outlook.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'edson.soares.jr@outlook.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
