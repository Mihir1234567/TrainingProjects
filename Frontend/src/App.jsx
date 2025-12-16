import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/jobs"
          element={
            <div className="p-20 text-center">Jobs Page (Coming Soon)</div>
          }
        />
        <Route
          path="/post-job"
          element={
            <div className="p-20 text-center">Post a Job (Coming Soon)</div>
          }
        />
        <Route
          path="/login"
          element={<div className="p-20 text-center">Login (Coming Soon)</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
