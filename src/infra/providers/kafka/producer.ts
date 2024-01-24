import { kafka } from ".";

export class KafkaSendMessage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async execute(topic: string, payload: any): Promise<void> {
    const producer = kafka.producer({
      allowAutoTopicCreation: true,
    });

    await producer.connect();
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });

    await producer.disconnect();
  }
}
