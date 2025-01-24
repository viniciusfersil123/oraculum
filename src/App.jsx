import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ZodiacGrid from "./pages/ZodiacGrid";
import SignForm from "./pages/SignForm";
import DecadeForm from "./pages/DecadeForm";
import YearForm from "./pages/YearForm";
import TimeQuestion from "./pages/TimeQuestion";
import TimeForm from "./pages/TimeForm";
import CityForm from "./pages/CityForm";
import NameForm from "./pages/NameForm"; // ✅ Import NameForm
import PageWrapper from "./components/PageWrapper";
import FinalPage from "./pages/FinalPage";
import Footer from "./components/Footer";
import "./App.css";
import config from "./pages/zodiacGrid.json";

let title = (
  <h1>
    {config.CTA}
  </h1>
);

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Wrapper to manage layout */}
        <Routes>
          <Route path="/" element={<PageWrapper title={title}><ZodiacGrid /></PageWrapper>} />
          <Route path="/sign/:signName/day" element={<PageWrapper ><SignForm /></PageWrapper>} />
          <Route path="/sign/:signName/decade" element={<PageWrapper ><DecadeForm /></PageWrapper>} />
          <Route path="/sign/:signName/year" element={<PageWrapper ><YearForm /></PageWrapper>} />
          <Route path="/sign/:signName/time" element={<PageWrapper ><TimeQuestion /></PageWrapper>} />
          <Route path="/sign/:signName/hour" element={<PageWrapper ><TimeForm /></PageWrapper>} />
          <Route path="/sign/:signName/city" element={<PageWrapper ><CityForm /></PageWrapper>} />
          <Route path="/sign/:signName/final" element={<FinalPage />} /> {/* Remove PageWrapper here */}
          <Route path="/sign/:signName/name" element={<PageWrapper ><NameForm /></PageWrapper>} />
        </Routes>

        <Footer /> {/* Add Footer here */}
      </div>
    </Router>
  );
}

export default App;
