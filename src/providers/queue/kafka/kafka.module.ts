import { Module } from "@nestjs/common";
import { KafkaConfigurationModule } from "src/config/kafka/configuration.module";
import { ProducerService } from "./producer.service";
import { ConsumerService } from "./consumer.service";

@Module({
	imports: [KafkaConfigurationModule],
	providers: [ProducerService, ConsumerService],
	exports: [ProducerService, ConsumerService]
})
export class KafkaModule {}