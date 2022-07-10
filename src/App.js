import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/Navigation/Navigation.component';
import Home from './routes/Home/Home.component';
import SignIn from './routes/SignIn/SignIn.component';


const Shop = () => {
  return <h1>I am the shop page</h1>
}

function App() {
  return(
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
  
}

export default App;
