import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import Venues from './pages/venues';
import Venue from './pages/venue';
import Account from './pages/account';
import NotFound from './pages/not-found';
import Layout from './components/Layout';
import VenueFormPage from './pages/venue-edit';
import ManageVenues from './pages/manage';


export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venue/manage" element={<ManageVenues />} />
          <Route path="/venue/create" element={<VenueFormPage mode="create" />} />
          <Route path="/venue/edit/:id" element={<VenueFormPage mode="edit" />} />
          <Route path="/venue/:id" element={<Venue />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

