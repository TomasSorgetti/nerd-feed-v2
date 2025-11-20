import { Message } from "../entities/Message.js";

export class MessageFactory {
  static create(data) {
    return new Message(data);
  }
}
