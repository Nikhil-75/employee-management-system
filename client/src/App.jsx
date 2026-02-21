import React from "react";
import { Route, Routes } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedLayout from "./layout/ProtectedLayout";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>

       <Route Component={ProtectedLayout} >
           <Route path="/" Component={DashboardPage} />
       </Route>

        <Route path="/login" Component={Loginpage} />
        <Route path="/register" Component={RegisterPage} />
      </Routes>
      <Footer />  
    </>
  );
};
export default App;
