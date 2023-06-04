import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<void>
  findByEmail(email: string): Promise<Organization | null>
}
