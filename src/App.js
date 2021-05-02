import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileView from "./pages/ProfileView";
import { Register } from "./pages/Register";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/connect/:chatid" component={Connect} />
      <PrivateRoute path="/connect" component={Connect} />
      <PrivateRoute path="/profile/:userid" component={ProfileView} />
      <PrivateRoute path="/profile" component={Profile} />
    </Switch>
  </Router>
);

export default App;
