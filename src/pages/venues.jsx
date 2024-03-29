import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import VenueCard from '../components/VenueComponents/Venue-Card/Venue-Card';
import './venues.css';
import getVenueData from '../utility/api/fetchVenueData';
import VenueFilter from '../components/VenueComponents/VenueFilter/VenueFilter';
import PaginationComponent from '../components/VenueComponents/Pagination/Pagination';
import VenueManagementPanel from '../components/VenueComponents/VenueManagement/VenueManager';
import { AuthContext } from '../context/AuthContext';
const Venues = () => {
	const [venueData, setVenueData] = useState([]);
	const [filters, setFilters] = useState({ sortOrder: 'desc', sortField: 'name' });
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const defaultItemsPerPage = 10;
    const searchItemsPerPage = 100; // A higher number when searching
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
	const { isVenueManager, isLoggedIn } = useContext(AuthContext);
	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
		if (newFilters.searchQuery !== undefined) {
            setSearchTerm(newFilters.searchQuery);
            setItemsPerPage(searchTerm ? searchItemsPerPage : defaultItemsPerPage);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (!isLoggedIn) {
				return;
			}

			try {
				const data = await getVenueData('', currentPage, itemsPerPage, filters);
				if (Array.isArray(data)) {
					setVenueData(data);
				} else {
					console.error('venueData is not an array:', data);
				}
			} catch (error) {
				console.error('Error fetching venue data:', error);
			}
		};

		fetchData();
	}, [filters, currentPage, itemsPerPage, isLoggedIn]);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};
	const filteredVenueData = venueData.filter(venue =>
		venue.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<Helmet>
				<title>HoliDaze | Venues</title>
			</Helmet>
			{isLoggedIn ? (
				<>
					<div className="top-section">
						<p>Find your Venue</p>
						<VenueFilter onFilterChange={handleFilterChange} />
					</div>
					{isVenueManager && <VenueManagementPanel />}
					<div className="row">
						<div className="venues">
							<div className="header">
								<h1>Our Venues</h1>
								<PaginationComponent
									currentPage={currentPage}
									onPageChange={handlePageChange}
								/>
							</div>
							<div className="venue-cards-container">
								{filteredVenueData.map((venue) => (
									<VenueCard key={venue.id} venue={venue} />
								))}
							</div>
							<PaginationComponent
								currentPage={currentPage}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				</>
			) : (
				<div className="not-logged-in">
					<p>You must be logged in to see this page.</p>
				</div>
			)}
		</div>
	);
};
export default Venues;
