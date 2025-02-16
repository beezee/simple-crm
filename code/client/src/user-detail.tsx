import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './types';
import { ValidationErrors } from './components/validation-errors';
import { AddNote } from './add-note';
import { handleServerError } from './utils/errors';

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        setErrors(handleServerError(error));
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  const handleNoteAdded = async () => {
    const response = await axios.get(`/api/users/${id}`);
    setUser(response.data);
    setIsAddingNote(false);
  };

  if (!user || errors) return <ValidationErrors errors={errors} />;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg mb-4">{user.firstName} {user.lastName}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>Age: {user.age}</div>
          <div>Phone: {user.phoneNumber}</div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg mb-4">Notes</h3>
        {isAddingNote ? (
          <AddNote
            user={user}
            onSuccess={handleNoteAdded}
            onCancel={() => setIsAddingNote(false)}
          />
        ) : (
          <button onClick={() => setIsAddingNote(true)} className="text-blue-600 hover:text-blue-800">
            Add Note
          </button>
        )}
        <div className="space-y-4 mt-4">
          {user.notes.map(note => (
            <div key={note.id} className="border-l-4 border-blue-500 pl-4">
              <div className="text-sm text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </div>
              <div className="mt-1 whitespace-pre-wrap">{note.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
