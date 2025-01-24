import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Dashboard /> }>
      <Route index element={ <Home /> }/>
      <Route path='about' element={ <About /> }/>
      <Route path='contact' element={ <Contact /> }/>
      <Route path='profile' element={ <Profile /> }/>
      <Route path='profile/update/:id' element={ <UpdateProfile /> }/>
      <Route path='*' element={ <NotFound /> }/>
    </Route>


    </Routes>
  );
}

export default App;


/* 
useNavigate, route guides, navigate, navigation transition animation: react-transition-group, lazy loadiing, using suspense with lazy loading
*/

