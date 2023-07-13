import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'
import { CommentOnQuestionEvent } from '../events/comment-on-question-event'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): QuestionComment {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    const isNewerCommentOnQuestion = !id

    if (isNewerCommentOnQuestion) {
      questionComment.addDomainEvent(
        new CommentOnQuestionEvent(questionComment),
      )
    }

    return questionComment
  }
}
