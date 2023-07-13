import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../entities/answer-comment'

export class CommentOnAnswerEvent implements DomainEvent {
  public ocurredAt: Date
  public answerComment: AnswerComment

  constructor(answerComent: AnswerComment) {
    this.answerComment = answerComent
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answerComment.id
  }
}
