import React, { createContext, useState, useEffect } from 'react';

export const PoojaContext = createContext();

// Core seed data
const initialPujas = [
  {
    id: 'puja-1',
    name: 'Satyanarayan Puja',
    description: 'Lord Vishnu worship for peace, prosperity, and family well-being. Usually performed on Full Moon (Purnima) days or special occasions.',
    duration: '2.5 Hours',
    materials: 'Panchamrit, Banana tree leaves, Tulsi leaves, coconuts, flowers, fruits, standard havan samagri.',
    priceRange: '₹3,100 - ₹5,100',
    locationType: 'Home / Temple',
    minPrice: 3100
  },
  {
    id: 'puja-2',
    name: 'Griha Pravesh',
    description: 'Housewarming ceremony to purify the new home and protect it from negative energies. Includes Vastu puja and fire ritual (Havan).',
    duration: '3.5 Hours',
    materials: 'Copper Kalash, coconut, milk, gangajal, threshold decorations, wood for havan, ghee.',
    priceRange: '₹5,100 - ₹11,000',
    locationType: 'Home Only',
    minPrice: 5100
  },
  {
    id: 'puja-3',
    name: 'Havan / Yagna',
    description: 'Sacred fire ritual performed to cleanse the environment, seek blessings from deities, and invoke positive vibes.',
    duration: '2 Hours',
    materials: 'Havan Kund (fire pit), dry wood, ghee, camphor, 108 herbs samagri mixture, dry coconut.',
    priceRange: '₹3,100 - ₹7,500',
    locationType: 'Home / Temple / Office',
    minPrice: 3100
  },
  {
    id: 'puja-4',
    name: 'Mundan Ceremony',
    description: 'First tonsure (shaving of the head) of a child. Symbolizes purification, health, and letting go of past-life attachments.',
    duration: '1.5 Hours',
    materials: 'Turmeric paste, sandalwood powder, new set of clothes for the baby, gangajal.',
    priceRange: '₹1,500 - ₹3,500',
    locationType: 'Home / Temple',
    minPrice: 1500
  },
  {
    id: 'puja-5',
    name: 'Naamkaran',
    description: 'Traditional child naming ceremony performed with Vedic chants, blessings from elders, and astrologically chosen alphabets.',
    duration: '2 Hours',
    materials: 'Honey, ghee, rice grains in a bronze plate, new cradle decoration, sweets, flowers.',
    priceRange: '₹2,500 - ₹5,000',
    locationType: 'Home / Temple',
    minPrice: 2500
  }
];

const initialPandits = [
  {
    id: 'pandit-1',
    name: 'Pandit Rajesh Shastri',
    location: 'Mumbai',
    experience: 15,
    languages: ['Sanskrit', 'Hindi', 'Marathi'],
    supportedRituals: ['Satyanarayan Puja', 'Griha Pravesh', 'Havan / Yagna'],
    pricing: {
      'Satyanarayan Puja': 3500,
      'Griha Pravesh': 7500,
      'Havan / Yagna': 4500
    },
    rating: 4.9,
    bio: 'Varanasi trained Vedic scholar with 15+ years experience conducting grand Pujas and family ceremonies. Expert in Vastu Shastra and Janam Kundli analysis.',
    isVerified: true,
    reviews: [
      { id: 'r-1', user: 'Vikas Sharma', rating: 5, date: '2026-06-12', comment: 'Very professional, explained every ritual and mantra clearly. Highly recommended!' },
      { id: 'r-2', user: 'Sunita Joshi', rating: 5, date: '2026-06-28', comment: 'Conducted our Griha Pravesh perfectly. He was on time and carried all necessary samagri.' }
    ]
  },
  {
    id: 'pandit-2',
    name: 'Pandit Ananthakrishnan',
    location: 'Bengaluru',
    experience: 20,
    languages: ['Kannada', 'Tamil', 'Sanskrit', 'Hindi'],
    supportedRituals: ['Griha Pravesh', 'Havan / Yagna', 'Naamkaran'],
    pricing: {
      'Griha Pravesh': 8500,
      'Havan / Yagna': 5000,
      'Naamkaran': 3500
    },
    rating: 4.8,
    bio: 'Traditional South Indian priest specializing in Vedic homas, marriage rituals, and child ceremonies. Dedicated to preserving authentic Vedic recitation.',
    isVerified: true,
    reviews: [
      { id: 'r-3', user: 'Ramesh Krishnan', rating: 5, date: '2026-05-15', comment: 'Perfect pronunciation of Sanskrit mantras. The Havan created a very positive atmosphere.' }
    ]
  },
  {
    id: 'pandit-3',
    name: 'Pandit Vidhyadhar Pathak',
    location: 'Delhi NCR',
    experience: 10,
    languages: ['Hindi', 'Sanskrit', 'English'],
    supportedRituals: ['Satyanarayan Puja', 'Mundan Ceremony', 'Havan / Yagna'],
    pricing: {
      'Satyanarayan Puja': 3100,
      'Mundan Ceremony': 2100,
      'Havan / Yagna': 4000
    },
    rating: 4.7,
    bio: 'Tech-friendly modern pandit explaining the scientific and psychological significance of rituals to the younger generation. Graduated from Gurukul Haridwar.',
    isVerified: true,
    reviews: [
      { id: 'r-4', user: 'Aman Verma', rating: 4, date: '2026-07-02', comment: 'Great approach. Explains everything in English too, which helped my kids understand the Mundan ceremony.' }
    ]
  }
];

