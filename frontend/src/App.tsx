import {useEffect} from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/Header/NavBar.tsx';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import {useAuthStore} from "./store/useAuthStore.ts";
import {Toaster} from "react-hot-toast";
import LandingPage from "./pages/LandingPage.tsx";
import CollaborativeEditorPage from "./pages/CollaborativeEditorPage.tsx";
import HomePage from './pages/HomePage.tsx';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/*<Loader className={"size-10 animate-spin"}/>*/}
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  // Hiding the NavBar on certain routes
  const hideNavBarRoutes: RegExp[] = [/^\/p\/[^/]+$/];
  const shouldHideNavBar:boolean = hideNavBarRoutes.some((route ) => route.test(location.pathname));

  return (
    <div>
      {!shouldHideNavBar && <NavBar />}

      <div className={`${!shouldHideNavBar ? 'pt-[96px]' : ''}`}>
        <Routes>
          {/* Public landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth routes */}
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to="/home" />}
          />

          {/* Protected app routes */}
          <Route
            path="/settings"
            element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/p/:roomId"
            element={authUser ? <CollaborativeEditorPage /> : <Navigate to="/login"/> }
          />
          <Route
            path={"/home"}
            element={authUser ? <HomePage /> : <Navigate to="/login"/> }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Navigate to="/" />}/>
        </Routes>

        <Toaster />
      </div>

    </div>
  );
};

export default App;