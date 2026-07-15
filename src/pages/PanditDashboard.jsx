import React, { useContext, useState } from 'react';
import { PoojaContext } from '../context/PoojaContext';
import { Calendar, Clock, MapPin, Check, X, ShieldAlert, ShieldCheck, Languages, Award, Plus, Trash2 } from 'lucide-react';

export default function PanditDashboard() {
  const { 
    pandits, 
    bookings, 
    pujas, 
    currentPanditId, 
    registerPandit, 
    updateBookingStatus 
  } = useContext(PoojaContext);

  // Check if current pandit exists
  const currentPandit = pandits.find(p => p.id === currentPanditId);

  // Onboarding Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Mumbai');
  const [experience, setExperience] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedRituals, setSelectedRituals] = useState([]);
  const [pricing, setPricing] = useState({});
  const [bio, setBio] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const availableLanguages = ['Sanskrit', 'Hindi', 'Marathi', 'Kannada', 'Tamil', 'English', 'Gujarati', 'Bengali'];

  const handleLangCheckbox = (lang) => {
    if (languages.includes(lang)) {
      setLanguages(prev => prev.filter(l => l !== lang));
    } else {
      setLanguages(prev => [...prev, lang]);
    }
  };

  const handleRitualCheckbox = (ritualName) => {
    if (selectedRituals.includes(ritualName)) {
      setSelectedRituals(prev => prev.filter(r => r !== ritualName));
      // Remove from pricing map too
      const temp = { ...pricing };
      delete temp[ritualName];
      setPricing(temp);
    } else {
      setSelectedRituals(prev => [...prev, ritualName]);
      // Default to minimum price of that ritual
      const rObj = pujas.find(p => p.name === ritualName);
      setPricing(prev => ({
        ...prev,
        [ritualName]: rObj?.minPrice || 3000
      }));
    }
  };

  const handlePriceChange = (ritualName, value) => {
    setPricing(prev => ({
      ...prev,
      [ritualName]: Number(value)
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Full Name is required.";
    if (!experience || Number(experience) <= 0) errors.experience = "Please enter a valid experience in years.";
    if (languages.length === 0) errors.languages = "Select at least one language.";
    if (selectedRituals.length === 0) errors.selectedRituals = "Select at least one ritual you can perform.";
    if (!bio || bio.length < 30) errors.bio = "Bio must be at least 30 characters long.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    registerPandit({
      name,
      location,
      experience,
      languages,
      supportedRituals: selectedRituals,
      pricing,
      bio
    });
  };

  if (!currentPandit) {
    /* If currentPanditId is invalid or not registered, show Onboarding Form */
    return (
      <div className="container" style={{ padding: '40px 24px', maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px' }}>Pandit Registration Portal</h2>
          <p style={{ color: 'var(--text-muted)' }}>Onboard digitally as a verified service provider to receive bookings directly.</p>
        </div>

        <form className="glass-card" style={{ padding: '36px' }} onSubmit={handleOnboardingSubmit}>
          
          <div className="form-group">
            <label className="form-label">Full Name (with Title, e.g. Pandit Ramesh Shastri)</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Pandit..."
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            {formErrors.name && <span style={{ color: '#E74C3C', fontSize: '12px' }}>{formErrors.name}</span>}
          </div>

          <div className="grid-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Location / City Hub</label>
              <select 
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Years of Vedic Experience</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 12"
                value={experience} 
                onChange={(e) => setExperience(e.target.value)} 
              />
              {formErrors.experience && <span style={{ color: '#E74C3C', fontSize: '12px' }}>{formErrors.experience}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Languages Spoken (Select all that apply)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px', marginTop: '8px' }}>
              {availableLanguages.map((lang, idx) => (
                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
                  <input 
                    type="checkbox" 
                    checked={languages.includes(lang)} 
                    onChange={() => handleLangCheckbox(lang)}
                    style={{ accentColor: 'var(--accent-gold)' }}
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
            {formErrors.languages && <span style={{ color: '#E74C3C', fontSize: '12px', display: 'block', marginTop: '6px' }}>{formErrors.languages}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Supported Pujas & pricing (₹)</label>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>Select the rituals you are qualified to perform and enter your fee (Dakshina) in Rupees.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pujas.map((p) => {
                const isChecked = selectedRituals.includes(p.name);
                return (
                  <div key={p.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: isChecked ? 'rgba(212,175,55,0.05)' : 'white',
                    border: '1px solid rgba(22, 25, 51, 0.12)',
                    borderRadius: '8px'
                  }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1 }}>
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={() => handleRitualCheckbox(p.name)}
                        style={{ accentColor: 'var(--accent-gold)' }}
                      />
                      <span style={{ fontWeight: '500', fontSize: '14px' }}>{p.name}</span>
                    </label>
                    
                    {isChecked && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Fee: ₹</span>
                        <input 
                          type="number" 
                          className="form-control"
                          style={{ width: '100px', padding: '6px 10px' }}
                          value={pricing[p.name] || ''}
                          onChange={(e) => handlePriceChange(p.name, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {formErrors.selectedRituals && <span style={{ color: '#E74C3C', fontSize: '12px', display: 'block', marginTop: '6px' }}>{formErrors.selectedRituals}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Professional Biography & Qualifications</label>
            <textarea 
              rows="4" 
              className="form-control" 
              placeholder="Explain where you trained (e.g. Gurukul, Varanasi, under specific gurus), your expertise, and how you conduct your services..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            {formErrors.bio && <span style={{ color: '#E74C3C', fontSize: '12px' }}>{formErrors.bio}</span>}
          </div>

          <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '14px 0', marginTop: '10px' }}>
            Submit Profile for Approval
          </button>
        </form>
      </div>
    );
  }

  // If already onboarded, render Pandit Dashboard
  const myBookings = bookings.filter(b => b.panditId === currentPandit.id);
  const pendingRequests = myBookings.filter(b => b.status === 'Pending');
  const confirmedSchedule = myBookings.filter(b => b.status === 'Confirmed');

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      
      {/* Pandit Profile Welcome Panel */}
      <div className="glass-card" style={{ 
        padding: '30px', 
        marginBottom: '32px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '20px',
        background: 'radial-gradient(circle at top right, rgba(212,175,55,0.08), rgba(22,25,51,0.02))'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 style={{ fontSize: '24px', margin: 0 }}>Namaste, {currentPandit.name}</h3>
            {currentPandit.isVerified ? (
              <span className="badge badge-verified" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> Verified Pandit
              </span>
            ) : (
              <span className="badge badge-pending" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldAlert size={12} /> Verification Pending
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: '6px' }}>Manage ritual bookings and schedule auspicious ceremonies.</p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ background: '#FFFFFF', padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(22,25,51,0.08)', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Rating</span>
            <strong style={{ fontSize: '18px', color: 'var(--primary-indigo)' }}>★ {currentPandit.rating}</strong>
          </div>
          <div style={{ background: '#FFFFFF', padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(22,25,51,0.08)', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Completed</span>
            <strong style={{ fontSize: '18px', color: 'var(--primary-indigo)' }}>{myBookings.filter(b => b.status === 'Completed').length}</strong>
          </div>
        </div>
      </div>

      {!currentPandit.isVerified && (
        <div style={{ 
          background: '#FEF9E7', 
          color: '#D35400', 
          padding: '16px 20px', 
          borderRadius: '12px', 
          border: '1px solid #FADBD8',
          marginBottom: '32px',
          fontSize: '14px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <ShieldAlert size={20} />
          <span>
            <strong>Verification In Progress:</strong> Your profile is currently under review by our Admin team. You will be able to receive customer booking requests once verified. Switch to <strong>Admin Mode</strong> in the top navbar to approve yourself!
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Side: Booking queues */}
        <div>
          
          {/* Booking requests */}
          <section style={{ marginBottom: '40px' }}>
            <h4 style={{ fontSize: '20px', borderBottom: '2px solid rgba(22,25,51,0.08)', paddingBottom: '12px', marginBottom: '20px' }}>
              Pending Booking Requests ({pendingRequests.length})
            </h4>

            {pendingRequests.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(22, 25, 51, 0.05)', color: 'var(--text-muted)', fontSize: '14px' }}>
                No active booking requests.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {pendingRequests.map((req) => (
                  <div key={req.id} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div>
                        <span className="badge badge-pending" style={{ fontSize: '9px', marginBottom: '6px' }}>Request</span>
                        <h5 style={{ fontSize: '16px', margin: 0 }}>{req.pujaName}</h5>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>By: {req.userName} ({req.userPhone})</span>
                      </div>
                      <strong style={{ fontSize: '18px', color: 'var(--primary-indigo)' }}>₹{req.price.toLocaleString()}</strong>
                    </div>

                    <div style={{ 
                      background: 'var(--bg-sand)', 
                      padding: '12px', 
                      borderRadius: '8px', 
                      display: 'flex', 
                      gap: '16px', 
                      fontSize: '13px', 
                      marginBottom: '16px',
                      color: 'var(--text-dark)',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} style={{ color: 'var(--accent-gold)' }} />
                        <span>{req.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} style={{ color: 'var(--accent-gold)' }} />
                        <span>{req.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} style={{ color: 'var(--accent-gold)' }} />
                        <span>{req.location} ({req.locationType})</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => updateBookingStatus(req.id, 'Rejected')}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <X size={14} /> Reject
                      </button>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => updateBookingStatus(req.id, 'Confirmed')}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#27AE60', color: 'white' }}
                      >
                        <Check size={14} /> Accept Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Upcoming Schedule */}
          <section>
            <h4 style={{ fontSize: '20px', borderBottom: '2px solid rgba(22,25,51,0.08)', paddingBottom: '12px', marginBottom: '20px' }}>
              Confirmed Upcoming Ceremonies ({confirmedSchedule.length})
            </h4>

            {confirmedSchedule.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(22, 25, 51, 0.05)', color: 'var(--text-muted)', fontSize: '14px' }}>
                No upcoming ceremonies scheduled.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Devotee Name</th>
                      <th>Ritual</th>
                      <th>Schedule</th>
                      <th>Venue</th>
                      <th>Fees</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedSchedule.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: '600' }}>
                          <div>
                            <span>{b.userName}</span>
                            <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>{b.userPhone}</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: '600' }}>{b.pujaName}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: '500' }}>{b.date}</span>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.time}</span>
                          </div>
                        </td>
                        <td>{b.location}</td>
                        <td style={{ fontWeight: 'bold' }}>₹{b.price.toLocaleString()}</td>
                        <td>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => updateBookingStatus(b.id, 'Completed')}
                            style={{ padding: '6px 12px' }}
                          >
                            Mark Completed
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </div>

        {/* Right Side: Profile settings and reviews list */}
        <aside>
          
          {/* Services list */}
          <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '14px' }}>Offered Pujas & Pricing</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {currentPandit.supportedRituals.map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(22,25,51,0.05)', paddingBottom: '8px', fontSize: '13px' }}>
                  <span style={{ fontWeight: '500' }}>{r}</span>
                  <strong style={{ color: 'var(--primary-indigo)' }}>₹{currentPandit.pricing[r]?.toLocaleString() || '3,000'}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews feedback */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '14px' }}>Devotee Feedback</h4>
            {currentPandit.reviews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>No reviews received yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {currentPandit.reviews.map(r => (
                  <div key={r.id} style={{ borderBottom: '1px solid rgba(22,25,51,0.05)', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600' }}>
                      <span>{r.user}</span>
                      <span style={{ color: 'var(--accent-gold)' }}>★ {r.rating}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-dark)', margin: '4px 0 0 0', fontStyle: 'italic' }}>
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </aside>

      </div>

    </div>
  );
}
