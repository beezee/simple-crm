export interface Note {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    notes: Note[];
}
