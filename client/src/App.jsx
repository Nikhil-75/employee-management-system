// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Loginpage from "./pages/Loginpage";
// import RegisterPage from "./pages/RegisterPage";
// import DashboardPage from "./pages/DashboardPage";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProtectedLayout from "./layout/ProtectedLayout";
// import AddEmployeePage from "./pages/AddEmployeePage";  
// import AllEmployeePage from "./pages/AllEmployeePage";
// import UpdateEmployeePage from "./pages/UpdateEmployeePage";

// const App = () => {
//   return (
//     <>
//       <Navbar/>
//       <Routes>

//        <Route Component={ProtectedLayout} >
//            <Route path="/" Component={DashboardPage} />
//             <Route path="/add-employee" Component={AddEmployeePage} />
//             <Route path="/all-employee" Component={AllEmployeePage } />
//             <Route path="/update-employee/:id" Component={UpdateEmployeePage} />
//        </Route>

//         <Route path="/login" Component={Loginpage} />
//         <Route path="/register" Component={RegisterPage} />
//       </Routes>
//       <Footer />  
//     </>
//   )
// }
// export default App;  



import React from "react";
import { Route, Routes } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedLayout from "./layout/ProtectedLayout";
import AddEmployeePage from "./pages/AddEmployeePage";
import AllEmployeePage from "./pages/AllEmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add-employee" element={<AddEmployeePage />} />
          <Route path="/all-employee" element={<AllEmployeePage />} />
          <Route path="/update-employee/:id" element={<UpdateEmployeePage />} />
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>

      <Footer />
    </>
  );
};

export default App;