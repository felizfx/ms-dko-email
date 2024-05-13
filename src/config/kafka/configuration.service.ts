import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class KafkaConfigurationService {
	constructor (
        private readonly configService: ConfigService
	) {}

	get brokers(): string {
		return this.configService.get<string>("kafka.brokers");
	}
}