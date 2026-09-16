import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';
import FAQPage from './pages/FAQPage';
import FlashDealsPage from './pages/FlashDealsPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col justify-between selection:bg-neon-blue selection:text-midnight font-sans">
                <Navbar/>
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/shop" element={<ShopPage/>}/>
                    <Route path="/products/:id" element={<ProductDetailPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/wishlist" element={<WishlistPage/>}/>
                    <Route path="/orders" element={<OrdersPage/>}/>
                    <Route path="/faqs" element={<FAQPage/>}/>
                    <Route path="/flash-deals" element={<FlashDealsPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                  </Routes>
                </main>
                <Footer />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

