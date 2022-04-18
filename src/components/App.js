import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseConfig";


const App = () => {
  const [init, setInint] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          /*updateProfile: () => updateProfile(user, {
            displayName: user.displayName,
          })*/
        });
        // console.log("Log from App", userObj);
        // console.log("Log from App", authService.currentUser);
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
      /*updateProfile: () => updateProfile(user, {
        displayName: user.displayName,
      })*/
    });
    // console.log("Log from App(refreshUser: userObj)", userObj);
    // console.log("Log from App(refreshUser: authService.currentUser)", authService.currentUser);
  }
  return (
    <>
      {/* {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."} */}
      {init ? <AppRouter
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObj)}
        userObj={userObj}
      /> : "Initializing..."}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
