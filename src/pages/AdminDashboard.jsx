import React, { useContext, useState } from 'react';
import { PoojaContext } from '../context/PoojaContext';
import { Users, ShieldCheck, Calendar, CheckSquare, Plus, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const { 
    pandits, 
    bookings, 
    pujas, 
    approvePandit, 
    rejectPandit, 
    addPuja, 
    getAdminKPIs 
  } = useContext(PoojaContext);

  const kpis = getAdminKPIs();

  // Onboarding queue
  const pendingPandits = pandits.filter(p => !p.isVerified);

  // New Puja Form State
  const [showAddPuja, setShowAddPuja] = useState(false);
  const [pujaName, setPujaName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [materials, setMaterials] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [locationType, setLocationType] = useState('Home / Temple');
  const [formError, setFormError] = useState('');

  const handleAddPujaSubmit = (e) => {
    e.preventDefault();
    if (!pujaName || !description || !duration || !materials || !minPrice || !maxPrice) {
      setFormError("All fields are required to create a new ritual.");
      return;
    }

    addPuja({
      name: pujaName,
      description,
      duration,
      materials,
      priceRange: `₹${Number(minPrice).toLocaleString()} - ₹${Number(maxPrice).toLocaleString()}`,
      locationType,
      minPrice: Number(minPrice)
    });

    // Reset Form
    setPujaName('');
    setDescription('');
    setDuration('');
    setMaterials('');
    setMinPrice('');
    setMaxPrice('');
    setLocationType('Home / Temple');
    setFormError('');
    setShowAddPuja(false);
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      
      {/* Admin Panel Welcome */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '26px' }}>Operations Control Room</h3>
        <p style={{ color: 'var(--text-muted)' }}>Monitor system KPIs, verify service providers, manage category catalogs, and view disputes.</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="kpi-grid">
        
        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL USERS</span>
              <h4 style={{ fontSize: '24px', marginTop: '4px', color: 'var(--primary-indigo)' }}>{kpis.totalUsers}</h4>
            </div>
            <Users size={24} style={{ color: 'var(--primary-indigo)', opacity: 0.6 }} />
          </div>
        </div>

        <div className="kpi-card gold-bar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>VERIFIED PRIESTS</span>
              <h4 style={{ fontSize: '24px', marginTop: '4px', color: 'var(--accent-gold)' }}>{kpis.verifiedPandits}</h4>
            </div>
            <ShieldCheck size={24} style={{ color: 'var(--accent-gold)', opacity: 0.8 }} />
          </div>
          {kpis.pendingPandits > 0 && (
            <span style={{ fontSize: '11px', color: 'var(--accent-orange)', display: 'block', marginTop: '6px', fontWeight: '600' }}>
              ⚠️ {kpis.pendingPandits} Action Required
            </span>
          )}
        </div>

        <div className="kpi-card orange-bar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>ACTIVE BOOKINGS</span>
              <h4 style={{ fontSize: '24px', marginTop: '4px', color: 'var(--accent-orange)' }}>{kpis.activeBookings}</h4>
            </div>
            <Calendar size={24} style={{ color: 'var(--accent-orange)', opacity: 0.8 }} />
          </div>
        </div>

        <div className="kpi-card green-bar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>COMPLETION RATE</span>
              <h4 style={{ fontSize: '24px', marginTop: '4px', color: '#27AE60' }}>{kpis.completionRate}%</h4>
            </div>
            <CheckSquare size={24} style={{ color: '#27AE60', opacity: 0.8 }} />
          </div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Side: Verification queue & Booking list logs */}
        <div>
          
          {/* Pandit Onboarding Verification Queue */}
          <section style={{ marginBottom: '40px' }}>
            <h4 style={{ fontSize: '20px', borderBottom: '2px solid rgba(22,25,51,0.08)', paddingBottom: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Pandit Verification Queue ({pendingPandits.length})
            </h4>

            {pendingPandits.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(22, 25, 51, 0.05)', color: 'var(--text-muted)', fontSize: '14px' }}>
                No pending profiles for verification.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {pendingPandits.map((pandit) => (
                  <div key={pandit.id} className="glass-card" style={{ padding: '24px', border: '1px solid rgba(230,126,34,0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <span className="badge badge-pending" style={{ marginBottom: '6px' }}>Pending Audit</span>
                        <h5 style={{ fontSize: '18px', margin: 0 }}>{pandit.name}</h5>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Location: {pandit.location} • Experience: {pandit.experience} Years</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Languages</span>
                        <span style={{ display: 'block', fontSize: '14px', fontWeight: '500' }}>{pandit.languages.join(', ')}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '14px', color: 'var(--text-dark)', margin: '12px 0 16px 0', padding: '12px', background: 'var(--bg-sand)', borderRadius: '8px', borderLeft: '3px solid var(--accent-gold)' }}>
                      <strong>Vedic Bio:</strong> "{pandit.bio}"
                    </p>

                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary-indigo)' }}>Supported Pujas & pricing:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                        {pandit.supportedRituals.map((r, idx) => (
                          <span key={idx} style={{ background: '#FFFFFF', border: '1px solid rgba(22,25,51,0.08)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px' }}>
                            {r}: <strong>₹{pandit.pricing[r]?.toLocaleString() || '3,000'}</strong>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button 
                        className="btn btn-outline btn-sm" 
                        onClick={() => rejectPandit(pandit.id)}
                        style={{ color: '#E74C3C', borderColor: '#E74C3C', padding: '8px 16px' }}
                      >
                        Reject
                      </button>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => approvePandit(pandit.id)}
                        style={{ padding: '8px 16px', background: '#27AE60', color: 'white' }}
                      >
                        Approve & Verify Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Global Bookings Log list */}
          <section>
            <h4 style={{ fontSize: '20px', borderBottom: '2px solid rgba(22,25,51,0.08)', paddingBottom: '12px', marginBottom: '20px' }}>
              System Global Bookings Log ({bookings.length})
            </h4>

            {bookings.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No bookings on the platform.</p>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer Details</th>
                      <th>Priest Match</th>
                      <th>Ritual Info</th>
                      <th>Dakshina</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: '600', fontSize: '13px' }}>#{b.id.split('-')[1] || b.id}</td>
                        <td>
                          <div>
                            <span style={{ fontWeight: '600' }}>{b.userName}</span>
                            <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>{b.userPhone}</span>
                          </div>
                        </td>
                        <td>{b.panditName}</td>
                        <td>
                          <div>
                            <span style={{ fontWeight: '600' }}>{b.pujaName}</span>
                            <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>{b.date} • {b.time}</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 'bold' }}>₹{b.price.toLocaleString()}</td>
                        <td>
                          <span className={`badge badge-${b.status.toLowerCase()}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </div>

        {/* Right Side: Puja catalog manager */}
        <aside>
          
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={18} style={{ color: 'var(--accent-gold)' }} /> Puja Catalog
              </h4>
              <button 
                onClick={() => setShowAddPuja(!showAddPuja)}
                style={{ 
                  background: 'var(--accent-gold)', 
                  border: 'none', 
                  borderRadius: '4px', 
                  color: 'var(--primary-indigo)', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                <Plus size={16} />
              </button>
            </div>

            {showAddPuja ? (
              /* Add Puja Form */
              <form onSubmit={handleAddPujaSubmit} style={{ border: '1px solid rgba(22,25,51,0.08)', padding: '16px', borderRadius: '8px', marginBottom: '16px', background: 'var(--bg-sand)' }}>
                <h5 style={{ fontSize: '14px', marginBottom: '12px' }}>Add New Ritual Type</h5>
                
                {formError && <p style={{ color: '#E74C3C', fontSize: '12px', marginBottom: '10px' }}>{formError}</p>}

                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label">Puja / Ritual Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Maha Shivratri Puja"
                    value={pujaName} 
                    onChange={(e) => setPujaName(e.target.value)} 
                    style={{ padding: '8px 12px' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label">Ritual Description</label>
                  <textarea 
                    rows="2" 
                    className="form-control" 
                    placeholder="Brief purpose..."
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    style={{ padding: '8px 12px' }}
                  ></textarea>
                </div>

                <div className="grid-2" style={{ gap: '10px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Duration</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. 2 Hours"
                      value={duration} 
                      onChange={(e) => setDuration(e.target.value)} 
                      style={{ padding: '8px 12px' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Location</label>
                    <select 
                      className="form-control"
                      value={locationType}
                      onChange={(e) => setLocationType(e.target.value)}
                      style={{ padding: '8px 12px' }}
                    >
                      <option value="Home / Temple">Home / Temple</option>
                      <option value="Home Only">Home Only</option>
                      <option value="Temple Only">Temple Only</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '10px', marginBottom: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Min Fee (₹)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="2100"
                      value={minPrice} 
                      onChange={(e) => setMinPrice(e.target.value)} 
                      style={{ padding: '8px 12px' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Max Fee (₹)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="5100"
                      value={maxPrice} 
                      onChange={(e) => setMaxPrice(e.target.value)} 
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Required Materials List</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Kalash, coconut, leaves, gangajal..."
                    value={materials} 
                    onChange={(e) => setMaterials(e.target.value)} 
                    style={{ padding: '8px 12px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-sm" 
                    onClick={() => setShowAddPuja(false)}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-secondary btn-sm" 
                    style={{ flex: 1 }}
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : null}

            {/* Catalog List display */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pujas.map((p) => (
                <div key={p.id} style={{ padding: '12px', border: '1px solid rgba(22,25,51,0.06)', borderRadius: '8px', background: '#FFFFFF' }}>
                  <strong style={{ fontSize: '13px', display: 'block', color: 'var(--primary-indigo)' }}>{p.name}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                    Range: {p.priceRange} • Duration: {p.duration}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}
