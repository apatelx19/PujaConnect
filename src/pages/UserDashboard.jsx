import React, { useContext, useState } from 'react';
import { PoojaContext } from '../context/PoojaContext';
import { Search, Star, Languages, Award, MapPin, Calendar, Clock, Clipboard, MessageSquarePlus } from 'lucide-react';
import PanditDetailModal from '../components/PanditDetailModal';

export default function UserDashboard() {
  const { pandits, bookings, pujas, addReview } = useContext(PoojaContext);
  
  // Search & Filter state
  const [filterLocation, setFilterLocation] = useState('');
  const [filterRitual, setFilterRitual] = useState('');
  const [filterLang, setFilterLang] = useState('');
  const [filterExp, setFilterExp] = useState(0);

  // Selected Pandit for modal detail
  const [selectedPandit, setSelectedPandit] = useState(null);
  
  // Review form states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewPanditId, setReviewPanditId] = useState('');
  const [reviewPanditName, setReviewPanditName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Extract unique locations and languages for filter options
  const locations = ['Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune'];
  const languagesList = ['Sanskrit', 'Hindi', 'Marathi', 'Kannada', 'Tamil', 'English'];

  // Filter logic
  const filteredPandits = pandits.filter(p => {
    if (!p.isVerified) return false; // Users can only book verified Pandits
    if (filterLocation && p.location.toLowerCase() !== filterLocation.toLowerCase()) return false;
    if (filterRitual && !p.supportedRituals.includes(filterRitual)) return false;
    if (filterLang && !p.languages.includes(filterLang)) return false;
    if (filterExp && p.experience < filterExp) return false;
    return true;
  });

  const handleOpenReview = (booking) => {
    setReviewPanditId(booking.panditId);
    setReviewPanditName(booking.panditName);
    setRating(5);
    setComment('');
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview(reviewPanditId, 'Arya Patel', rating, comment);
    setShowReviewModal(false);
  };

  // Get user specific bookings
  const userBookings = bookings.filter(b => b.userId === 'user-default');

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      
      {/* Welcome Header */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '26px' }}>Welcome, Arya Patel</h3>
        <p style={{ color: 'var(--text-muted)' }}>Find trusted priests for your spiritual events and track your booking requests.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Side: Filter Sidebar */}
        <aside className="glass-card" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={18} style={{ color: 'var(--accent-gold)' }} /> Search Filters
          </h4>
          
          <div className="form-group">
            <label className="form-label">City / Location</label>
            <select 
              className="form-control"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Puja Type</label>
            <select 
              className="form-control"
              value={filterRitual}
              onChange={(e) => setFilterRitual(e.target.value)}
            >
              <option value="">All Pujas</option>
              {pujas.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Language Spoken</label>
            <select 
              className="form-control"
              value={filterLang}
              onChange={(e) => setFilterLang(e.target.value)}
            >
              <option value="">Any Language</option>
              {languagesList.map((lang, idx) => (
                <option key={idx} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Min. Experience (Years)</label>
            <select 
              className="form-control"
              value={filterExp}
              onChange={(e) => setFilterExp(Number(e.target.value))}
            >
              <option value={0}>Any Experience</option>
              <option value={5}>5+ Years</option>
              <option value={10}>10+ Years</option>
              <option value={15}>15+ Years</option>
            </select>
          </div>

          <button 
            className="btn btn-outline btn-sm" 
            style={{ width: '100%', marginTop: '10px' }}
            onClick={() => {
              setFilterLocation('');
              setFilterRitual('');
              setFilterLang('');
              setFilterExp(0);
            }}
          >
            Clear All Filters
          </button>
        </aside>

        {/* Right Side: Tab Contents (Pandit List & My Bookings) */}
        <div>
          
          {/* Dashboard Tabs */}
          <div style={{ display: 'flex', gap: '20px', borderBottom: '2px solid rgba(22, 25, 51, 0.08)', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '20px', paddingBottom: '12px', borderBottom: '3px solid var(--accent-gold)', marginBottom: '-2px' }}>
              Verified Pandits ({filteredPandits.length})
            </h4>
          </div>

          {/* Pandit Cards Grid */}
          {filteredPandits.length === 0 ? (
            <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(22, 25, 51, 0.08)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>No verified Pandits match your filter parameters. Try expanding your search options.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredPandits.map((pandit) => (
                <div 
                  key={pandit.id} 
                  className="glass-card" 
                  style={{ display: 'flex', gap: '24px', padding: '24px', alignItems: 'center', flexWrap: 'wrap' }}
                >
                  {/* Left Avatar Icon placeholder */}
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    background: 'var(--accent-gold)', 
                    color: 'var(--primary-indigo)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {pandit.name.split(' ').slice(1).map(n => n[0]).join('') || 'PT'}
                  </div>

                  {/* Mid details */}
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ fontSize: '18px', margin: 0 }}>{pandit.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Star size={12} fill="var(--accent-gold)" color="var(--accent-gold)" />
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{pandit.rating}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '14px', fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 10px 0' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} /> {pandit.location}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Award size={13} /> {pandit.experience} Years Exp
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Languages size={13} /> {pandit.languages.join(', ')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {pandit.supportedRituals.map((ritual, idx) => (
                        <span key={idx} style={{ background: 'var(--bg-sand)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' }}>
                          {ritual}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Price & CTA */}
                  <div style={{ textAlign: 'right', minWidth: '150px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Dakshina starts from</span>
                    <strong style={{ fontSize: '20px', color: 'var(--primary-indigo)', display: 'block', margin: '2px 0 12px 0' }}>
                      ₹{Math.min(...Object.values(pandit.pricing)).toLocaleString()}
                    </strong>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      onClick={() => setSelectedPandit(pandit)}
                    >
                      View Details & Book
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Booking History Section */}
          <div style={{ marginTop: '48px' }}>
            <h4 style={{ fontSize: '20px', borderBottom: '2px solid rgba(22, 25, 51, 0.08)', paddingBottom: '12px', marginBottom: '24px' }}>
              My Booking History
            </h4>

            {userBookings.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)', border: '1px solid rgba(22, 25, 51, 0.05)' }}>
                No booking requests submitted yet.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Ritual</th>
                      <th>Pandit</th>
                      <th>Date & Time</th>
                      <th>Fees</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userBookings.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: '600', fontSize: '13px' }}>#{b.id.split('-')[1] || b.id}</td>
                        <td style={{ fontWeight: '600' }}>{b.pujaName}</td>
                        <td>{b.panditName}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: '500' }}>{b.date}</span>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.time}</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 'bold' }}>₹{b.price.toLocaleString()}</td>
                        <td>
                          <span className={`badge badge-${b.status.toLowerCase()}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          {b.status === 'Completed' ? (
                            <button 
                              className="btn btn-outline btn-sm" 
                              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px' }}
                              onClick={() => handleOpenReview(b)}
                            >
                              <MessageSquarePlus size={12} /> Write Review
                            </button>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Pandit Profile Details & Booking Modal */}
      {selectedPandit && (
        <PanditDetailModal 
          pandit={selectedPandit} 
          onClose={() => setSelectedPandit(null)} 
        />
      )}

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px 30px', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', margin: 0 }}>Review {reviewPanditName}</h3>
              <button 
                onClick={() => setShowReviewModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label className="form-label">Select Star Rating</label>
                <div style={{ display: 'flex', gap: '8px', margin: '8px 0' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setRating(star)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <Star 
                        size={28} 
                        fill={star <= rating ? 'var(--accent-gold)' : 'none'} 
                        color={star <= rating ? 'var(--accent-gold)' : '#BDC3C7'} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Feedback Comments</label>
                <textarea 
                  rows="4" 
                  className="form-control" 
                  placeholder="Share your experience (e.g. mantra pronunciation, explanations, punctuality)..."
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '12px 0' }}>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline Helper
function X({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}
