import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { CommentOnQuestionEvent } from '@/domain/forum/enterprise/events/comment-on-question-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

export class OnNewQuestionComment implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions() {
    DomainEvents.register(
      this.commentOnQuestionNotification.bind(this),
      CommentOnQuestionEvent.name,
    )
  }

  private async commentOnQuestionNotification({
    questionComent,
  }: CommentOnQuestionEvent) {
    const question = await this.questionsRepository.findById(
      questionComent.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Novo comentário em "${question.title
          .substring(0, 20)
          .concat('...')}"`,
        content: questionComent.content.substring(0, 50).concat('...'),
      })
    }
  }
}
