import { useState } from "react";
import axios from "axios";
import { ValidationErrors } from "./components/validation-errors";
import { UserCreateCodec } from '@shared/codecs';
import { validateForm } from './utils/form';
import { handleServerError } from './utils/errors';

interface AddUserProps {
    onSuccess: () => void;
}

export const AddUser: React.FC<AddUserProps> = ({ onSuccess }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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
            UserCreateCodec,
            data,
            async (validData) => {
                try {
                    await axios.post('/api/users', validData);
                    setSuccess(true);
                    setFirstName("");
                    setLastName("");
                    setAge("");
                    setPhoneNumber("");
                    onSuccess();
                } catch (error) {
                    setErrors(handleServerError(error));
                }
            },
            setErrors
        );
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded bg-gray-100 w-96">
            <h2 className="text-xl font-fold">Add User</h2>
            <ValidationErrors errors={errors} />
            {success && <p className="text-green-500">User added successfully</p>}
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
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Add User
                </button>
            </div>
        </form>
    );
};
