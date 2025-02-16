import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "./types";
import axios from "axios";
import { AddNote } from "./add-note";
import { ValidationErrors } from "./components/validation-errors";
import { UserUpdateCodec } from '@shared/codecs';
import { validateForm } from './utils/form';
import { handleServerError } from './utils/errors';

interface UserRowProps {
    user: User;
    onNoteAdded: () => void;
    onUserEdited: () => void;
}

export const UserRow: React.FC<UserRowProps> = ({ user, onNoteAdded, onUserEdited: onSuccess }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(`${user.age}`);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [errors, setErrors] = useState<string[] | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        const data = {
            firstName,
            lastName,
            age,
            phoneNumber
        };

        validateForm(
            UserUpdateCodec,
            data,
            async (validData) => {
                try {
                    await axios.put(`/api/users/${user.id}`, validData);
                    setSuccess(true);
                    setIsEditing(false);
                    onSuccess();
                } catch (error) {
                    setErrors(handleServerError(error));
                }
            },
            setErrors
        );
        setLoading(false);
    };

    const handleNoteAdded = () => {
        setIsAddingNote(false);
        onNoteAdded();
    };

    const renderForms = () => {
        if (!isEditing && !isAddingNote) return null;

        return (
            <tr>
                <td colSpan={6}>
                    {isEditing && (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 p-4 rounded bg-gray-100 w-96">
                            <h2 className="text-xl font-fold">Edit</h2>
                            <ValidationErrors errors={errors} />
                            {success && (
                                <p className="text-green-500">User updated successfully</p>
                            )}
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Age"
                                value={age}
                                onChange={e => setAge(e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Update User
                                </button>
                            </div>
                        </form>
                    )}
                    {isAddingNote && (
                        <AddNote 
                            user={user}
                            onSuccess={handleNoteAdded}
                            onCancel={() => setIsAddingNote(false)}
                        />
                    )}
                </td>
            </tr>
        );
    };

    const renderNotes = () => {
        return (
            <tr>
                <td colSpan={6}>
                    <div 
                        className="relative py-2 px-4 bg-gray-50 cursor-pointer transition-all"
                        onClick={() => setShowNotes(!showNotes)}
                    >
                        <div className="text-sm text-gray-600">
                            {user.notes.length} {user.notes.length === 1 ? 'Note' : 'Notes'}
                        </div>
                        {showNotes && user.notes.length > 0 && (
                            <div className="absolute left-0 right-0 bg-white shadow-lg border rounded-b-lg z-10">
                                <div className="max-h-48 overflow-y-auto">
                                    {user.notes.map(note => (
                                        <div key={note.id} className="p-4 border-b last:border-b-0">
                                            <div className="text-sm text-gray-600 mb-1">
                                                {new Date(note.createdAt).toLocaleString()}
                                            </div>
                                            <div className="text-gray-800 whitespace-pre-wrap">
                                                {note.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <>
            <tr key={user.id}>
                <td>
                    <div className="flex space-x-2">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => setIsAddingNote(true)}>Add Note</button>
                    </div>
                </td>
                <td><Link to={`/user/${user.id}`} className="text-blue-600 hover:text-blue-800">{firstName}</Link></td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>{phoneNumber}</td>
            </tr>
            {renderForms()}
            {renderNotes()}
        </>
    );
};
