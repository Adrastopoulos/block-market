import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { Command, Context } from '../structures';
import { Locations } from '../typings';

export default class implements Command {
	data = new SlashCommandBuilder()
		.setName('nom')
		.setDescription('View eateries')
		.addSubcommand((subcommand) => subcommand
			.setName('open')
			.setDescription('View all open eateries'))
		.addSubcommand((subcommand) => subcommand
			.setName('today')
			.setDescription('View all eateries that will be open today'))
		.addSubcommand((subcommand) => subcommand
			.setName('all')
			.setDescription('View all eatieres'));

	execute = async (ctx: Context) => {
		const res = await ctx.interaction.client.axios.get<Locations>('https://dining.apis.scottylabs.org/locations');
		const now = new Date();
		const today = now.getDay();
		const hour = now.getHours();
		const minute = now.getMinutes();
		const weightedTime = hour + minute / 60;
		const locations = res.data.locations.filter((location) => {
			const time = location.times.find((time) => time.start.day === today);
			if (!time) return false;
			if (ctx.interaction.options.getSubcommand() === 'open') {
				return time.start.hour + time.start.minute / 60 <= weightedTime
					&& (time.end.day > today || (time.end.hour + time.end.minute / 60 >= weightedTime));
			}

			if (ctx.interaction.options.getSubcommand() === 'today') return time.start.day === today;
			if (ctx.interaction.options.getSubcommand() === 'all') return true;
			return false;
		});

		const embed = new EmbedBuilder()
			.setTitle('What\'s Open?')
			.setAuthor({ name: 'What\'s Open', iconURL: 'https://cdn.discordapp.com/emojis/1018191397167300758.gif?size=96&quality=lossless' })
			.addFields(
				locations.map((location) => ({
					name: location.name,
					value: location.description,
					inline: true,
				})),
			);

		await ctx.interaction.reply({ embeds: [embed] });
	};
}
