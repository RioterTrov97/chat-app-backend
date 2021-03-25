import React, { useState } from 'react';
import './Login.css';
import axios from './axios';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import LoadingScreen from './LoadingScreen';
import { withRouter } from 'react-router-dom';

function Login() {
	const [loading, setLoading] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	let formData = {
		name,
		email,
		password,
	};

	const signIn = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post('/user/login', formData)
			.then((response) => {
				window.localStorage.setItem('token', response.data.token);
				setLoading(false);
				dispatch(
					login({
						name: response.data.user.name,
						id: response.data.user.id,
						email: response.data.user.email,
						token: response.data.token,
					})
				);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	const signUp = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post('/user/register', formData)
			.then((response) => {
				const localStorage = window.localStorage;
				localStorage.setItem('token', response.data.token);
				setLoading(false);
				dispatch(
					login({
						name: response.data.user.name,
						id: response.data.user.id,
						email: response.data.user.email,
						token: response.data.token,
					})
				);
			})
			.catch((err) => {
				console.log('Error: --> ', err);
				setLoading(false);
			});
	};

	return (
		<div className="login">
			<div className="logo">
				<img
					src="https://icon-library.com/images/chat-icon-png/chat-icon-png-4.jpg"
					alt=""
				/>
				<p>OpenChat</p>
			</div>

			<div className="ComName">
				<span>Open to find your interests</span>
			</div>

			{loading ? (
				<LoadingScreen />
			) : (
				<div>
					<form>
						{isSignUp ? (
							<div className="logins">
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Full name"
									type="text"
								/>
							</div>
						) : null}

						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							type="email"
						/>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							type="password"
						/>

						<button
							type="submit"
							onClick={isSignUp ? signUp : signIn}>
							{isSignUp ? 'Sign Up' : 'Sign In'}
						</button>
					</form>
					<p>
						Not a member?{' '}
						<span
							className="login__register"
							onClick={() => setIsSignUp(!isSignUp)}>
							{isSignUp ? 'Login' : 'Register Now'}
						</span>
					</p>
				</div>
			)}
		</div>
	);
}

export default withRouter(Login);
