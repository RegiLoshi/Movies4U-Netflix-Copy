import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser } from '../services/userService';
import { Save, Trash2, X } from 'lucide-react';
import {signOut} from '../redux/authActions';

const UserSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id);
        setUser(response.user);
        setFormData(response.user);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) return;

    try {
      await updateUser(id, formData);
      setUser(formData);
      setEditMode(false);
    } catch (error) {
      setError('Error updating user data');
    }
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData({ ...user });
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser(id);
        await dispatch(signOut());
      } catch (error) {
        setError('Error deleting account');
      }
    }
  };

  const handleNavigateHome = () => {
    navigate('/home');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto relative">
        {/* X button to navigate back */}
        <button
          onClick={handleNavigateHome}
          className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
        >
          <X size={24} />
        </button>

        <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'surname', 'email', 'dateOfBirth'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2" htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : field === 'dateOfBirth' ? 'date' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              ))}
            </div>

            {editMode && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                  <Save className="mr-2" size={20} />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {!editMode && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleEditMode}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
          <p className="mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Trash2 className="mr-2" size={20} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
