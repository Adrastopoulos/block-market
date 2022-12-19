import { Snowflake } from 'discord.js';
import { BaseEntity, Column } from 'typeorm';

export class Block extends BaseEntity {
	@Column({ type: 'character varying', primary: true })
	public id: Snowflake;

	@Column({ type: 'character varying', default: null })
	public location: string;
}
