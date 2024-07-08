import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login_main from "./Components/Login_Components/Login_main";
import Setup from "./Components/Setup Components/Setup";
import Setup_two from "./Components/Setup Components/Setup_two";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login_main />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/setuptwo" element={<Setup_two />} />

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);