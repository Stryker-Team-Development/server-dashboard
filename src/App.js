import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LandingPage from './pages/LandingPage';
import DnDPage from './pages/DnDPage'
import CharactersPage from './pages/CharactersPage'
import CharacterDetail from './components/CharacterDetail'
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
          <Route path="/DnD/:campaignId/characters/:characterId" component={CharacterDetail}/>
          <Route path="/DnD/:campaignId" component={CharactersPage}/>
          <Route path="/DnD" component={DnDPage}/>
          <Route path="/" component={LandingPage}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
