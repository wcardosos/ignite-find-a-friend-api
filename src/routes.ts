import { FastifyInstance } from 'fastify'
import { create as createOrganization } from '@/controllers/organizations.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/organizations', createOrganization)
}
