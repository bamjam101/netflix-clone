import React, { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./common/firebase-auth";
import ProfilesProvider from "./common/ProfileContext";

const Layout = lazy(() => import("./components/Layout"));
const Loader = lazy(() => import("./components/Loader"));
const RouteError = lazy(() => import("./components/RouteError"));
const Browse = lazy(() => import("./pages/Browse"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const SignUp = lazy(() => import("./pages/SignUp"));

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  const dummy = localStorage.getItem("DUMMY");
  if (!dummy && !user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function AppRouter() {
  const { isLoading } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
          errorElement={<RouteError />}
        >
          <Route index element={<Profile />} />
          <Route path="editProfile" element={<Profile edit={true} />} />
          <Route path="browse" element={<Layout />}>
            <Route index element={<Browse />} />
          </Route>
          <Route path="latest" element={<Layout />}>
            <Route index element={<h1>Latest dummy</h1>} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </>
    )
  );
  return isLoading ? (
    <Loader />
  ) : (
    <React.Suspense fallback={<Loader />}>
      <RouterProvider router={router}></RouterProvider>
    </React.Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProfilesProvider>
        <AppRouter />
      </ProfilesProvider>
    </AuthProvider>
  );
}

export default App;
