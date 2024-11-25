
import "./App.css";
import AdminPage from "./pages/adminpage/admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestComponent from "./components/test/test";
import LoginPage from "./pages/login/login";
import CategoriesPage from "./pages/client-page/categories";
import { Toaster } from "react-hot-toast";
import { CustomerPage } from "./pages/client-page/clientPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/test" element={<TestComponent />} />
        <Route path="/*" element={<CustomerPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
