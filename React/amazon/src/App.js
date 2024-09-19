import './App.css';
import Header from './components/Header';
import Inventory from './components/Inventory';
import NotFound from './components/NotFound';
import Review from './components/Review';
import Shop from './components/Shop';
import ProductDetails from './components/ProductDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path="/" element = {<Shop></Shop>}>
          </Route>
          <Route path="/shop" element = {<Shop></Shop>}>
          </Route>
          <Route path="/review" element = {<Review></Review>}>
          </Route>
          <Route path="/inventory" element = {<Inventory></Inventory>}>
          </Route>
          {/*/product/:key means url e product/anything ashle ProductDetails e chole jabe */}
          <Route path="/product/:key" element = {<ProductDetails></ProductDetails>}> 
          </Route>
          <Route path="*" element = {<NotFound></NotFound>}>
          </Route>
        </Routes>
    </Router>
      
    </div>
  );
}

export default App;
