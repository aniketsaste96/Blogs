import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/home/NotFound";
import { Blogs } from "./Blogs";
import View from "./View.js";
import AddNewBlog from "./AddNewBlog";
import EditBlog from "./EditBlog";


function App() {
  return (
    <div>

      <div className="container">
        <div className="others">
          <Switch>
            <Route exact path="/">
              <Blogs />
            </Route>
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="/blogs">
              <Blogs />
            </Route>
            <Route path="/add">
              <AddNewBlog />
            </Route>
            <Route path="/edit/:id">
              <EditBlog />
            </Route>
            <Route path="/view/:id">
              <View />
            </Route>
            <Route path="**">
              <NotFound />
            </Route>
          </Switch>
        </div>

      </div>
    </div>
  );
}

export default App;

