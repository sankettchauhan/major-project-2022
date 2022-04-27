import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Article from "./pages/article";
// import ArticleNew from "./pages/articlenew";
// import ArticleSearch from "./pages/articlesearch";
import Home from "./pages/home";
import "./index.css";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import AddArticle from "./pages/add-article";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/article/:id"
          element={
            <RequireAuth>
              <Article />
            </RequireAuth>
          }
        />
        {/* <Route exact path="/article/search" element={<ArticleSearch />} /> */}
        <Route
          exact
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/add-article"
          element={
            <RequireAuth>
              <AddArticle />
            </RequireAuth>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
