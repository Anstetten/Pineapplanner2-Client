import React , {useState} from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Recipes from "./components/Recipes/Recipes";
import Planner from "./components/Planner/Planner";

function App() {
  const [click, setClick] = useState(false);
  const handleClick = (e)=> setClick(!click);
  const closeMobileMenu = ()=> setClick(false);

  return (
    <div className="App">
      <NavMain closeMobile={closeMobileMenu} handleClick={handleClick} click={click} />
      <div className="pageBody" onClick={closeMobileMenu}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/planner" component={Planner} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
