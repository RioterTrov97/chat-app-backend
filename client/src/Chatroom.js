import React, { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import { instanceAutoLogin } from './axios';
import { Link } from 'react-router-dom';
import './Chatroom.css';

function Chatroom() {
	const [loading, setLoading] = useState(false);
	const [chatrooms, setChatrooms] = useState([]);
	const [chatroomName, setChatroomName] = useState('');
	const [toggle, setToggle] = useState(false);

	const getChatrooms = () => {
		setLoading(true);
		instanceAutoLogin
			.get('/chatroom/')
			.then((response) => {
				setChatrooms(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	useEffect(() => {
		getChatrooms();
	}, [toggle]);

	const chatRoomIndis = (key, name) => {
		return (
			<div key={key} className="chatRooms">
				<p>{name}</p>
				<Link to={'/chatpage/' + key} className="joinChatRoom">
					<div>Join</div>
				</Link>
			</div>
		);
	};
	let formData = { name: chatroomName };

	const createChatroom = (e) => {
		e.preventDefault();
		console.log('Chatroom name: ', chatroomName);
		instanceAutoLogin
			.post('/chatroom', formData)
			.then(() => {
				setToggle(!toggle);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			{loading ? (
				<LoadingScreen />
			) : (
				<div className="chatRoomList">
					<div className="createChat">
						<h3>Create New Chatroom</h3>
						<div>
							<input
								value={chatroomName}
								onChange={(e) =>
									setChatroomName(e.target.value)
								}
								placeholder="Enter Chatroom Name"
								type="text"
							/>
							<button onClick={(e) => createChatroom(e)}>
								Create
							</button>
						</div>
					</div>
					<div className="chatList">
						<h3>Join Existing Chatroom</h3>
						{chatrooms.map((chatroom) =>
							chatRoomIndis(chatroom._id, chatroom.name)
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Chatroom;
