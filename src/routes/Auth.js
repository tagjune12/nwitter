import React from 'react';
import { authService, socialSignIn } from 'firebaseConfig';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import AuthForm from 'components/AuthForm';

const Auth = () => {

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
            <AuthForm />
            <div>
                <button name='google' onClick={onSocialClick}>Continue With Google</button>
                <button name='github' onClick={onSocialClick}>Continue With Gihub</button>
            </div>
        </div>
    );
};

export default Auth;