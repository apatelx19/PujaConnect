import React from 'react';
import { Flower2, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--primary-indigo)', 
      color: '#FFFFFF', 
      padding: '50px 0 20px 0',
      borderTop: '3px solid var(--accent-gold)',
      marginTop: '60px'
    }}>
      <div className="container">
        <div className="grid-3" style={{ marginBottom: '40px' }}>
          
          {/* Col 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Flower2 size={24} style={{ color: 'var(--accent-gold)' }} />
              <h3 style={{ color: '#FFFFFF', fontSize: '18px', margin: 0 }}>PujaConnect</h3>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', maxWidth: '320px', lineHeight: '1.6' }}>
              A service-based digital platform enabling families to discover, compare, and book verified, expert Pandits for religious ceremonies. Ensuring transparent pricing, ritual details, and convenience.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: 'var(--accent-gold)', fontSize: '16px', marginBottom: '16px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '8px' }}>
              Popular Rituals
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Satyanarayan Katha', 'Griha Pravesh Vastu', 'Maha Havan / Yagna', 'Naamkaran Puja', 'Mundan Ceremony'].map((link, idx) => (
                <li key={idx} style={{ marginBottom: '10px' }}>
                  <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                     onMouseOver={(e) => e.target.style.color = 'var(--accent-gold)'}
                     onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 style={{ color: 'var(--accent-gold)', fontSize: '16px', marginBottom: '16px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '8px' }}>
              Help & Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>Haridwar, Varanasi & Mumbai Hubs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>+91 98765 43210 (Mon-Sat, 9AM - 6PM)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>support@pujaconnect.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
          paddingTop: '20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
          <span>© {new Date().getFullYear()} PujaConnect. All rights reserved. Built with devotion and care.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Pandit Code of Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
