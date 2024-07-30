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


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login_main />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/setuptwo" element={<Setup_two />} />
        <Route path="/setupconfirmation" element={<SetupConfirmation />} />
        <Route path="/ordersummmary" element={<OrderSummary />} />
        <Route path="/final" element={<Final />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enrolements" element={<Enrolements />} />
        <Route path="/studentenrollment" element={<StudentEnrollment />} />
        <Route path="/teacherenrollment" element={<TeacherEnrollment />} />
        <Route path="/user-management" element={<Accessmanagement />} />
        <Route path="/manageroles" element={<Manageroles/>} />
        <Route path="/roles" element={<Roles/>} />
        <Route path="/editactions" element={<Editaction/>} />
        <Route path="/newroles" element={<NewRoles/>} />
        
        

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);