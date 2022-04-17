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
            // console.log(doc.id, "=>", doc.data());
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
            // console.log(userObj.updateProfile);
            await updateProfile(userObj, { displayName: newDisplayName });
            refreshUser();
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;