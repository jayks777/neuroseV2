import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notfound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Erro 404. NÃO retornar nunca erro 500 da api*/}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}