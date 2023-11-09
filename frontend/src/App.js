import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { restoreUser } from './store/session';
import SpotsList from './components/SpotsList';
import SpotDetails from './components/SpotDetails';
import CreateSpot from './components/CreateSpot';

const App = ({ children }) => {
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
    <main style={{marginTop: "105px"}}>{children}</main>
    {isLoaded &&
    <Switch>
      <Route exact path="/" component={SpotsList} />
      <Route path="/spots/new" component={CreateSpot} />
      <Route path="/spots/:id" component={SpotDetails} />
    </Switch>
    }
    </>
  );
}

export default App;
