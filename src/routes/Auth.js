import React, { useState } from 'react';
import { authService, createAccount, signin, socialSignIn } from 'firebaseConfig';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const Auth = () => {
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
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new GithubAuthProvider();
        }
        const data = await socialSignIn(authService, provider);
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name='email' value={email} onChange={onChange} type="email" placeholder='Email' required />
                <input name='password' vlaue={password} onChange={onChange} type="password" placeholder='Password' required />
                <input type="submit" value={newAccount ? "Create New Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "create New Account"}</span>
            <div>
                <button name='google' onClick={onSocialClick}>Continue With Google</button>
                <button name='github' onClick={onSocialClick}>Continue With Gihub</button>
            </div>
        </div>
    );
};

export default Auth;