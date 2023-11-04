import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { restoreUser } from './store/session';

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded}/>
    {isLoaded && (
      <div>
        <Switch>
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignUpFormPage} />
        </Switch>
      </div>
    )}
    </>
  );
}

export default App;
