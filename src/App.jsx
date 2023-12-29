import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SearchArea from "./Components/SearchArea/SearchArea";
import DNS from "./Components/DNS/DNS";
import Whois from "./Components/Whois/Whois";
import URLHistory from './Components/URLHistory';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SearchArea />
        <Routes>
          <Route path="/" element={<Whois />} />
          <Route path="/dns" element={<DNS />} />
          <Route path="/history" element={<URLHistory />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
