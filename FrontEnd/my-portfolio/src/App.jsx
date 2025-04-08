import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Portfolio } from "./pages/Portfolio.jsx";
import { Transactions } from "./pages/Transactions.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Header } from "./components/Header.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Footer } from "./components/Footer.jsx";



function App() {

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
