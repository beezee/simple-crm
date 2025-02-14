import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import * as t from 'io-ts';
import { Note } from "./Note";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    phoneNumber: string;

    @OneToMany(() => Note, note => note.user)
    notes: Note[];
}

export const UserUpdateCodec = t.type({
    firstName: t.string,
    lastName: t.string,
    age: t.number,
    phoneNumber: t.string
});

// Type-level assertions to ensure UserUpdateCodec matches Omit<User, 'id'>
type UserUpdate = t.TypeOf<typeof UserUpdateCodec>;
type UserFromEntity = Omit<User, 'id'>;

// These type assertions will fail if the types don't match exactly
type _assertUpdateMatchesEntity = UserUpdate extends UserFromEntity ? true : never;
type _assertEntityMatchesUpdate = UserFromEntity extends UserUpdate ? true : never;

// This ensures the types are exactly equal (no extra properties in either type)
type _assertBidirectional = _assertUpdateMatchesEntity & _assertEntityMatchesUpdate;
