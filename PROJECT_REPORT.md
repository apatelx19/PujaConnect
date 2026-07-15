# Project Report: PujaConnect – Online Pandit & Puja Booking Platform

**Prepared for:** Frontend Development Internship Evaluation  
**Project Name:** PujaConnect (PoojaApp)  
**Developer:** Arya Patel  
**Tech Stack:** React (Vite), JavaScript, Custom CSS, LocalStorage Database Engine  

---

## 1. Executive Summary
PujaConnect is a digital, service-based web platform designed to streamline the process of discovering, comparing, and booking verified Pandits (priests) for Hindu religious rituals (e.g., Satyanarayan Katha, Griha Pravesh, Havan, Mundan). By replacing traditional, fragmented channels (such as word-of-mouth references or manual telephone scheduling) with a structured, transparent, and multi-role portal, the platform empowers devotees while providing verified priests with digital tooling to manage their bookings and schedules.

---

## 2. Problem Statement
Traditionally, booking a priest for religious ceremonies is highly unorganized, relying primarily on:
* **Personal references or local temple contacts**, limiting selection options.
* **Lack of standardized pricing**, leading to arbitrary charges and negotiations.
* **No central calendar visibility**, causing scheduling conflicts and last-minute cancellations.
* **Opaque ritual material (samagri) guidelines**, causing confusion for devotees.

**PujaConnect resolves these points** by standardizing pricing per ritual, displaying verified reviews, managing calendars, and displaying precise lists of required materials for each ritual.

---

## 3. System Architecture & Database
To run as a self-contained, high-fidelity application requiring zero external database installation (making it instantly reviewable by evaluators), PujaConnect implements a **Clientside Relational Data Engine** via **React Context** persisted in `localStorage`. 

### Core Entities:
1. **Users:** Holds profiles of devotees (e.g. name, contact info, booking history).
2. **Pandits:** Profile details (bio, experience, verified status, languages, custom ritual pricing, reviews).
3. **Pujas (Ritual Catalog):** Global catalog containing standard durations, descriptions, required materials, and baseline price brackets.
4. **Bookings:** Relational documents tracking customer details, priest matches, date, time slots, address, status, and fee.

---

## 4. Portals & Feature Map

### A. Landing Page
* **Sacred Vedic Aesthetic:** High-fidelity theme designed with deep indigo, sand, and gold tones.
* **Quick Search Widget:** Users can instantly input location and choose a ritual to find available priests.
* **Popular Puja Grid & Testimonials:** Displays top catalog offerings and historical devotee feedback.

### B. User Portal (Devotee Interface)
* **Search & Filters:** Search verified priests by location (city), experience years, languages spoken, and ritual capability.
* **Interactive Booking Stepper:** Click on any Pandit to view their full profile, read reviews, and select date/time/location type (Home, Office, Temple) to send a request.
* **Booking Tracker:** View ongoing request statuses (`Pending`, `Confirmed`, `Completed`, `Rejected`).
* **Devotee Review System:** Write star ratings and comments for completed ceremonies.

### C. Pandit Portal (Priest Interface)
* **Digital Onboarding Wizard:** Unregistered priests can input details (name, experience, languages, bio, and set custom pricing for selected rituals) to submit their profile.
* **Verification Banner:** Alerts the priest if their profile is still pending admin approval.
* **Incoming Request Queue:** Accept or reject booking requests in real time.
* **Calendar Schedule:** Access lists of confirmed upcoming rituals.

### D. Admin Portal (Operations Room)
* **Live System KPIs:** Counters tracking total registered users, verified priests, active bookings, and system completion/cancellation rates.
* **Verification Queue:** Review pending Pandit applications, read bios, and click "Approve & Verify" or "Reject".
* **Catalog Manager:** Expand the public catalog by adding new rituals, setting durations, required materials, and price caps.
* **Global Bookings Tracker:** View all transactions and statuses on the platform.

---

## 5. Deployment & Execution
The application is pre-compiled for production and is running locally at **http://localhost:5173/**. 

### To deploy to production (Vite build):
1. **GitHub Pages:**
   * Install `gh-pages` dependency.
   * Add `"predeploy": "npm run build"`, `"deploy": "gh-pages -d dist"` to `package.json` scripts.
   * Run `npm run deploy`.
2. **Vercel / Netlify:**
   * Import the GitHub repository into Vercel and configure build settings to point to `dist`.
