import './App.css';
import Navbar from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import SettingPage from './pages/SettingPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import {Loader} from "lucide-react";
import { Toaster } from 'react-hot-toast';
import useThemeStore from './store/useThemeStore';

function App() {
const {authUser,checkAuth,isCheckingAuth,onlineUsers} =useAuthStore();
const{theme}=useThemeStore();

useEffect(()=>{
  checkAuth();
},[checkAuth]);
console.log({onlineUsers});
// console.log(authUser);

if(isCheckingAuth && !authUser) return(
<div className='flex items-center justify-center h-screen'>
  <Loader className='size-10 animate-spin'></Loader>
</div>
)
  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to="/login"></Navigate>} />
        <Route path="/signup" element={!authUser?<SignUpPage />:<Navigate to="/"></Navigate>} />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/"></Navigate>} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to="/login"></Navigate>} />
        <Route path="*" element={<div>Page Not Found</div>} /> {/* Catch-all route */}
      </Routes>
      
    </div>
  );
}

export default App;
