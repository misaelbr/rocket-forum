import { UseCaseError } from '@/core/errors/use-case-error'

export class NotAllowedErrror extends Error implements UseCaseError {
  constructor() {
    super('Not allowed')
  }
}
