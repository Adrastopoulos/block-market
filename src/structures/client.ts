import axios from 'axios';
import { Client, Collection } from 'discord.js';
import { Logger } from 'tslog';
import { DataSource } from 'typeorm';

import { Command } from '.';
import { clientOptions, loggerOptions } from '../config';

export class BlockMarket extends Client {
	public constructor() {
		super(clientOptions);
		this.commands = new Collection();
		this.log = new Logger(loggerOptions);
		this.axios = axios;
	}
}

declare module 'discord.js' {
	interface Client {
		commands: Collection<string, Command>;
		AppDataSource: DataSource;
		log: Logger;
		axios: typeof axios;
	}
}
