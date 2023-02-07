import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./common/firebase-auth";
import Layout from "./components/Layout";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<h1>Default Page</h1>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/browse" element={<Layout />}>
          <Route index element={<Browse />} />
        </Route>
        <Route path="/latest" element={<Layout />}>
          <Route index element={<h1>Latest dummy</h1>} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
