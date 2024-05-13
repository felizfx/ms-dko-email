import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Partitioners, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
	constructor () {
		this.kafka = new Kafka({
			brokers: ["localhost:9092"],
		});
		this.producer = this.kafka.producer({
			createPartitioner: Partitioners.LegacyPartitioner
		});
		this.logger = new Logger("KafkaProducer");
	}
	private readonly kafka: Kafka;
	private readonly producer: Producer;
	private readonly logger: Logger;

	async onModuleInit() {
		await this.producer.connect();
	}

	async onApplicationShutdown() {
		await this.producer.disconnect();
	}

	async produce(record: ProducerRecord) {
		this.logger.log(`Producing to topic ${record.topic}`);
		await this.producer.send(record);
	}
}