/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from './organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create({
    email,
    password_hash,
    responsible_name,
    street,
    whatsapp_number,
    zipcode,
  }: Prisma.OrganizationCreateInput) {
    await prisma.organization.create({
      data: {
        email,
        password_hash,
        responsible_name,
        street,
        whatsapp_number,
        zipcode,
      },
    })
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }
}
