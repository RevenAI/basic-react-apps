import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Nav from "./components/Nav";
import PostPage from "./components/PostPage";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import { DataProvider } from "./contex/DataContext";

function App() {
 
  return (
    <div className="App">
      <DataProvider>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/new-post" element={<NewPost /> }/>
        <Route path="/edit/:id" element={ <EditPost /> }/>
        <Route
          path="/post/:id"
          element={<PostPage />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      </DataProvider>
    </div>
  );
}

export default App;

