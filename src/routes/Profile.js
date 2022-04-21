import React, { useEffect, useState } from 'react';
import { authService } from 'firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../firebaseConfig';
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const Profile = ({ refreshUser, userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/", { replace: true });
    }
    const getMyNweets = async () => {
        const q = query(collection(dbService, "nweet"), orderBy("createdAt", "desc"), where("creatorId", "==", `${userObj.uid}`));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach(doc => {
        })
    }
    useEffect(() => {
        getMyNweets();
    }, [])

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName }).then(console.log("updateProfile Finished"));
            refreshUser();
        }
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};

export default Profile;