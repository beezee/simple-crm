import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Note } from "./Note";
import type { UserCreateData, UserUpdateData } from '@shared/types';

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

// Type assertions to ensure entity matches codec types
type EntityFields = Omit<User, 'id' | 'notes'>;
type _assertCreate = EntityFields extends UserCreateData ? true : UserCreateData extends EntityFields ? true : never;
type _assertUpdate = EntityFields extends UserUpdateData ? true : never;

// Value declarations to make TypeScript evaluate the type assertions
const assertCreate: _assertCreate = true;
const assertUpdate: _assertUpdate = true;
