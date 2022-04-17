import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseConfig";
import { updateProfile } from 'firebase/auth';

const App = () => {
  const [init, setInint] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, {
            displayName: user.displayName,
          })
        });
      } else {
        // setIsLoggedIn(false);
        setUserObj(null);
      }
      setInint(true);
    })
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, {
        displayName: user.displayName,
      })
    });
  }
  return (
    <>
      {/* {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."} */}
      {init ? <AppRouter
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObj)}
        userObj={userObj}
      /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
