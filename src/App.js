
import './App.css';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer'
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';

import { Route, Switch } from 'react-router-dom'

import { DataProvider } from './context/DataContext';

function App() {

  return (
    <div className="App">
       <Header title={'React JS Blog'} />
      <DataProvider>
       
        <Nav />
        
        <Switch>
          <Route exact path='/' >
            <Home />  
          </Route>
          
          {/* <Route exact path='/post' >
            <NewPost />
          </Route> */}
          <Route exact path='/post' component={NewPost} />

          <Route exact path='/edit/:id' >
            <EditPost />
          </Route>
          <Route path='/post/:id' >
            <PostPage />
          </Route>
          
          <Route path='/about'component={About} />
          <Route path='/*'component={Missing} />

        </Switch>
        </DataProvider>
        
        <Footer />
      
    </div>
  );
}

export default App;
