import './App.css';
import { Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import HomePage from './components/home/HomePage';
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
	let location = useLocation();
	return (
		<div className='App'>
			{location.pathname !== '/' && <NavBar />}
			<Route path='/' exact component={LandingPage} />
			<Route exact path='/home' component={HomePage} />
		</div>
	);
}

export default App;
