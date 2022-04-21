import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseConfig";


const App = () => {
  const [init, setInint] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
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
    });

  }
  return (
    <>
      {init ? <AppRouter
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObj)}
        userObj={userObj}
      /> : "Initializing..."}
    </>
  );
}

export default App;
