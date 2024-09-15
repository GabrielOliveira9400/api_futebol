import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PlayerEntity } from './player.entity';

@Entity('tbclubs')
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => PlayerEntity, (player) => player.club, { onDelete: 'CASCADE' })
  players: PlayerEntity[];
}
