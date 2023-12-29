import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Listing from './pages/Listing';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import OrderForm from './pages/Form';

function App() {
    return (
      <div>
      <Header />

        <Router>
            <Routes>
                {/* <Route path="/" element={<Listing />} />
                <Route path="/checkout" element={<Checkout />} /> */}
                <Route path="/" element={<OrderForm />} />
            </Routes>
        </Router>
      </div>
    );
}
export default App;