import React, { useContext, useState } from 'react';
import { PoojaContext } from '../context/PoojaContext';
import { Bell, Flower2, ShieldAlert, Award, UserCheck, Trash2 } from 'lucide-react';

export default function Navbar() {
  const { 
    activeRole, 
    setActiveRole, 
    notifications, 
    clearNotifications, 
    markNotificationsAsRead, 
    loggedInUser,
    pandits,
    currentPanditId
  } = useContext(PoojaContext);

  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const currentPandit = pandits.find(p => p.id === currentPanditId);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setShowNotifications(false);
  };

  const handleNotifClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      markNotificationsAsRead();
    }
  };

  return (
    <header className="glass-navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '75px' }}>
        
        {/* Logo and Branding */}
        <div 
          onClick={() => handleRoleChange('landing')} 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{ 
            background: 'var(--accent-gold)', 
            padding: '8px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
          }}>
            <Flower2 size={24} className="animate-spin-slow" style={{ color: 'var(--primary-indigo)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', letterSpacing: '0.5px', color: '#FFFFFF', margin: 0 }}>
              Puja<span style={{ color: 'var(--accent-gold)' }}>Connect</span>
            </h1>
            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', display: 'block', marginTop: '-3px' }}>
              Vedic Pandit Booking
            </span>
          </div>
        </div>

        {/* Role Switcher - Interactive for Prototyping */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          <div style={{ 
            display: 'flex', 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '4px', 
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <button 
              className={`btn btn-sm ${activeRole === 'landing' ? 'btn-primary' : ''}`}
              onClick={() => handleRoleChange('landing')}
              style={{ borderRadius: '20px', background: activeRole === 'landing' ? 'var(--accent-gold)' : 'transparent', color: activeRole === 'landing' ? 'var(--primary-indigo)' : '#ffffff', border: 'none', padding: '6px 14px' }}
            >
              Home
            </button>
            <button 
              className={`btn btn-sm ${activeRole === 'user' ? 'btn-primary' : ''}`}
              onClick={() => handleRoleChange('user')}
              style={{ borderRadius: '20px', background: activeRole === 'user' ? 'var(--accent-gold)' : 'transparent', color: activeRole === 'user' ? 'var(--primary-indigo)' : '#ffffff', border: 'none', padding: '6px 14px' }}
            >
              User Portal
            </button>
            <button 
              className={`btn btn-sm ${activeRole === 'pandit' ? 'btn-primary' : ''}`}
              onClick={() => handleRoleChange('pandit')}
              style={{ borderRadius: '20px', background: activeRole === 'pandit' ? 'var(--accent-gold)' : 'transparent', color: activeRole === 'pandit' ? 'var(--primary-indigo)' : '#ffffff', border: 'none', padding: '6px 14px' }}
            >
              Pandit Portal
            </button>
            <button 
              className={`btn btn-sm ${activeRole === 'admin' ? 'btn-primary' : ''}`}
              onClick={() => handleRoleChange('admin')}
              style={{ borderRadius: '20px', background: activeRole === 'admin' ? 'var(--accent-gold)' : 'transparent', color: activeRole === 'admin' ? 'var(--primary-indigo)' : '#ffffff', border: 'none', padding: '6px 14px' }}
            >
              Admin
            </button>
          </div>

          {/* User info Badge / Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Notifications Button */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={handleNotifClick}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '40px', 
                  height: '40px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                  position: 'relative'
                }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{ 
                    position: 'absolute', 
                    top: '-2px', 
                    right: '-2px', 
                    background: 'var(--accent-orange)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '18px', 
                    height: '18px', 
                    fontSize: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    boxShadow: '0 0 5px rgba(230, 126, 34, 0.5)'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Drawer */}
              {showNotifications && (
                <div style={{ 
                  position: 'absolute', 
                  top: '50px', 
                  right: 0, 
                  background: '#FFFFFF', 
                  width: '320px', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(22, 25, 51, 0.1)',
                  zIndex: 2000,
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    background: 'var(--primary-indigo)', 
                    color: '#FFFFFF', 
                    padding: '12px 16px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>Inbox Notifications</span>
                    {notifications.length > 0 && (
                      <button 
                        onClick={clearNotifications}
                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
                      >
                        <Trash2 size={12} /> Clear all
                      </button>
                    )}
                  </div>
                  <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                        No new notifications
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          style={{ 
                            padding: '12px 16px', 
                            borderBottom: '1px solid rgba(22, 25, 51, 0.05)',
                            fontSize: '13px',
                            background: n.read ? '#FFFFFF' : 'rgba(212, 175, 55, 0.05)'
                          }}
                        >
                          <p style={{ margin: 0, color: 'var(--text-dark)' }}>{n.text}</p>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                            {n.time}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Info Tag */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(255,255,255,0.08)',
              padding: '6px 14px 6px 8px',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                background: 'var(--accent-gold)', 
                color: 'var(--primary-indigo)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                {activeRole === 'admin' ? <ShieldAlert size={16} /> : activeRole === 'pandit' ? <Award size={16} /> : <UserCheck size={16} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#FFFFFF', lineHeight: 1 }}>
                  {activeRole === 'admin' ? 'Admin Mode' : activeRole === 'pandit' ? (currentPandit ? currentPandit.name : 'Pandit Portal') : loggedInUser.name}
                </span>
                <span style={{ fontSize: '9px', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '2px' }}>
                  {activeRole === 'admin' ? 'Superuser' : activeRole === 'pandit' ? 'Priest' : 'Client'}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}
