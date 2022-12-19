import assert from 'assert';
import { Interaction } from 'discord.js';

import { BlockMarket, Context, Event } from '../structures';

export class InteractionCreate implements Event<'interactionCreate'> {
	public event = 'interactionCreate' as const;

	public async execute(client: BlockMarket, interaction: Interaction<'cached'>): Promise<void> {
		try {
			assert(interaction.isChatInputCommand());
			const ctx = await new Context(interaction).init();
			await client.commands.find((c) => c.data.name === interaction.commandName).execute(ctx);
		} catch (err) {
			client.log.error(err);
		}
	}
}
