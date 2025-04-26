import { InjectBot, Start, Update } from '@grammyjs/nestjs'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Bot, Context } from 'grammy'

@Update()
@Injectable()
export class TelegramUpdate {
	private readonly botToken: string

	constructor(
		@InjectBot() private readonly bot: Bot<Context>,
		private readonly configService: ConfigService
	) {
		const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN')
		if (!token) {
			throw new Error('TELEGRAM_BOT_TOKEN is not defined')
		}
		this.botToken = token
	}
	@Start()
	async onStart(ctx: Context): Promise<void> {
		await ctx.reply(
			'Привет! Я бот, который поможет тебе развлечься. Чтобы узнать, что я умею, нажми на кнопку ниже.'
		)
	}
}
