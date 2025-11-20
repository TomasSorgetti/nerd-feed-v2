export class Message {
  constructor({
    id = null,
    chat_id,
    sender_id,
    content = "",
    read_at = null,
    attachment_url = null,
    created_at = null,
  }) {
    this.id = id;
    this.chat_id = chat_id;
    this.sender_id = sender_id;
    this.content = content;
    this.read_at = read_at;
    this.attachment_url = attachment_url;
    this.created_at = created_at;
  }

  toObject() {
    return {
      chat_id: this.chat_id,
      sender_id: this.sender_id,
      content: this.content,
      read_at: this.read_at,
      attachment_url: this.attachment_url,
    };
  }
}
