import React, { useState } from 'react';
import { authService, createAccount, signin } from 'firebaseConfig';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // 새 계정 생성
                data = await createAccount(authService, email, password);
            } else {
                // 로그인
                data = await signin(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }
    const onChange = (event) => {
        console.log(event.target.value);
        // console.log(event.target);
        const {
            target: { name, value }
        } = event;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev); // ???

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input name='email' className='authInput' value={email} onChange={onChange} type="email" placeholder='Email' required />
                <input name='password' className='authInput' vlaue={password} onChange={onChange} type="password" placeholder='Password' required />
                <input type="submit" className='authInput authSubmit' value={newAccount ? "Create New Account" : "Log In"} />
                {error && <span className='authError'>{error}</span>}
            </form>
            <span className="authSwitch" onClick={toggleAccount}>{newAccount ? "Sign In" : "create New Account"}</span>
        </>
    );
};

export default AuthForm;