import React, { useState, useEffect, useContext } from 'react';
import AuthModal from '../Auth/AuthModal';
import './nav.css';
import { Link, NavLink } from 'react-router-dom';
import localStorageHandling from '../../utility/localStorageHandling';
import { AuthContext } from '../../context/AuthContext';
const Nav = () => {
	const { isLoggedIn, setIsLoggedIn, isVenueManager } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
	  setIsMobileMenuOpen(!isMobileMenuOpen);
	};
	const getNavLinkClass = ({ isActive }) =>
		isActive ? 'navbar-link active' : 'navbar-link';

	useEffect(() => {
		const userData = localStorage.getItem('userData');
		if (userData) {
			setIsLoggedIn(true);
		}
	}, [setIsLoggedIn]);
	const openModal = () => {
		setShowModal(true);
	};
	const closeModal = () => {
		setShowModal(false);
	};
	const handleLogout = () => {
		localStorage.removeItem('userData');
		setIsLoggedIn(false);
		window.location.reload();
	};
	return (
		<nav data-role="Header" className="navbar">
			<div className="logo">Holidaze</div>
			<div className="nav-center">
				<div className="nav-links-container">
					<NavLink to="/" className={getNavLinkClass}>
						Home
					</NavLink>
					<NavLink to="/Venues" className={getNavLinkClass}>
						Venues
					</NavLink>
				</div>
			</div>
			{isLoggedIn ? (
				<div className="logged-in-nav">
					{isVenueManager && (
						<Link to="/venue/create" className="create-venue"></Link>
					)}
					<Link to="/account" className="profile-avatar-link">
						<img
							src={localStorageHandling.getAvatarUrl()}
							alt="Profile Avatar"
							className="profile-avatar"
						/>
					</Link>
					<button
						type="button"
						className="button logout-button"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			) : (
				<div className="logged-out">
					<button type="button" className="button sign-in-nav" onClick={openModal}>
						Sign in
					</button>
				</div>
			)}
			<AuthModal showModal={showModal} close={closeModal} />
			<div
				data-role="BurgerMenu"
				className="nav-burger-menu"
				onClick={toggleMobileMenu}
			>
				{/* Burger menu SVG */}
			</div>
			<div
				data-role="MobileMenu"
				className={`nav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
			>
				{/* Existing code for your mobile menu */}
				<div
					data-role="CloseMobileMenu"
					className="nav-close-menu"
					onClick={toggleMobileMenu}
				>
					{/* Close menu SVG */}
				</div>
			</div>
		</nav>
	);
};
export default Nav;
