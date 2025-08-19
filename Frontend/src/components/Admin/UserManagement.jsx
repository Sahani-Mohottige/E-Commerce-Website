import React, { useEffect, useState } from "react";
import { createUser, deleteUser, fetchUsers, updateUser } from "../../redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector(state => state.admin);

  const [newUser, setNewUser] = useState({
    name: "", email: "", password: "", role: "customer"
  });
  const [deleteUserId, setDeleteUserId] = useState(null); // Track user to delete

  useEffect(() => { 
    dispatch(fetchUsers()); 
  }, [dispatch]);

  const handleAddUser = e => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill all fields"); return;
    }
    dispatch(createUser(newUser))
      .unwrap()
      .then(() => {
        toast.success("User added!", { description: `${newUser.name} is now a ${newUser.role}` });
        setNewUser({ name: "", email: "", password: "", role: "customer" });
      })
      .catch(() => toast.error("Failed to add user"));
  };

  const handleDeleteUser = id => {
    setDeleteUserId(id); // Show modal
  };

  const confirmDeleteUser = () => {
    dispatch(deleteUser(deleteUserId))
      .unwrap()
      .then(() => toast.success("User deleted"))
      .catch(() => toast.error("Failed to delete"));
    setDeleteUserId(null);
  };

  const cancelDeleteUser = () => {
    setDeleteUserId(null);
  };

  const handleRoleChange = (id, role) => {
    dispatch(updateUser({ id, role }))
      .unwrap()
      .then(() => {
        toast.success("Role updated");
        dispatch(fetchUsers()); // Refresh users after update
      })
      .catch(() => toast.error("Failed to update role"));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-1">Add, update, or delete users</p>
        </div>

        {/* Add User */}
        <form onSubmit={handleAddUser} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-gray-100">
          <input type="text" placeholder="Name" value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"/>
          <input type="email" placeholder="Email" value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"/>
          <input type="password" placeholder="Password" value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"/>
          <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400">
            <option key="customer" value="customer">Customer</option>
            <option key="admin" value="admin">Admin</option>
          </select>
          <button type="submit" className="md:col-span-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Add User
          </button>
        </form>

        {/* Users Table */}
        <div className="overflow-x-auto">
          {loading ? <p className="p-6 text-gray-600">Loading...</p> :
           error ? <p className="p-6 text-red-500">{error}</p> :
           <table className="w-full text-left border border-gray-100">
             <thead className="bg-gray-50">
               <tr>
                 <th className="py-3 px-4 text-xs font-medium uppercase">Name</th>
                 <th className="py-3 px-4 text-xs font-medium uppercase">Email</th>
                 <th className="py-3 px-4 text-xs font-medium uppercase">Role</th>
                 <th className="py-3 px-4 text-xs font-medium uppercase">Actions</th>
               </tr>
             </thead>
             <tbody>
               {users.map(user => (
                 <tr key={user._id} className="hover:bg-gray-50">
                   <td className="py-4 px-4">{user.name}</td>
                   <td className="py-4 px-4">{user.email}</td>
                   <td className="py-4 px-4">
                     <select value={user.role} onChange={e => handleRoleChange(user._id, e.target.value)}
                       className="px-2 py-1 border rounded text-sm">
                       <option key="customer" value="customer">Customer</option>
                       <option key="admin" value="admin">Admin</option>
                     </select>
                   </td>
                   <td className="py-4 px-4">
                     <button onClick={() => handleDeleteUser(user._id)}
                       className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                       Delete
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
          }
        </div>

        {/* Delete Confirmation Modal */}
        {deleteUserId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
              <p className="mb-4">Are you sure you want to delete this user?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={cancelDeleteUser}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteUser}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
