import React, { useState, useEffect } from "react"
import Sidebar from "../../component/sidebar/sidebar_admin.jsx"
import Calender from "../../component/common/calender.jsx"
import axiosInstance from "../../utils/axiosInstance.js"
import "./dashboard_admin.css"

const DashboardAdmin = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch online users from backend
  useEffect(() => {
    fetchOnlineUsers();
    
    // Set interval untuk refresh online users setiap 10 detik
    const interval = setInterval(fetchOnlineUsers, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchOnlineUsers = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/online-users');
      setOnlineUsers(response.data.users);
      setError(null);
    } catch (err) {
      console.error('Error fetching online users:', err);
      setError('Failed to load online users');
    } finally {
      setLoading(false);
    }
  };

  const getDisplayId = (user) => {
    if (user.role === 'guru' && user.nip) {
      return user.nip;
    } else if (user.role === 'siswa' && user.nis) {
      return user.nis;
    }
    return user.id.substring(0, 8); // Fallback to short user ID
  };

  const getRoleLabel = (role) => {
    switch(role) {
      case 'guru': return 'NIP';
      case 'siswa': return 'NIS';
      case 'admin': return 'ID';
      default: return 'ID';
    }
  };

  // Sample announcement text
  const announcementText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat magna quis eros consequat porttitor. Morbi tempus sapien ac dui gravida, tempus pharetra magna interdum. Mauris justo elit, faucibus ut orci placerat, sagittis viverra nulla. Donec dictum consequat dui hendrerit condimentum. Nulla sagittis nisl est. Donec eget feugiat est. Donec non dictum augue. Donec sagittis fermentum.`

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-content">
        <div className="announcements-section">
          <div className="section-header">
            <h2>Pengumuman</h2>
            <div className="action-buttons">
              <button className="btn-edit">
                <i className="fas fa-edit"></i>
                <span>Edit</span>
              </button>
              <button className="btn-add">
                <i className="fas fa-plus"></i>
                <span>Tambah</span>
              </button>
            </div>
          </div>

          <div className="announcements-container">
            <div className="announcement-box">
              <div className="announcement-content">
                <h4>Announcement #1</h4>
                <div className="scrollable-content">
                  <p>{announcementText}</p>
                </div>
              </div>
            </div>

            <div className="announcement-box">
              <div className="announcement-content">
                <h4>Announcement #2</h4>
                <div className="scrollable-content">
                  <p>{announcementText}</p>
                </div>
              </div>
            </div>

            <div className="announcement-box">
              <div className="announcement-content">
                <h4>Announcement #3</h4>
                <div className="scrollable-content">
                  <p>{announcementText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <aside className="dashboard-sidebar">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input" 
            />
        </div>

        <div className="calendar-widget">
            <Calender />
        </div>        <div className="online-users-widget">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>Online User</h3>
            <button 
              onClick={fetchOnlineUsers}
              disabled={loading}
              style={{
                background: 'none',
                border: 'none',
                color: '#8b2d0e',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                opacity: loading ? 0.6 : 1
              }}
              title="Refresh"
            >
              🔄
            </button>
          </div>
          
          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '8px',
              borderRadius: '4px',
              marginBottom: '10px',
              fontSize: '12px'
            }}>
              {error}
            </div>
          )}
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Loading...
            </div>
          ) : (
            <ul className="online-users-list">
              {onlineUsers.length === 0 ? (
                <li style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  No online users
                </li>
              ) : (                onlineUsers.map((user, index) => (
                  <li key={user.id || index} className="online-user-item">
                    <div className="user-avatar">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <div className="username">{user.username}</div>
                      <div className="nim">
                        <span className="id-label">
                          {getRoleLabel(user.role)}:
                        </span>
                        {getDisplayId(user)}
                      </div>
                      <div className={`user-role ${user.role || 'admin'}`}>
                        {user.role || 'admin'}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </aside>
    </div>
  )
}

export default DashboardAdmin
