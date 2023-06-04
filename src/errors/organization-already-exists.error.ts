import { BaseError } from './base-error'

export class OrganizationAlreadyExists extends BaseError {
  constructor() {
    super('E-mail already exists', 409)
  }
}
