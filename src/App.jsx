import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login_main from "./Components/Login_Components/Login_main";
import Setup from "./Components/Setup Components/Setup";
import Setup_two from "./Components/Setup Components/Setup_two";
import Setup_three from "./Components/Setup Components/Setup_three";
import OrderSummary from "./Components/Setup Components/OrderSummary";
import Final from "./Components/Setup Components/Final";
import Dashboard from "./Components/Dashboard_Components/Dashboard";
import Enrolements from "./Components/Enrolements_Components/Enrolements";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login_main />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/setuptwo" element={<Setup_two />} />
        <Route path="/setupthree" element={<Setup_three />} />
        <Route path="/ordersummmary" element={<OrderSummary />} />
        <Route path="/final" element={<Final />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enrolements" element={<Enrolements />} />





      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);