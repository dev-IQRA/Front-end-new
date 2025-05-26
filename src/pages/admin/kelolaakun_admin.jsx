import React, { useState } from 'react';
import SidebarGuru from '../../component/sidebar/sidebar_admin.jsx';
import './kelolaakun_admin.css';

const KelolaAkunAdmin = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  const accounts = [
    { id: '102999', username: 'Brooklyn', status: 'Non Aktif', timestamp: '13 min' },
    { id: '23001', username: 'Dea', status: 'Non Aktif', timestamp: '2 month ago' },
    { id: '30000', username: 'Jesslyn', status: 'Aktif', timestamp: '13 min' },
    { id: '30000', username: 'Jesslyn', status: 'Aktif', timestamp: '13 min' },
    { id: '30000', username: 'Jesslyn', status: 'Aktif', timestamp: '13 min' },
    { id: '30000', username: 'Jesslyn', status: 'Aktif', timestamp: '13 min' },
  ];

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
  };

  const handleDone = () => {
    // Here you would normally update the data source or call an API
    // For now, just close the edit form
    setEditIndex(null);
    setEditStatus('');
  };

  return (
    <div className="kelolaakun-admin-container">
      <SidebarGuru />
      <div className="kelolaakun-content" style={{ overflowX: 'visible' }}>
        <header className="kelolaakun-header">
          <h2>Kelola Akun</h2>
          <div className="user-info">
            <span>Username</span>
            <div className="user-circle">NIS</div>
          </div>
        </header>
        <table className="kelolaakun-table">
          <thead>
            <tr>
              <th style={{ minWidth: '100px' }}>ID</th>
              <th style={{ minWidth: '150px' }}>Username</th>
              <th style={{ minWidth: '120px' }}>Status</th>
              <th style={{ minWidth: '120px' }}>Timestamp</th>
              <th style={{ minWidth: '80px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td style={{ minWidth: '100px' }}>{account.id}</td>
                  <td style={{ minWidth: '150px' }}>
                    <b style={{ cursor: 'pointer', color: '#8b2d0e' }} onClick={() => handleUsernameClick(index)}>
                      {account.username}
                    </b>
                  </td>
                  <td style={{ minWidth: '120px' }}>{account.status}</td>
                  <td style={{ minWidth: '120px' }}><i>{account.timestamp}</i></td>
                  <td style={{ minWidth: '80px', position: 'relative', overflow: 'visible' }}>
                    <button className="action-button" onClick={() => toggleMenu(index)}>⋮</button>
                    {activeMenuIndex === index && (
                      <div className="action-menu" style={{ right: 'auto', left: '-110px', zIndex: 9999 }}>
                        <button className="action-menu-item" onClick={() => alert(`Update ${account.username}`)}>Update</button>
                        <button className="action-menu-item" onClick={() => alert(`Delete ${account.username}`)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
                {editIndex === index && (
                  <tr className="edit-row">
                    <td colSpan="5">
                      <div className="edit-form">
                        <em>Update</em>
                        <table>
                          <tbody>
                            <tr>
                              <td>ID</td>
                              <td>{account.id}</td>
                            </tr>
                            <tr>
                              <td>Username</td>
                              <td>{account.username}</td>
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
                              <td>Timestamp</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaAkunAdmin;
