import { Snowflake } from 'discord.js';
import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Guild extends BaseEntity {
	@Column({ type: 'character varying', primary: true })
	public id: Snowflake;

	@Column({ type: 'character varying', default: null })
	public blockLogId: string | null;
}
