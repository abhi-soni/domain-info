import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SearchArea from "./Components/SearchArea/SearchArea";
import DNS from "./Components/DNS/DNS";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Whois from "./Components/Whois/Whois";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SearchArea />
        <Routes>
          <Route path="/" element={<Whois />} />
          <Route path="/dns" element={<DNS />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
