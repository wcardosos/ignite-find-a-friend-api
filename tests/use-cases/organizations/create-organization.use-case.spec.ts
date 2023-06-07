import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { CreateOrganizationUseCase } from '@/use-cases/organizations/create-organization.use-case'
import { OrganizationsRepository } from '@/repositories/organizations/organizations-repository'
import { Organization } from '@prisma/client'
import { OrganizationAlreadyExists } from '@/errors/organization-already-exists.error'

vi.mock('bcryptjs', () => ({
  hash: () => new Promise((resolve) => resolve('hashed password')),
}))

describe('CreateOrganizationUseCase', () => {
  let createOrganizationUseCase: CreateOrganizationUseCase
  const createOrganizationsRepositoryMock = vi.fn()
  const findByEmailOrganizationsRepositoryMock = vi.fn()
  const organizationsRepositoryMock = {} as OrganizationsRepository
  organizationsRepositoryMock.create = createOrganizationsRepositoryMock
  organizationsRepositoryMock.findByEmail =
    findByEmailOrganizationsRepositoryMock

  const organizationDataMock = {
    email: 'test@email.com',
    password: 'test',
    responsibleName: 'Fulano',
    whatsappNumber: '11111111111',
    street: 'Rua qualquer',
    zipcode: '00000000',
  }

  beforeEach(() => {
    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationsRepositoryMock,
    )
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('execute', () => {
    it('should throw an error when the email already exists', () => {
      findByEmailOrganizationsRepositoryMock.mockResolvedValue(
        {} as Organization,
      )

      expect(
        async () =>
          await createOrganizationUseCase.execute(organizationDataMock),
      ).rejects.toThrowError(OrganizationAlreadyExists)
    })

    it('should create an organization', async () => {
      await createOrganizationUseCase.execute(organizationDataMock)

      expect(createOrganizationsRepositoryMock).toHaveBeenCalledWith({
        email: 'test@email.com',
        password_hash: 'hashed password',
        responsible_name: 'Fulano',
        whatsapp_number: '11111111111',
        street: 'Rua qualquer',
        zipcode: '00000000',
      })
    })
  })
})
