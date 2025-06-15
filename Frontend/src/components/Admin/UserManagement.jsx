import React, { useState } from 'react';

const UserManagement = () => {
  // User management state
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Admin'
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Customer'
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Customer'
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer'
  });

  // User management functions
  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.password) {
      const user = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', password: '', role: 'Customer' });
      alert('User added successfully!');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="mt-12 lg:mt-0 space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">User Management</h1>
        <p className="text-gray-600 mt-2">Manage users and their roles</p>
      </div>

      {/* Add New User Form */}
      <div 
        className="bg-white rounded-xl shadow-sm p-6 opacity-0 animate-fade-in-up"
        style={{ 
          animation: 'fadeInUp 0.6s ease forwards',
          animationDelay: '0.1s'
        }}
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Add New User</h2>
        
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter user name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter password"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div 
        className="bg-white rounded-xl shadow-sm p-6 opacity-0 animate-fade-in-up"
        style={{ 
          animation: 'fadeInUp 0.6s ease forwards',
          animationDelay: '0.2s'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Users List</h2>
          <div className="text-sm text-gray-500">
            Total Users: {users.length}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 transition-colors duration-200 opacity-0 animate-fade-in-up"
                  style={{ 
                    animation: 'fadeInUp 0.6s ease forwards',
                    animationDelay: `${0.3 + (index * 0.1)}s`
                  }}
                >
                  <td className="py-4 px-4 text-slate-800 font-medium">
                    {user.name}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {user.email}
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found. Add a new user to get started.
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default UserManagement;