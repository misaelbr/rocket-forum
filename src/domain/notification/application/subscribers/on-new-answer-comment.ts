import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { CommentOnAnswerEvent } from '@/domain/forum/enterprise/events/comment-on-answer-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

export class OnNewAnswerComment implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions() {
    DomainEvents.register(
      this.commentOnAnswerNotification.bind(this),
      CommentOnAnswerEvent.name,
    )
  }

  private async commentOnAnswerNotification({
    answerComment,
  }: CommentOnAnswerEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString(),
    )

    if (answer) {
      const question = await this.questionsRepository.findById(
        answer.questionId.toString(),
      )

      if (question) {
        await this.sendNotification.execute({
          recipientId: answer.authorId.toString(),
          title: `Novo comentário na sua resposta"${answer.exerpt
            .substring(0, 20)
            .concat('...')}" em "${question.title
            .substring(0, 20)
            .concat('...')}"`,
          content: answerComment.content.substring(0, 50).concat('...'),
        })
      }
    }
  }
}
