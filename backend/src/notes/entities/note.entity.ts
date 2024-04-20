import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  title: string;

  @Column({ length: 250 })
  content: string;

  @Column({ default: new Date() })
  date: Date;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  category: string;

  // @Column({ default: new Date() })
  // createdAt: Date;
  // @Column({ default: new Date() })
  // updatedAt: Date;
}
