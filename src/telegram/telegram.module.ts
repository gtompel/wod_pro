import { NestjsGrammyModule } from '@grammyjs/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TelegramUpdate } from './telegram.update'

@Module({
	imports: [
		ConfigModule,
		NestjsGrammyModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const token = configService.get<string>('TELEGRAM_BOT_TOKEN')
				if (!token) {
					throw new Error('TELEGRAM_BOT_TOKEN is not defined')
				}
				return {
					token
				}
			}
		})
	],
	providers: [TelegramUpdate]
})
export class TelegramModule {}
