
import './App.css';
import Home from './screens/Home'
import Login from './screens/Login'
import Profile from './screens/Profile'
import Transactions from './screens/Transactions';
import Transfer from './screens/Transfer';
import Vault from './screens/Vault';
import Notifications from "./screens/Notifications"
import Otp from './screens/Otp';
import withAuth from './withAuth';
import isLoggedIn from './authUtils'; 


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Logins from './screens/Login';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route 
        path="/home"
        element={
          isLoggedIn(console.log("hi logged in")) ? <Home /> : (<Navigate to="/" replace/> )
        } 
      />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/Profile" element={<Profile/>}/>
          <Route exact path="/Vault" element={<Vault/>}/>
          <Route exact path="/Transactions" element={<Transactions/>}/>
          <Route exact path="/Transfer" element={<Transfer/>}/>
          <Route exact path="/Notifications" element={<Notifications/>}/>
          <Route exact path="/signup" element={<signup/>}/>
          <Route exact path="/otp" element={<Otp/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
