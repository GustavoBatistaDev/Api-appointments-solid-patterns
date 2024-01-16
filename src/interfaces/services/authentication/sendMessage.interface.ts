export interface IsendMessage {
  sendMessage(
    from: string,
    to: string,
    subject: string,
    body: string,
  ): Promise<void>;
}
