import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import createBooking from '../../../utility/api/createBooking';
import 'react-datepicker/dist/react-datepicker.css';
import './booking.css';
const Booking = ({ venue }) => {
  const [formData, setFormData] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
    guests: 0,
    venueId: venue.id
  });
    const bookedDateRanges = venue.bookings.map(booking => ({
      start: new Date(booking.dateFrom),
      end: new Date(booking.dateTo)
  }));
  const isDateInRange = (date, range) => {
      return date >= range.start && date <= range.end;
  };
  const isDateSelectable = (date) => {
      return !bookedDateRanges.some(range => isDateInRange(date, range));
  };
  const handleDateChange = (dates) => {
      const [start, end] = dates;
      setFormData({ ...formData, dateFrom: start, dateTo: end });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
        ...formData,
        dateFrom: formData.dateFrom.toISOString(),
        dateTo: formData.dateTo.toISOString(),
        guests: parseInt(formData.guests, 10)
    };
    console.log(bookingData)
    if (bookingData.dateFrom && bookingData.dateTo && bookingData.guests > 0) {
        console.log('Form data submitted:', bookingData);
        try {
          const { isSuccessful, data } = await createBooking(bookingData);
          if (isSuccessful) {
                console.log('Booking successful', data);
                window.location.reload();
            } else {
                console.error('Booking failed:', isSuccessful.statusText);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    } else {
        console.error('Invalid booking data');
    }
};
  return (
      <div className="booking-container">
          <form onSubmit={handleSubmit}>
              <DatePicker
                  selectsRange
                  startDate={formData.dateFrom}
                  endDate={formData.dateTo}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  filterDate={isDateSelectable}
                  inline
              />
              <input
                  type="number"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  min="1"
                  placeholder="Number of Guests"
              />
              <button type="submit">Book Now</button>
          </form>
      </div>
  );
};
export default Booking;