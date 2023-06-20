import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AttachmentProps {
  title: string
  link: string
}

export class Attachments extends Entity<AttachmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachments(props, id)

    return attachment
  }
}
