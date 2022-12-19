import { SlashCommandBuilder } from 'discord.js';
import { Context } from '.';

export class Command {
	data: Partial<SlashCommandBuilder>;

	execute: (ctx: Context) => Promise<void>;
}
