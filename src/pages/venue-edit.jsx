import React from 'react';
import { useParams } from 'react-router-dom';
import CreateVenueForm from '../components/CreateVenue/CreateVenue';


function VenueFormPage({ mode }) {
  const { id } = useParams();
  return (
    <div>
      {mode === 'create' && <CreateVenueForm isEditMode={false} />}
      {mode === 'edit' && <CreateVenueForm isEditMode={true} id={id} />}
    </div>
  );
}

export default VenueFormPage;



//////////////// NEED TO FIX MEDIADATA IN EDIT FORM