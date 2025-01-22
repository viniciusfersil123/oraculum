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
import Footer from "./components/Footer";  // ✅ Import Footer
import "./App.css";

let title = (
  <h1>
    <strong>93% OF PEOPLE</strong> DON'T KNOW THIS TRUTH
    ABOUT THEIR ZODIAC SIGN. <strong>DO YOU?</strong>
  </h1>
);

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Wrapper to manage layout */}
        <Routes>
          <Route path="/" element={<PageWrapper title={title}><ZodiacGrid /></PageWrapper>} />
          <Route path="/sign/:signName/day" element={<PageWrapper title="Sign Form"><SignForm /></PageWrapper>} />
          <Route path="/sign/:signName/decade" element={<PageWrapper title="Decade Form"><DecadeForm /></PageWrapper>} />
          <Route path="/sign/:signName/year" element={<PageWrapper title="Year Form"><YearForm /></PageWrapper>} />
          <Route path="/sign/:signName/time" element={<PageWrapper title="Time Question"><TimeQuestion /></PageWrapper>} />
          <Route path="/sign/:signName/hour" element={<PageWrapper title="Time Form"><TimeForm /></PageWrapper>} />
          <Route path="/sign/:signName/city" element={<PageWrapper title="City Form"><CityForm /></PageWrapper>} />
          <Route path="/sign/:signName/final" element={<PageWrapper title="Final Page"><FinalPage /></PageWrapper>} />
        </Routes>
        <Footer /> {/* Add Footer here */}
      </div>
    </Router>
  );
}

export default App;
