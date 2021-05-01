import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/connect/:chatid" component={Connect} />
      <PrivateRoute path="/connect" component={Connect} />
    </Switch>
  </Router>
);

export default App;
