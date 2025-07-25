
import './App.css';
import NavBar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailCointainer/ItemDetailContainer';
import Login from './components/User/LogIn';
import Register from './components/User/Register';
import Profile from './components/User/Profile';
import Cart from './components/Cart/Cart';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import CartContext from './context/CartContext';
import {AuthProvider}  from './context/AuthContext';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
    <CartContext>
    <NavBar/>
      <Routes>
        <Route path="/" element={<ItemListContainer/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/categories/:category" element={<ItemListContainer/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path='/Item/:_id' element={<ItemDetailContainer/>}></Route>
      </Routes>
    </CartContext>
      <Footer/>
    </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
