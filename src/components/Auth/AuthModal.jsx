import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import SignUpForm from './Register/SignUpForm';
import SignInForm from './Login/SignInForm';
import './authmodal.css';

const AuthModal = ({ showModal, close, }) => {
	const [activeTab, setActiveTab] = useState('signIn');

	useEffect(() => {
		const modal = document.querySelector('.modal');
		modal.style.display = showModal ? 'block' : 'none';
	}, [showModal]);

	return (
		<Modal show={showModal} close={close}>
			<div className="modal-header">
				<button
					className={`tab-button ${activeTab === 'signUp' ? 'active' : ''}`}
					onClick={() => setActiveTab('signUp')}
				>
					Sign Up
				</button>
				<button
					className={`tab-button ${activeTab === 'signIn' ? 'active' : ''}`}
					onClick={() => setActiveTab('signIn')}
				>
					Sign In
				</button>
			</div>
			<div className="modal-body">
				{activeTab === 'signUp' && <SignUpForm />}
				{activeTab === 'signIn' && <SignInForm />}
			</div>
		</Modal>
	);
};

export default AuthModal;