const initialBookings = [
  {
    id: 'booking-101',
    userId: 'user-default',
    userName: 'Arya Patel',
    userPhone: '+91 98765 43210',
    panditId: 'pandit-1',
    panditName: 'Pandit Rajesh Shastri',
    pujaName: 'Satyanarayan Puja',
    date: '2026-07-08',
    time: '09:30',
    location: 'Andheri West, Mumbai',
    locationType: 'Home',
    price: 3500,
    status: 'Completed',
    createdAt: '2026-07-05T10:30:00Z'
  },
  {
    id: 'booking-102',
    userId: 'user-default',
    userName: 'Arya Patel',
    userPhone: '+91 98765 43210',
    panditId: 'pandit-2',
    panditName: 'Pandit Ananthakrishnan',
    pujaName: 'Griha Pravesh',
    date: '2026-07-22',
    time: '08:00',
    location: 'Indiranagar, Bengaluru',
    locationType: 'Home',
    price: 8500,
    status: 'Confirmed',
    createdAt: '2026-07-12T14:15:00Z'
  }
];

export const PoojaProvider = ({ children }) => {
  const [activeRole, setActiveRole] = useState('landing'); // landing, user, pandit, admin
  const [loggedInUser, setLoggedInUser] = useState({
    id: 'user-default',
    name: 'Arya Patel',
    email: 'arya.patel@example.com',
    phone: '+91 98765 43210'
  });
  
  // Loaded from localStorage or fallback to seeds
  const [pujas, setPujas] = useState(() => {
    const saved = localStorage.getItem('pc_pujas');
    return saved ? JSON.parse(saved) : initialPujas;
  });

  const [pandits, setPandits] = useState(() => {
    const saved = localStorage.getItem('pc_pandits');
    return saved ? JSON.parse(saved) : initialPandits;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('pc_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('pc_notifications');
    return saved ? JSON.parse(saved) : [
      { id: 'n-1', text: 'Welcome to PujaConnect! Discover and book verified Pandits online.', read: false, time: 'Just now' }
    ];
  });

  // Track active logged-in Pandit ID (for simulating Pandit role dashboard)
  const [currentPanditId, setCurrentPanditId] = useState(() => {
    const saved = localStorage.getItem('pc_current_pandit_id');
    return saved || 'pandit-1'; // Default to Pandit Rajesh Shastri for ease of preview
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('pc_pujas', JSON.stringify(pujas));
  }, [pujas]);

  useEffect(() => {
    localStorage.setItem('pc_pandits', JSON.stringify(pandits));
  }, [pandits]);

  useEffect(() => {
    localStorage.setItem('pc_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('pc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('pc_current_pandit_id', currentPanditId);
  }, [currentPanditId]);

  // Actions
  const addNotification = (text) => {
    const newNotif = {
      id: `n-${Date.now()}`,
      text,
      read: false,
      time: '1m ago'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const bookPuja = (panditId, pujaName, date, time, location, locationType, price) => {
    const pandit = pandits.find(p => p.id === panditId);
    const newBooking = {
      id: `booking-${Date.now()}`,
      userId: loggedInUser.id,
      userName: loggedInUser.name,
      userPhone: loggedInUser.phone,
      panditId,
      panditName: pandit ? pandit.name : 'Unknown Pandit',
      pujaName,
      date,
      time,
      location,
      locationType,
      price: Number(price),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    addNotification(`Your booking for ${pujaName} with ${newBooking.panditName} has been submitted!`);
    
    // Add alert notification for the Pandit too (simulated)
    return newBooking;
  };

  const registerPandit = (panditData) => {
    const newPanditId = `pandit-${Date.now()}`;
    const newPandit = {
      id: newPanditId,
      name: panditData.name,
      location: panditData.location,
      experience: Number(panditData.experience),
      languages: panditData.languages,
      supportedRituals: panditData.supportedRituals,
      pricing: panditData.pricing,
      rating: 5.0,
      bio: panditData.bio,
      isVerified: false, // Needs Admin approval
      reviews: []
    };

    setPandits(prev => [...prev, newPandit]);
    setCurrentPanditId(newPanditId);
    addNotification(`Pandit registration submitted! Awaiting Admin verification.`);
    return newPandit;
  };

  const approvePandit = (panditId) => {
    setPandits(prev => prev.map(p => {
      if (p.id === panditId) {
        addNotification(`Pandit ${p.name} has been verified and approved!`);
        return { ...p, isVerified: true };
      }
      return p;
    }));
  };

  const rejectPandit = (panditId) => {
    setPandits(prev => prev.filter(p => p.id !== panditId));
    addNotification(`Pandit application rejected.`);
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        addNotification(`Booking for ${b.pujaName} has been marked as ${newStatus}.`);
        return { ...b, status: newStatus };
      }
      return b;
    }));
  };

  const addPuja = (pujaData) => {
    const newPuja = {
      id: `puja-${Date.now()}`,
      name: pujaData.name,
      description: pujaData.description,
      duration: pujaData.duration,
      materials: pujaData.materials,
      priceRange: pujaData.priceRange,
      locationType: pujaData.locationType,
      minPrice: Number(pujaData.minPrice || 1000)
    };

    setPujas(prev => [...prev, newPuja]);
    addNotification(`New ritual "${pujaData.name}" added to public catalog.`);
  };

  const addReview = (panditId, reviewerName, ratingValue, comment) => {
    setPandits(prev => prev.map(p => {
      if (p.id === panditId) {
        const updatedReviews = [
          {
            id: `r-${Date.now()}`,
            user: reviewerName,
            rating: Number(ratingValue),
            date: new Date().toISOString().split('T')[0],
            comment
          },
          ...p.reviews
        ];
        // Calculate new average rating
        const total = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const newRating = Number((total / updatedReviews.length).toFixed(1));
        
        return {
          ...p,
          reviews: updatedReviews,
          rating: newRating
        };
      }
      return p;
    }));
    addNotification(`Review submitted for Pandit.`);
  };

  // KPIs Engine
  const getAdminKPIs = () => {
    const totalUsers = 120 + bookings.map(b => b.userId).filter((v, i, a) => a.indexOf(v) === i).length;
    const verifiedPandits = pandits.filter(p => p.isVerified).length;
    const pendingPandits = pandits.filter(p => !p.isVerified).length;
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    const activeBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length;
    
    // Completion rate
    const completionRate = totalBookings > 0 
      ? Math.round(((completedBookings + bookings.filter(b => b.status === 'Confirmed').length) / totalBookings) * 100) 
      : 100;
      
    // Cancellation rate
    const cancellationRate = totalBookings > 0
      ? Math.round((bookings.filter(b => b.status === 'Rejected').length / totalBookings) * 100)
      : 0;

    return {
      totalUsers,
      verifiedPandits,
      pendingPandits,
      totalBookings,
      activeBookings,
      completionRate,
      cancellationRate,
      avgBookingTime: '12 Mins'
    };
  };

  return (
    <PoojaContext.Provider value={{
      activeRole,
      setActiveRole,
      loggedInUser,
      setLoggedInUser,
      pujas,
      pandits,
      bookings,
      notifications,
      currentPanditId,
      setCurrentPanditId,
      bookPuja,
      registerPandit,
      approvePandit,
      rejectPandit,
      updateBookingStatus,
      addPuja,
      addReview,
      getAdminKPIs,
      addNotification,
      clearNotifications,
      markNotificationsAsRead
    }}>
      {children}
    </PoojaContext.Provider>
  );
};
