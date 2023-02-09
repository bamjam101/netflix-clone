import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./common/firebase-auth";
import ProfilesProvider from "./common/ProfileContext";
import Layout from "./components/Layout";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, isLoading } = useAuth();
  // if (!user && !isLoading) {
  //   return <Navigate to="/login" />;
  // }
  return children;
}

function AppRouter() {
  const { isLoading, user } = useAuth();
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
    <section className="grid h-screen w-screen place-items-center bg-dark text-4xl">
      Loading...
    </section>
  ) : (
    <RouterProvider router={router}></RouterProvider>
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
