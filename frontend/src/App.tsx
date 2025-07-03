import {useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import {useAuthStore} from "./store/useAuthStore.ts";
import {Toaster} from "react-hot-toast";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/*<Loader className={"size-10 animate-spin"}/>*/}
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>


      <Toaster />

    </div>
  );
};

export default App;