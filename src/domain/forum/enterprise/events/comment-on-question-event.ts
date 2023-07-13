import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../entities/question-comment'

export class CommentOnQuestionEvent implements DomainEvent {
  public ocurredAt: Date
  public questionComent: QuestionComment

  constructor(questionComent: QuestionComment) {
    this.questionComent = questionComent
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.questionComent.id
  }
}
