import React, { useState, useContext } from 'react';
import { PoojaContext } from '../context/PoojaContext';
import { X, Star, Calendar, Clock, MapPin, CheckCircle, Info, Languages, Award } from 'lucide-react';

export default function PanditDetailModal({ pandit, onClose }) {
  const { bookPuja, pujas } = useContext(PoojaContext);
  const [activeTab, setActiveTab] = useState('profile'); // profile, reviews, book
  
  // Booking Form State
  const [selectedPuja, setSelectedPuja] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [locationType, setLocationType] = useState('Home');
  const [bookedStatus, setBookedStatus] = useState(false);
  const [errors, setErrors] = useState({});

  if (!pandit) return null;

  // Find price range or specific price
  const selectedPujaObj = selectedPuja ? pujas.find(p => p.name === selectedPuja) : null;
  const price = selectedPuja ? (pandit.pricing[selectedPuja] || selectedPujaObj?.minPrice || 3000) : 0;

  const validate = () => {
    const tempErrors = {};
    if (!selectedPuja) tempErrors.selectedPuja = "Please select a ritual to book.";
    if (!date) tempErrors.date = "Please select a date.";
    if (!time) tempErrors.time = "Please select a time slot.";
    if (!address) tempErrors.address = "Please enter the venue address.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    bookPuja(pandit.id, selectedPuja, date, time, address, locationType, price);
    setBookedStatus(true);
  };

  const handleClose = () => {
    // Reset booking state
    setSelectedPuja('');
    setDate('');
    setTime('');
    setAddress('');
    setLocationType('Home');
    setBookedStatus(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ padding: 0, maxWidth: '650px' }}
      >
        {/* Header Banner */}
        <div style={{ 
          background: 'var(--primary-indigo)', 
          color: 'white', 
          padding: '24px 30px', 
          borderTopLeftRadius: '19px', 
          borderTopRightRadius: '19px',
          position: 'relative'
        }}>
          <button 
            onClick={handleClose} 
            style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '20px', 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: 'white', 
              borderRadius: '50%', 
              width: '36px', 
              height: '36px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer' 
            }}
          >
            <X size={18} />
          </button>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ 
              width: '70px', 
              height: '70px', 
              borderRadius: '50%', 
              background: 'var(--accent-gold)', 
              color: 'var(--primary-indigo)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '24px', 
              fontWeight: 'bold' 
            }}>
              {pandit.name.split(' ').slice(1).map(n => n[0]).join('') || 'PT'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ color: 'white', fontSize: '22px', margin: 0 }}>{pandit.name}</h2>
                <span className="badge badge-verified" style={{ background: '#E8F8F5', color: '#117A65', fontSize: '10px' }}>
                  Verified
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  <span style={{ fontWeight: 'bold' }}>{pandit.rating}</span>
                </div>
                <span>•</span>
                <span>{pandit.experience} Years Exp</span>
                <span>•</span>
                <span>{pandit.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        {!bookedStatus && (
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(22, 25, 51, 0.08)' }}>
            <button 
              onClick={() => setActiveTab('profile')} 
              style={{ 
                flex: 1, 
                padding: '16px 0', 
                background: 'none', 
                border: 'none', 
                borderBottom: activeTab === 'profile' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                color: activeTab === 'profile' ? 'var(--primary-indigo)' : 'var(--text-muted)',
                fontWeight: '600',
                cursor: 'pointer' 
              }}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('reviews')} 
              style={{ 
                flex: 1, 
                padding: '16px 0', 
                background: 'none', 
                border: 'none', 
                borderBottom: activeTab === 'reviews' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                color: activeTab === 'reviews' ? 'var(--primary-indigo)' : 'var(--text-muted)',
                fontWeight: '600',
                cursor: 'pointer' 
              }}
            >
              Reviews ({pandit.reviews.length})
            </button>
            <button 
              onClick={() => setActiveTab('book')} 
              style={{ 
                flex: 1, 
                padding: '16px 0', 
                background: 'none', 
                border: 'none', 
                borderBottom: activeTab === 'book' ? '3px solid var(--accent-gold)' : '3px solid transparent',
                color: activeTab === 'book' ? 'var(--primary-indigo)' : 'var(--text-muted)',
                fontWeight: '600',
                cursor: 'pointer' 
              }}
            >
              Book Ritual
            </button>
          </div>
        )}

        {/* Tab Contents */}
        <div style={{ padding: '24px 30px', overflowY: 'auto', maxHeight: '55vh' }}>
          
          {bookedStatus ? (
            /* Booking Success view */
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ 
                background: '#E8F8F5', 
                color: '#27AE60', 
                width: '72px', 
                height: '72px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <CheckCircle size={40} />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Booking Request Sent!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
                Your request to book <strong>{selectedPuja}</strong> with <strong>{pandit.name}</strong> has been submitted. The Pandit will review the slot and accept or reschedule shortly.
              </p>
              <div style={{ 
                background: 'var(--bg-sand)', 
                padding: '16px', 
                borderRadius: '12px', 
                textAlign: 'left',
                maxWidth: '440px',
                margin: '0 auto 30px auto',
                border: '1px dashed rgba(22, 25, 51, 0.15)',
                fontSize: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
                  <span style={{ fontWeight: '600' }}>{date} at {time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Location Type:</span>
                  <span style={{ fontWeight: '600' }}>{locationType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Address:</span>
                  <span style={{ fontWeight: '600', maxWidth: '250px', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{address}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(22,25,51,0.08)' }}>
                  <span style={{ fontWeight: '600' }}>Dakshina (Fees):</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--primary-indigo)' }}>₹{price.toLocaleString()}</span>
                </div>
              </div>
              <button className="btn btn-secondary" onClick={handleClose}>Close Window</button>
            </div>
          ) : activeTab === 'profile' ? (
            /* Profile Tab */
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Biography</h4>
                <p style={{ color: 'var(--text-dark)', fontSize: '15px', lineHeight: 1.6 }}>{pandit.bio}</p>
              </div>

              <div className="grid-2" style={{ marginBottom: '24px', gap: '16px' }}>
                <div style={{ background: 'var(--bg-sand)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--primary-indigo)', fontWeight: '600' }}>
                    <Languages size={18} /> Languages Spoken
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {pandit.languages.map((l, i) => (
                      <span key={i} style={{ background: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', border: '1px solid rgba(22, 25, 51, 0.08)' }}>
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-sand)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--primary-indigo)', fontWeight: '600' }}>
                    <Award size={18} /> Credentials & Verification
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    Certified Vedic Scholar • Identity Verified • Temple/Samiti References Checked • Standardised Dakshina.
                  </p>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Offered Pujas & Pricing</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pandit.supportedRituals.map((ritual, idx) => {
                    const rObj = pujas.find(p => p.name === ritual);
                    return (
                      <div key={idx} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '14px 16px', 
                        background: '#FFFFFF', 
                        border: '1px solid rgba(22, 25, 51, 0.08)',
                        borderRadius: '8px'
                      }}>
                        <div>
                          <span style={{ fontWeight: '600', fontSize: '15px' }}>{ritual}</span>
                          <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)' }}>Duration: {rObj?.duration || '2-3 Hours'}</span>
                        </div>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary-indigo)' }}>₹{(pandit.pricing[ritual] || rObj?.minPrice || 3000).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : activeTab === 'reviews' ? (
            /* Reviews Tab */
            <div>
              {pandit.reviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
                  No reviews submitted yet. Be the first to leave a review after your booking!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {pandit.reviews.map(r => (
                    <div key={r.id} style={{ 
                      padding: '16px', 
                      background: 'var(--bg-sand)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(22, 25, 51, 0.05)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '600', fontSize: '14px' }}>{r.user}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < r.rating ? 'var(--accent-gold)' : 'none'} 
                              color={i < r.rating ? 'var(--accent-gold)' : '#BDC3C7'} 
                            />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-dark)' }}>"{r.comment}"</p>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                        {r.date}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Booking Form Tab */
            <form onSubmit={handleBookingSubmit}>
              <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid var(--border-glass)', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', gap: '12px' }}>
                <Info size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '13px', color: 'var(--text-dark)', margin: 0 }}>
                  You are booking a verified priest. Ensure that you have arranged the standard ritual samagri (materials), or request the Pandit to source it during coordination.
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Select Ritual / Puja</label>
                <select 
                  className="form-control" 
                  value={selectedPuja} 
                  onChange={(e) => {
                    setSelectedPuja(e.target.value);
                    if (errors.selectedPuja) setErrors(prev => ({ ...prev, selectedPuja: null }));
                  }}
                >
                  <option value="">-- Choose ritual --</option>
                  {pandit.supportedRituals.map((r, i) => (
                    <option key={i} value={r}>{r}</option>
                  ))}
                </select>
                {errors.selectedPuja && <span style={{ color: '#E74C3C', fontSize: '12px' }}>{errors.selectedPuja}</span>}
              </div>

              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={date} 
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (errors.date) setErrors(prev => ({ ...prev, date: null }));
                    }} 
                  />
                  {errors.date && <span style={{ color: '#E74C3C', fontSize: '12px' }}>{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Time Slot</label>
                  <select 
                    className="form-control" 
                    value={time} 
                    onChange={(e) => {
                      setTime(e.target.value);
                      if (errors.time) setErrors(prev => ({ ...prev, time: null }));
                    }}
                  >
                    <option value="">-- Select time --</option>
                    <option value="06:00 AM">Morning (06:00 AM)</option>
                    <option value="08:00 AM">Morning (08:00 AM)</option>
                    <option value="10:30 AM">Morning (10:30 AM)</option>
                    <option value="03:00 PM">Afternoon (03:00 PM)</option>
                    <option value="05:30 PM">Evening (05:30 PM)</option>
                  </select>
                  {errors.time && <span style={{ color: '#E74C3C', fontSize: '12px' }}>{errors.time}</span>}
                </div>
              </div>

              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Location Type</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {['Home', 'Temple', 'Office'].map((type) => (
                      <label key={type} style={{ 
                        flex: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: '6px', 
                        padding: '12px', 
                        border: '1px solid rgba(22, 25, 51, 0.15)', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        background: locationType === type ? 'rgba(212,175,55,0.08)' : 'white',
                        borderColor: locationType === type ? 'var(--accent-gold)' : 'rgba(22, 25, 51, 0.15)'
                      }}>
                        <input 
                          type="radio" 
                          name="locationType" 
                          value={type} 
                          checked={locationType === type} 
                          onChange={() => setLocationType(type)}
                          style={{ accentColor: 'var(--accent-gold)' }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-sand)', padding: '16px', borderRadius: '12px', height: '69px', marginTop: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Estimated Price:</span>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary-indigo)' }}>
                      ₹{selectedPuja ? price.toLocaleString() : '0'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Address (Venue Details)</label>
                <textarea 
                  rows="3" 
                  className="form-control" 
                  placeholder="Enter house/office number, street, landmark, and city details..."
                  value={address} 
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors(prev => ({ ...prev, address: null }));
                  }}
                ></textarea>
                {errors.address && <span style={{ color: '#E74C3C', fontSize: '12px' }}>{errors.address}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-secondary" 
                style={{ width: '100%', padding: '14px 0', marginTop: '10px' }}
              >
                Send Booking Request
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
