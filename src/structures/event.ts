import { ClientEvents } from 'discord.js';
import { BlockMarket } from '.';

export class Event<T extends keyof ClientEvents> {
	public readonly event: T;

	public execute: (client: BlockMarket, ...args: ClientEvents[T]) => unknown;
}
