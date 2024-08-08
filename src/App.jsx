import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login_main from "./Components/Login_Components/Login_main";
import Setup from "./Components/Setup Components/Setup";
import Setup_two from "./Components/Setup Components/Setup_two";

import OrderSummary from "./Components/Setup Components/OrderSummary";
import Final from "./Components/Setup Components/Final";
import Dashboard from "./Components/Dashboard_Components/Dashboard";
import Enrolements from "./Components/Enrolements_Components/Enrolements";
import StudentEnrollment from "./Components/Enrolements_Components/StudentEnrollment";
import TeacherEnrollment from "./Components/Teacher_Enroll_Components/TeacherEnrollment";
import SetupConfirmation from "./Components/Setup Components/SetupConfirmation";
import Accessmanagement from "./Components/Access Management/Accessmanagement";
import Manageroles from "./Components/Access Management/Manageroles";
import Roles from "./Components/Access Management/Roles";
import Editaction from "./Components/Access Management/Editaction";
import NewRoles from "./Components/Access Management/NewRoles";
import Assignrolesuser from "./Components/Access Management/Assignrolesuser";
import Addgroup from "./Components/Access Management/Addgroup";
import Managemain from "./Components/Manage Accounts/Managemain";
import ManageGroups from "./Components/Manage Accounts/ManageGroups";
import ProtectedRoute from "./config/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
 <>
    <ToastContainer/>
       <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login_main />} />
      <Route path="/setup" element={<ProtectedRoute element={<Setup />}/>} />
      <Route path="/setuptwo" element={<ProtectedRoute element={<Setup_two />}/>} />
      <Route path="/setupconfirmation" element={<ProtectedRoute  element={<SetupConfirmation />}/>} />
      <Route path="/ordersummmary" element={<ProtectedRoute element={<OrderSummary />}/>} />
      <Route path="/final" element={<ProtectedRoute element={<Final />}/>} />
      <Route path="/dashboard"  element={<ProtectedRoute element={<Dashboard />} />}/>
      <Route path="/enrolements" element={<ProtectedRoute element={<Enrolements />}/>} />
      <Route path="/studentenrollment" element={<ProtectedRoute element={<StudentEnrollment />}/>} />
      <Route path="/teacherenrollment" element={<ProtectedRoute element={<TeacherEnrollment />}/>} />
      <Route path="/user-management" element={<ProtectedRoute element={<Accessmanagement />} />}/>
      <Route path="/manageroles" element={<ProtectedRoute  element={<Manageroles/>}/>} />
      <Route path="/roles" element={<ProtectedRoute element={<Roles/>}/>} />
      <Route path="/editactions"  element={<ProtectedRoute element={<Editaction/>}/>} />
      <Route path="/newroles"  element={<ProtectedRoute element={<NewRoles/>}/>} />
      <Route path="/adduser" element={<ProtectedRoute element={<Assignrolesuser/>}/>} />
      <Route path="/addgroup" element={<ProtectedRoute element={<Addgroup/>}/>} />
      <Route path="/managemain" element={<ProtectedRoute element={<Managemain/>}/>} />
      <Route path="/managegroups" element={<ProtectedRoute element={<ManageGroups/>}/>} />
    </Routes>
  </BrowserRouter>
 </>
  );
}
