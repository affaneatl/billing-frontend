import { Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import PrivateOutlet from "./components/PrivateOutlet";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="invoice" element={<Layout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
