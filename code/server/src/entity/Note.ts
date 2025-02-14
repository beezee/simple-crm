import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import type { NoteCreateData } from '@shared/types';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    content: string;

    @Column()
    createdAt: Date;

    @ManyToOne(() => User, user => user.notes)
    user: User;

    @Column()
    userId: number;
}

// Type assertion to ensure entity matches codec type
type EntityFields = Pick<Note, 'content'>;
type _assertCreate = EntityFields extends NoteCreateData ? true : NoteCreateData extends EntityFields ? true : never;
