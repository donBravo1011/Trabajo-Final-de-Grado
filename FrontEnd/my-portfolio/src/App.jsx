import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Portfolio } from "./pages/Portfolio.jsx";
import { Transactions } from "./pages/Transactions.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Header } from "./components/Header.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Footer } from "./components/Footer.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { NewPortfolio } from "./pages/NewPortfolio.jsx";
import { EditPortfolio } from "./pages/EditPortfolio.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ComprarVender } from "./pages/ComprarVender.jsx";
import { Buscador } from "./pages/Buscador.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio/:id" element={<Portfolio />} />
          <Route path="/transaction/:id_portfolio/:id_transaction" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newPortfolio" element={<NewPortfolio />} />
          <Route path="/editPortfolio/:portfolioId" element={<EditPortfolio />} />
          <Route path="/comprarVender/:id" element={<ComprarVender />} />
          <Route path="/buscador" element={<Buscador />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
