import { ConsumerConfig, ConsumerSubscribeTopic, KafkaMessage } from "kafkajs";

export interface KafkajsConsumerOptions {
    topic: ConsumerSubscribeTopic;
    config: ConsumerConfig;
    onMessage: (message: KafkaMessage) => Promise<void>
}