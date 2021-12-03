import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import RegisterScreen from './screens/RegisterScreen';
import Test from './screens/test';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { useSelector } from 'react-redux'
function App() {

  const state = useSelector(state => state.token)

  const { isLoggedIn } = state

  console.log("isloggedin", isLoggedIn)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route exact path="/" element={isLoggedIn ? <HomeScreen /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
