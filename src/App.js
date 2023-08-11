import "./App.css";
import Header from "./componenets/Header";
import Homepage from "./componenets/Homepage";
import { Route, Routes, useLocation , Navigate, useParams, useNavigate   } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { db } from "./firebaseConfig";
import { contextData } from "./ContextData";
import Scanpage from "./componenets/Scanpage";
import Mainpage from "./componenets/DashbaordComp/Mainpage";
import { auth } from "./firebaseConfig";
import { getAuth , onAuthStateChanged } from "firebase/auth";
import { DotWave } from '@uiball/loaders'

function App() {
  let [data, setData] = useState([]);
  let location = useLocation();
  let path = location.pathname;
  let navigate = useNavigate();
  const [Loading , setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = db.collection("tracking").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    });

    return () => {
      unsubscribe() ;
    } ;
  }, []);

  useEffect(() => {
    const waitingforauth = () => {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setTimeout(() => {
              setLoading(false);
              resolve(true);
            }, 3000);
          } else {
            setTimeout(() => {
              setLoading(false);
              navigate('/dot-local-admin');
              resolve(false);
            }, 2000);
          }
          unsubscribe(); // Unsubscribe the listener to avoid memory leaks
        });
      });
    };
  
    waitingforauth().then((userExists) => {

    });
  }, []);
  


  return (
    <>
       { !Loading && <contextData.Provider value={{ data , db , auth }}>
        <div className="App mx-auto  container ">
        { !(path === '/dot-local-admin/qrgenerate' || path.includes('/dot-local-admin/account') || path.includes('/dot-local-admin/scanpage') ) && < Header auth={auth} /> }

          <Routes>
            <Route exact path="/dot-local-admin" element={<Homepage   />}></Route>
            <Route exact path="/dot-local-admin/scanpage" element={<Scanpage />}></Route>
              <Route index element={<Mainpage />} />
          </Routes>
        </div>
      </contextData.Provider> }
    { Loading &&     <div className="absolute  w-full h-screen z-11 top-0 bg-blue-950/80 flex justify-center items-center ">
            <DotWave 
            size={47}
            speed={1} 
            color="white" 
            />
    </div> }
    </>
  );
}

export default App;
