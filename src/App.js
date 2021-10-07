import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LandingPage from './pages/LandingPage';
import DnDPage from './pages/DnDPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Router>
        <Switch>
          <Route path="/DnD">
            <DnDPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
