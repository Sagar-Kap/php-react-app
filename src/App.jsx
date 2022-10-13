import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<ProductList />} />
          <Route path="add-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
export default App;
