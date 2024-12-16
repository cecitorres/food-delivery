import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Checkout from "./Checkout";
import CouponAdmin from "./Admin/CouponAdmin";
import "./styles.css";

const App = () => {
  return (
      <Router>
          <div>
              {/* Navigation Links */}
              <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                  <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
                      Checkout Cart
                  </Link>
                  <Link to="/admin" style={{ textDecoration: 'none', color: 'blue' }}>
                      Admin Panel
                  </Link>
              </nav>

              {/* Route Configuration */}
              <Routes>
                  {/* Route for Checkout Cart */}
                  <Route path="/" element={<Checkout />} />
                  
                  {/* Route for Admin Panel */}
                  <Route path="/admin" element={<CouponAdmin />} />
              </Routes>
          </div>
      </Router>
  );
};

export default App;
