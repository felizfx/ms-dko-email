import { registerAs } from "@nestjs/config";

export default registerAs("kafka", () => ({
	brokers: process.env.KAFKA_BROKERS,
}));