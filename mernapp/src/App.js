
import './App.css';
import Home from './screens/Home'
import Login from './screens/Login'
import Profile from './screens/Profile'
import Transactions from './screens/Transactions';
import Transfer from './screens/Transfer';
import Vault from './screens/Vault';
import Notifications from './screens/Notifications';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/Profile" element={<Profile/>}/>
          <Route exact path="/Vault" element={<Vault/>}/>
          <Route exact path="/Transactions" element={<Transactions/>}/>
          <Route exact path="/Transfer" element={<Transfer/>}/>
          <Route exact path="/Notification" element={<Notifications/>}/>
          <Route exact path="/signup" element={<signup/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
