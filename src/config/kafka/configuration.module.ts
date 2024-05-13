import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { KafkaConfigurationService } from "./configuration.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration]
		})
	],
	providers: [ConfigService, KafkaConfigurationService],
	exports: [ConfigService, KafkaConfigurationService],
})
export class KafkaConfigurationModule {}