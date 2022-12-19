import { ColorResolvable } from 'discord.js';

export type ReplyString = 'success' | 'info' | 'warn' | 'error';
export const EmbedColors: Record<ReplyString, ColorResolvable> = {
	success: 'Green',
	info: 'Blurple',
	warn: 'Yellow',
	error: 'Red',
};
export type Locations = {
	locations: [
		{
			conceptId: number;
			name: string;
			shortDescription: string,
			description: string,
			location: string,
			menu: string,
			coordinates: {
				lat: number;
				lng: number;
			},
			acceptsOnlineOrders: boolean,
			times: [
				{
					start: {
						day: number
						hour: number
						minute: number
					},
					end: {
						day: number
						hour: number
						minute: number
					}
				},
			]
		},
	]
};
