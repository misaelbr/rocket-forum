import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryAnswersRepository implements AnswersRepository {
  constructor(
    private answersAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(index, 1)

    await this.answersAttachmentsRepository.deleteManyByAnswerId(
      answer.id.toString(),
    )
  }

  async save(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)

    this.items[index] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const items = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return items
  }
}
