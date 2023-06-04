import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateOrganizationUseCase } from '@/use-cases/organizations/create-organization.use-case'
import { PrismaOrganizationsRepository } from '@/repositories/organizations/prisma-organizations.repository'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    responsibleName: z.string(),
    whatsappNumber: z.string(),
    zipcode: z.string(),
    street: z.string(),
  })

  const { email, password, responsibleName, street, whatsappNumber, zipcode } =
    registerOrgSchema.parse(request.body)

  const prismaRepository = new PrismaOrganizationsRepository()
  const createOrganizationUseCase = new CreateOrganizationUseCase(
    prismaRepository,
  )
  try {
    await createOrganizationUseCase.execute({
      email,
      password,
      responsibleName,
      street,
      whatsappNumber,
      zipcode,
    })
  } catch (error: any) {
    return reply
      .status(error.statusCode || 400)
      .send({ message: error.message })
  }

  return reply.status(201).send()
}
