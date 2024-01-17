export interface IsendMessage {
  sendMessage(from: string, to: string): Promise<void>;
}
