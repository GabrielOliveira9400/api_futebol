import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ClubEntity } from './club.entity';

@Entity('tbplayers')
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  position: string;

  @ManyToOne(() => ClubEntity, (club) => club.players, { onDelete: 'CASCADE' })
  club: ClubEntity

  @Column({ type : 'uuid' })
  clubId: string;
}
