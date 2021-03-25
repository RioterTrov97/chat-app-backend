import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { logout } from './features/userSlice';
import './Header.css';

function Header() {
	const dispatch = useDispatch();
	const history = useHistory();

	const loggingOut = (e) => {
		e.preventDefault();
		window.localStorage.removeItem('token');
		dispatch(logout());
	};
	return (
		<div className="header">
			<div className="headerLeft" onClick={() => history.push('/')}>
				<img
					src="https://icon-library.com/images/chat-icon-png/chat-icon-png-4.jpg"
					alt=""
				/>
				<p>OpenChat</p>
			</div>

			<div className="headerRight">
				<button
					onClick={(e) => {
						loggingOut(e);
					}}>
					Log Out
				</button>
			</div>
		</div>
	);
}

export default withRouter(Header);
