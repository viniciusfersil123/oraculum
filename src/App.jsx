// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ZodiacGrid from "./pages/ZodiacGrid";
import SignForm from "./pages/SignForm";
import DecadeForm from "./pages/DecadeForm";
import YearForm from "./pages/YearForm";
import TimeQuestion from "./pages/TimeQuestion";
import TimeForm from "./pages/TimeForm";
import CityForm from "./pages/CityForm";  // ✅ Import CityForm
import PageWrapper from "./components/PageWrapper";
import FinalPage from "./pages/FinalPage";

let title = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nulla reprehenderit fuga autem nobis est voluptatum labore corporis quisquam illum maxime, sapiente quaerat dolor enim a. Dicta distinctio vitae officiis?"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageWrapper title={title}><ZodiacGrid /></PageWrapper>} />
        <Route path="/sign/:signName/day" element={<PageWrapper title="Sign Form"><SignForm /></PageWrapper>} />
        <Route path="/sign/:signName/decade" element={<PageWrapper title="Decade Form"><DecadeForm /></PageWrapper>} />
        <Route path="/sign/:signName/year" element={<PageWrapper title="Year Form"><YearForm /></PageWrapper>} />
        <Route path="/sign/:signName/time" element={<PageWrapper title="Time Question"><TimeQuestion /></PageWrapper>} />
        <Route path="/sign/:signName/hour" element={<PageWrapper title="Time Form"><TimeForm /></PageWrapper>} />
        <Route path="/sign/:signName/city" element={<PageWrapper title="City Form"><CityForm /></PageWrapper>} />  {/* ✅ Added Route */}
        <Route path="/sign/:signName/final" element={<PageWrapper title="Final Page"><FinalPage /></PageWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
