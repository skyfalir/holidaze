import React from 'react';
import Nav  from './NavBar/Nav';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<div id="app" className="layout">
			<Nav />
			<main>
			<Outlet />
			</main>
			<Footer />
		</div>
	);
}
