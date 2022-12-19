/* eslint-disable prefer-destructuring */
import 'reflect-metadata';

import { ClientOptions, GatewayIntentBits, InviteGenerationOptions, OAuth2Scopes, PermissionFlagsBits } from 'discord.js';
import { config } from 'dotenv';
import path from 'path';
import { DataSourceOptions } from 'typeorm';

import type { ISettingsParam } from 'tslog';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	config({ path: `${path.join(process.cwd(), '.env.development')}` });
}

// Environment Vars

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const DEVELOPER_IDS: string[] = JSON.parse(process.env.DEVELOPER_IDS);
export const DEPLOY_COMMANDS = +process.env.DEPLOY_COMMANDS;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = +process.env.DB_HOST;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_OPTION = +process.env.DB_OPTION;
export const PRODUCTION = process.env.NODE_ENV === 'production';
export const DEVELOPMENT = !PRODUCTION;
export const DEBUG = process.env.DEBUG === 'true';

// Exemptions

export const DEV_COOLDOWN_EXEMPT = process.env.DEV_COOLDOWN_EXEMPT === 'true';
export const DEV_MODULE_EXEMPT = process.env.DEV_MODULE_EXEMPT === 'true';

// Configurations

export const clientOptions: ClientOptions = {
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
	],
};

export const inviteOptions: InviteGenerationOptions = {
	scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
	permissions: [
		PermissionFlagsBits.ViewChannel,
		PermissionFlagsBits.SendMessages,
		PermissionFlagsBits.EmbedLinks,
		PermissionFlagsBits.BanMembers,
		PermissionFlagsBits.ModerateMembers,
		PermissionFlagsBits.ManageMessages,
		PermissionFlagsBits.UseExternalEmojis,
	],
};

export const databaseOptions: DataSourceOptions = {
	type: 'postgres',
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	logging: ['info', 'log', 'warn', 'error'],
};

export const loggerOptions: ISettingsParam = {
	overwriteConsole: true,
	displayFilePath: 'displayAll',
	displayFunctionName: false,
	dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	minLevel: DEBUG ? 'silly' : 'info',
};
