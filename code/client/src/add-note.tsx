import { useState } from "react";
import axios from "axios";
import { User } from "./types";
import { ValidationError, handleApiError } from "./utils/error";
import { ValidationErrors } from "./components/validation-errors";

interface AddNoteProps {
    user: User;
    onSuccess: () => void;
    onCancel: () => void;
}

export const AddNote: React.FC<AddNoteProps> = ({ user, onSuccess, onCancel }) => {
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState<ValidationError | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        try {
            await axios.post(`/api/users/${user.id}/notes`, { content });
            setContent("");
            onSuccess();
        } catch (error) {
            setErrors(handleApiError(error));
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded bg-gray-100 w-96">
            <h2 className="text-xl font-fold">Add Note for {user.firstName} {user.lastName}</h2>
            <ValidationErrors errors={errors} />
            <textarea
                placeholder="Note content"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded h-32"
            />
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Add Note
                </button>
            </div>
        </form>
    );
};
