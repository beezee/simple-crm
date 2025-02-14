import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import * as t from 'io-ts';

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

export const NoteCreateCodec = t.type({
    content: t.string
});
