import React, { useContext, useState } from 'react';
import { PoojaContext } from '../context/PoojaContext';
import { Flower2, Search, ArrowRight, ShieldCheck, Clock, Award, Star } from 'lucide-react';

export default function LandingPage() {
  const { pujas, setActiveRole, pandits } = useContext(PoojaContext);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchPuja, setSearchPuja] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect user to user dashboard and apply filters
    setActiveRole('user');
  };

  const handleBookClick = () => {
    setActiveRole('user');
  };

  return (
    <div style={{ minHeight: '80vh' }}>
      
      {/* Hero Banner Section */}
      <section className="hero-gradient" style={{ padding: '80px 0 100px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212, 175, 55, 0.15)', padding: '6px 16px', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.3)', marginBottom: '24px' }}>
            <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
            <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
              100% Verified Vedic Scholars
            </span>
          </div>

          <h2 style={{ 
            color: '#FFFFFF', 
            fontSize: '44px', 
            lineHeight: '1.2', 
            marginBottom: '18px',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Bring Sacred Blessings Into Your Home
          </h2>
          
          <p style={{ 
            color: 'rgba(255,255,255,0.85)', 
            fontSize: '18px', 
            marginBottom: '40px',
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Discover, compare, and book verified, traditional Pandits for all religious rituals with complete transparency in pricing, materials, and schedules.
          </p>

          {/* Landing page search widget */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="glass-card" 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              padding: '16px', 
              maxWidth: '700px', 
              margin: '0 auto',
              alignItems: 'center',
              flexWrap: 'wrap',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(22, 25, 51, 0.15)', minWidth: '200px' }}>
              <MapPin size={18} style={{ color: 'var(--accent-gold)' }} />
              <input 
                type="text" 
                placeholder="Enter City (e.g. Mumbai)" 
                value={searchLocation} 
                onChange={(e) => setSearchLocation(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'var(--font-family-sans)', fontSize: '15px' }}
              />
            </div>

            <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(22, 25, 51, 0.15)', minWidth: '200px' }}>
              <Flower2 size={18} style={{ color: 'var(--accent-gold)' }} />
              <select 
                value={searchPuja}
                onChange={(e) => setSearchPuja(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'var(--font-family-sans)', fontSize: '15px', color: searchPuja ? 'var(--text-dark)' : 'var(--text-muted)' }}
              >
                <option value="">Select Ritual / Puja</option>
                {pujas.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ flex: 1, minWidth: '130px', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Search size={16} /> Find Pandit
            </button>
          </form>

        </div>
      </section>

      {/* Core Advantages section */}
      <section style={{ padding: '60px 0', background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '28px', color: 'var(--primary-indigo)' }}>Puja Booking, Simplified</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>Eliminating the hurdles of personal references and unstandardized costs.</p>
          </div>

          <div className="grid-3">
            {/* Feature 1 */}
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ 
                background: 'rgba(212, 175, 55, 0.1)', 
                color: 'var(--accent-gold)', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <ShieldCheck size={28} />
              </div>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>100% Verified Scholars</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
                Every Pandit undergoes verification check of their background, qualifications, and Sanskrit recitation standards.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ 
                background: 'rgba(212, 175, 55, 0.1)', 
                color: 'var(--accent-gold)', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Award size={28} />
              </div>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Standardized Dakshina</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
                No more bargaining or last minute price shocks. Standard pricing set based on ritual complexity, duration, and custom requirements.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ 
                background: 'rgba(212, 175, 55, 0.1)', 
                color: 'var(--accent-gold)', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Clock size={28} />
              </div>
              <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Flexible Scheduling</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
                Secure bookings weeks in advance or pick available slots based on auspicious Shubh Muhurats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Pujas Catalog */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '28px', color: 'var(--primary-indigo)' }}>Explore Sacred Rituals</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>Standard lists of materials and transparent fee structures.</p>
            </div>
            <button className="btn btn-outline" onClick={handleBookClick} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Browse Catalog <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-3">
            {pujas.slice(0, 3).map((puja) => (
              <div key={puja.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ padding: '24px', flex: 1 }}>
                  <span className="badge badge-confirmed" style={{ marginBottom: '12px' }}>{puja.locationType}</span>
                  <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>{puja.name}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5', height: '63px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {puja.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(22,25,51,0.05)', paddingTop: '16px', fontSize: '13px' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Duration</span>
                      <strong style={{ color: 'var(--primary-indigo)' }}>{puja.duration}</strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Price Range</span>
                      <strong style={{ color: 'var(--accent-orange)' }}>{puja.priceRange}</strong>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '0 24px 24px 24px' }}>
                  <button 
                    onClick={handleBookClick}
                    className="btn btn-secondary" 
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    View Pandits
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '28px', color: 'var(--primary-indigo)' }}>What Devotees Say</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>Real experiences from users who booked their ceremony via PujaConnect.</p>
          </div>

          <div className="grid-3" style={{ gap: '20px' }}>
            {[
              {
                quote: "Booking Pandit Rajesh Shastri for our Griha Pravesh was a seamless experience. He arrived on time, was extremely professional, and explained the significance of each ritual. Absolute transparency!",
                user: "Aditya & Ritu Deshmukh",
                location: "Mumbai",
                rating: 5
              },
              {
                quote: "I was struggling to find a Kannada-speaking priest in Delhi for my son's Naamkaran. Through PujaConnect, I was matched with an expert priest who conducted the ceremony flawlessly.",
                user: "Meenakshi Iyengar",
                location: "Delhi NCR",
                rating: 5
              },
              {
                quote: "The standardized puja list was extremely helpful. I knew exactly what items to purchase and the pricing was clear right from the start. No awkward negotiation calls needed.",
                user: "Rahul Goel",
                location: "Bengaluru",
                rating: 5
              }
            ].map((t, idx) => (
              <div key={idx} style={{ 
                padding: '24px', 
                background: 'var(--bg-sand)', 
                borderRadius: '16px', 
                border: '1px solid rgba(22, 25, 51, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-dark)', fontStyle: 'italic', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>
                  "{t.quote}"
                </p>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: 'var(--primary-indigo)' }}>{t.user}</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// Inline Helper
function MapPin({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
