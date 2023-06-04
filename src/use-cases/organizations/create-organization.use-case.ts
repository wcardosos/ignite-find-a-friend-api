import { OrganizationAlreadyExists } from '@/errors/organization-already-exists.error'
import { OrganizationsRepository } from '@/repositories/organizations/organizations-repository'
import { hash } from 'bcryptjs'

interface CreateOrganizationDTO {
  email: string
  password: string
  responsibleName: string
  whatsappNumber: string
  street: string
  zipcode: string
}

export class CreateOrganizationUseCase {
  private organizationsRepository: OrganizationsRepository

  constructor(organizationsRepository: OrganizationsRepository) {
    this.organizationsRepository = organizationsRepository
  }

  async execute({
    email,
    password,
    responsibleName,
    whatsappNumber,
    street,
    zipcode,
  }: CreateOrganizationDTO) {
    const emailAlreadyExists = await this.organizationsRepository.findByEmail(
      email,
    )

    if (emailAlreadyExists) {
      throw new OrganizationAlreadyExists()
    }

    const passwordHash = await hash(password, 6)

    await this.organizationsRepository.create({
      email,
      password_hash: passwordHash,
      responsible_name: responsibleName,
      street,
      whatsapp_number: whatsappNumber,
      zipcode,
    })
  }
}
