import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <>
      <h1>BookNJ</h1>
      <Switch>
        <Route path="/login" component={LoginFormPage} />
      </Switch>
    </>
  );
}

export default App;
