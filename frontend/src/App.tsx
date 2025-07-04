import {useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import {useAuthStore} from "./store/useAuthStore.ts";
import {Toaster} from "react-hot-toast";
import LandingPage from "./pages/LandingPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import CollaborativeEditorPage from "./pages/CollaborativeEditorPage.tsx";

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
        {/* Public landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/dashboard" />}
        />

        {/* Protected app routes */}
        <Route
          path="/dashboard"
          element={authUser ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/editor/:roomId"
          element={authUser ? <CollaborativeEditorPage /> : <Navigate to="/login"/> }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>


      <Toaster />

    </div>
  );
};

export default App;