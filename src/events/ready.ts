/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationCommandDataResolvable } from 'discord.js';

import { DEPLOY_COMMANDS } from '../config';
import { BlockMarket, Event } from '../structures';

export class Ready implements Event<'ready'> {
	public event = 'ready' as const;

	public async execute(client: BlockMarket) {
		if (DEPLOY_COMMANDS === 0) {
			client.log.info('Commands Idle');
		} else if (DEPLOY_COMMANDS === 1) {
			await this.updateCommands(client);
		} else if (DEPLOY_COMMANDS === 2) {
			await this.resetCommands(client);
			await this.updateCommands(client);
		}

		client.log.info(`${client.user.tag} Ready`);
	}

	private async updateCommands(client: BlockMarket) {
		const defaultCommandData: ApplicationCommandDataResolvable[] = [];
		client.commands.forEach((command) => {
			defaultCommandData.push(command.data.toJSON());
		});

		await client.application.commands.set(defaultCommandData);
		client.log.debug('Registered global commands');
	}

	private async resetCommands(client: BlockMarket) {
		await client.application.commands.set([]);
		client.log.debug('Reset global commands');
	}
}
