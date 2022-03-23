import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Converter } from "./pages/Converter";

import { Header } from "./components/Header";

import './App.css';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/converter" element={<Converter />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;