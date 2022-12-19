import { DataSource } from 'typeorm';

import { databaseOptions, DB_OPTION } from './config';
import { BlockMarket } from './structures';

const client = new BlockMarket();

const commandFiles = await import('./commands');
Object.values(commandFiles).forEach((Constructor) => {
	const command = new Constructor();
	client.log.debug(`Registering command ${command.data.name}`);
	client.commands.set(command.data.name, command);
});

client.log.debug('Connecting to DB');
const entityFiles = await import('./entities');
client.AppDataSource = await new DataSource({
	...databaseOptions,
	entities: Object.values(entityFiles),
}).initialize();
if (DB_OPTION === 1) {
	await client.AppDataSource.synchronize();
	client.log.debug('Database synchronized');
} else if (DB_OPTION === 2) {
	await client.AppDataSource.synchronize(true);
	client.log.debug('Database dropped and synchronized');
}

const eventFiles = await import('./events');
Object.values(eventFiles).forEach(async (Constructor) => {
	const event = new Constructor();
	client.log.debug(`Loading event ${event.event}`);
	client.on(event.event, async (args) => {
		client.log.debug(`Recevied event ${event.event}`);
		await event.execute(client, args as any);
	});
});

await client.login(process.env.BOT_TOKEN);

process.on('unhandledRejection', (err: Error) => client.log.error(err));
process.on('uncaughtException', (err, origin) => client.log.error(err, origin));

export default client;
