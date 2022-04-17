import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { dbService, storageService } from '../firebaseConfig';
import { useEffect } from 'react';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
    // console.log(userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    const getNweets = async () => {
        const querySnapShot = await getDocs(collection(dbService, "nweet"));
        querySnapShot.forEach(doc => {
            // console.log(doc.data());
            const nweetObject = {
                ...doc.data(),
                id: doc.id,

            }
            setNweets(prev => [nweetObject, ...prev]);
        })
    };
    useEffect(() => {
        console.log("useEffect");
        onSnapshot(collection(dbService, "nweet"), snapshot => {
            const nweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            setNweets(nweetArr);
        });

    }, []);


    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await addDoc(collection(dbService, "nweet"), nweetObj);
        setNweet("");
        setAttachment("");
        // console.log(response);    

        // await addDoc(collection(dbService, "nweet"), {
        //     text: nweet,
        //     createAt: Date.now(),
        //     creatorId: userObj.uid,
        // })
        // setNweet("");

    }
    const onChanage = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            // console.log(finishedEvent);
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => {
        setAttachment(null);
    }
    // console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChanage} type='text' placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>}
            </form>
            <div>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))
                }
            </div>
        </div>
    );
};

export default Home;