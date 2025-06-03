import React, { useState, useEffect } from 'react';
import SidebarGuru from '../../component/sidebar/sidebar_admin.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import './kelolaakun_admin.css';

const KelolaAkunAdmin = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    fetchUsers().then(r => console.log("sukses", r));
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/admin/users');
        // Transform backend data to match frontend format
      const transformedUsers = response.data.users.map(user => ({
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        status: user.is_verified ? 'Aktif' : 'Non Aktif',
        timestamp: formatTimestamp(user.updated_at || user.created_at)
      }));
      
      setAccounts(transformedUsers);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const toggleMenu = (index) => {
    if (activeMenuIndex === index) {
      setActiveMenuIndex(null);
    } else {
      setActiveMenuIndex(index);
    }
  };

  const handleUsernameClick = (index) => {
    if (editIndex === index) {
      setEditIndex(null);
      setEditStatus('');
    } else {
      setEditIndex(index);
      setEditStatus(accounts[index].status);
    }
  };

  const handleStatusChange = (status) => {
    setEditStatus(status);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditStatus('');
  };  const handleDone = async () => {
    try {
      const userId = accounts[editIndex].id;
      const isVerified = editStatus === 'Aktif';
      
      await axiosInstance.put(`/api/admin/users/${userId}`, {
        is_verified: isVerified
      });

      // Update local state
      const updatedAccounts = [...accounts];
      updatedAccounts[editIndex].status = editStatus;
      setAccounts(updatedAccounts);
      
      // Close the edit form
      setEditIndex(null);
      setEditStatus('');
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user status. Please try again.');
    }
  };

  // Updated delete function to use API
  const handleDelete = async (index) => {
    const accountToDelete = accounts[index];
    const isConfirmed = window.confirm(`Are you sure you want to delete user "${accountToDelete.username}"?`);
    
    if (isConfirmed) {
      try {
        await axiosInstance.delete(`/api/admin/users/${accountToDelete.id}`);
        
        const updatedAccounts = accounts.filter((_, accountIndex) => accountIndex !== index);
        setAccounts(updatedAccounts);
        setActiveMenuIndex(null);
        
        // If we were editing the deleted account, close the edit form
        if (editIndex === index) {
          setEditIndex(null);
          setEditStatus('');
        }
        // If we were editing an account after the deleted one, adjust the index
        else if (editIndex > index) {
          setEditIndex(editIndex - 1);
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleUpdate = (index) => {
    setActiveMenuIndex(null); // Close the menu
    handleUsernameClick(index); // Open the edit form
  };
  return (
    <div className="kelolaakun-admin-container">
      <SidebarGuru />
      <div className="kelolaakun-content" style={{ overflowX: 'visible' }}>
        <header className="kelolaakun-header">
          <h2>Kelola Akun</h2>
          <button 
            className="refresh-button" 
            onClick={fetchUsers}
            disabled={loading}
            style={{
              marginLeft: 'auto',
              padding: '8px 16px',
              backgroundColor: '#8b2d0e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </header>

        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '16px',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            fontSize: '16px',
            color: '#666'
          }}>
            Loading users...
          </div>
        ) : (
          <table className="kelolaakun-table">
            <thead>
              <tr>
                <th style={{ minWidth: '120px' }}>User ID</th>
                <th style={{ minWidth: '150px' }}>Username</th>
                <th style={{ minWidth: '180px' }}>Full Name</th>
                <th style={{ minWidth: '200px' }}>Email</th>
                <th style={{ minWidth: '100px' }}>Role</th>
                <th style={{ minWidth: '120px' }}>Status</th>
                <th style={{ minWidth: '120px' }}>Last Updated</th>
                <th style={{ minWidth: '80px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    No users found
                  </td>
                </tr>
              ) : (
                accounts.map((account, index) => (
                  <React.Fragment key={`${account.id}-${index}`}>
                    <tr>
                      <td style={{ minWidth: '120px' }}>{account.id}</td>
                      <td style={{ minWidth: '150px' }}>
                        <b style={{ cursor: 'pointer', color: '#8b2d0e' }} onClick={() => handleUsernameClick(index)}>
                          {account.username}
                        </b>
                      </td>
                      <td style={{ minWidth: '180px' }}>{account.full_name || '-'}</td>
                      <td style={{ minWidth: '200px' }}>{account.email || '-'}</td>
                      <td style={{ minWidth: '100px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: account.role === 'admin' ? '#e3f2fd' : 
                                         account.role === 'guru' ? '#f3e5f5' : '#e8f5e8',
                          color: account.role === 'admin' ? '#1976d2' : 
                                 account.role === 'guru' ? '#7b1fa2' : '#388e3c'
                        }}>
                          {account.role}
                        </span>
                      </td>
                      <td style={{ minWidth: '120px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: account.status === 'Aktif' ? '#e8f5e8' : '#ffebee',
                          color: account.status === 'Aktif' ? '#388e3c' : '#d32f2f'
                        }}>
                          {account.status}
                        </span>
                      </td>
                      <td style={{ minWidth: '120px' }}><i>{account.timestamp}</i></td>
                      <td style={{ minWidth: '80px', position: 'relative', overflow: 'visible' }}>
                        <button className="action-button" onClick={() => toggleMenu(index)}>⋮</button>
                        {activeMenuIndex === index && (
                          <div className="action-menu" style={{ right: 'auto', left: '-110px', zIndex: 9999 }}>
                            <button className="action-menu-item" onClick={() => handleUpdate(index)}>Update</button>
                            <button className="action-menu-item" onClick={() => handleDelete(index)}>Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                    {editIndex === index && (
                      <tr className="edit-row">
                        <td colSpan="8">
                          <div className="edit-form">
                            <em>Update User Status</em>
                            <table>
                              <tbody>
                                <tr>
                                  <td>User ID</td>
                                  <td>{account.id}</td>
                                </tr>
                                <tr>
                                  <td>Username</td>
                                  <td>{account.username}</td>
                                </tr>
                                <tr>
                                  <td>Full Name</td>
                                  <td>{account.full_name || '-'}</td>
                                </tr>
                                <tr>
                                  <td>Email</td>
                                  <td>{account.email || '-'}</td>
                                </tr>
                                <tr>
                                  <td>Role</td>
                                  <td>{account.role}</td>
                                </tr>
                                <tr>
                                  <td>Status</td>
                                  <td>
                                    <button
                                      className={editStatus === 'Aktif' ? 'status-button active' : 'status-button'}
                                      onClick={() => handleStatusChange('Aktif')}
                                    >
                                      Aktif
                                    </button>
                                    <button
                                      className={editStatus === 'Non Aktif' ? 'status-button active' : 'status-button'}
                                      onClick={() => handleStatusChange('Non Aktif')}
                                    >
                                      Non Aktif
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Last Updated</td>
                                  <td><i>{account.timestamp}</i></td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="edit-form-buttons">
                              <button className="cancel-button" onClick={handleCancel}>CANCEL</button>
                              <button className="done-button" onClick={handleDone}>DONE</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default KelolaAkunAdmin;