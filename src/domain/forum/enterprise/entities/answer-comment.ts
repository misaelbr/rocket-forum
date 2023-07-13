import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'
import { CommentOnAnswerEvent } from '../events/comment-on-answer-event'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): AnswerComment {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    const isNewAnswerComment = !id

    if (isNewAnswerComment) {
      answerComment.addDomainEvent(new CommentOnAnswerEvent(answerComment))
    }

    return answerComment
  }
}
