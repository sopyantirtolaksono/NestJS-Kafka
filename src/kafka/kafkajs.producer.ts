import { Kafka, Message, Producer } from "kafkajs";
import { IProducer } from "./producer.interface";
import { sleep } from "src/sleep";
import { Logger } from "@nestjs/common";

export class KafkajsProducer implements IProducer {
    private readonly kafka: Kafka;
    private readonly producer: Producer;
    private readonly logger: Logger;

    constructor(private readonly topic: string, broker: string) {
        this.kafka = new Kafka({
            brokers: [broker],
        });
        this.producer = this.kafka.producer();
        this.logger = new Logger(topic);
    }

    async connect() {
        try {
            await this.producer.connect();
        } catch(err) {
            this.logger.error('Failed to connect kafka. ', err);
            await sleep(5000);
            await this.connect();
        }
    }

    async produce(message: Message) {
        await this.producer.send({ topic: this.topic, messages: [message] });
    }

    async disconnect() {
        await this.producer.disconnect();
    }
}