import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <h1>BookNJ</h1>
        <Switch>
          <Route path="/login" component={LoginFormPage} />
        </Switch>
      </>
    )
  );
}

export default App;
