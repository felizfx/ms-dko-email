import { Injectable, Logger, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";
import { KafkaConfigurationService } from "src/config/kafka/configuration.service";

type ExtendedConsumerSubscribeTopics = ConsumerSubscribeTopics & { groupId: string };

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
	constructor(
        private readonly kafkaConfigurationService: KafkaConfigurationService
	) {
		this.kafka = new Kafka({
			clientId: "ms_email_sender",
			brokers: [this.kafkaConfigurationService.brokers],
		});
		this.consumers = [];
		this.logger = new Logger(ConsumerService.name);
	}

	private readonly kafka: Kafka;
	private readonly consumers: Consumer[];
	private readonly logger: Logger;
	private consumer: Consumer;

	async consume(topics: ExtendedConsumerSubscribeTopics, config: ConsumerRunConfig) {
		this.logger.warn(`Subscribing on topic ${topics.topics}`);
		this.consumer = this.kafka.consumer({ groupId: topics.groupId });
		await this.consumer.connect();
		await this.consumer.subscribe(topics);
		await this.consumer.run(config);
		this.consumers.push(this.consumer);
		this.logger.log(`Subscribed on topic ${topics.topics}`);
	}

	async onApplicationShutdown() {
		await Promise.all(this.consumers.map(consumer => consumer.disconnect()));
		this.logger.log("Disconnected all consumers");
	}
}