import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { dbService, storageService } from '../firebaseConfig';
import { deleteObject } from 'firebase/storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            const nweetTextRef = doc(dbService, "nweet", `${nweetObj.id}`);
            await deleteDoc(nweetTextRef);
            await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
    }
    const toggleEditing = () => {
        setEditing(prev => !prev);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        // console.log(nweetObj, newNweet);
        const nweetTextRef = doc(dbService, "nweet", `${nweetObj.id}`);
        await updateDoc(nweetTextRef, {
            text: newNweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewNweet(value);
    }
    return (
        <div className="nweet">
            {
                editing ? (<>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input type="text"
                            placeholder='Edit your Nweet'
                            autoFocus
                            onChange={onChange}
                            className='formInput'
                            value={newNweet} required />
                        <input type="submit" value="Update Nweet" className='formBtn' />
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                        {isOwner && (
                            <div className='nweet_actions'>
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Nweet;