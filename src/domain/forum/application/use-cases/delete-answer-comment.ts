import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { right, left, Either } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedErrror } from './errors/not-allowed-error'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}
type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedErrror,
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId,
    )

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedErrror())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
