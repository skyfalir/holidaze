import './modal.css';
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

const Modal = ({ show, close, children }) => {
	useEffect(() => {
		const modal = document.querySelector('.modal');
		modal.style.display = show ? 'none' : 'block';
	}, [show]);

	const modalStyles = {
		display: 'none',
	};

	return ReactDOM.createPortal(
		<div className="modal" style={modalStyles}>
			<span className="close" onClick={close}>
				&times;
			</span>
			<div className="modal-content">{children}</div>
		</div>,
		document.getElementById('modal-root')
	);
};
export default Modal;
