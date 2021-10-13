import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Play from "./pages/Play";
import About from "./pages/About";
import Scoreboard from "./pages/Scoreboard";
import NewPart from './pages/NewPart';
import GetStats from './pages/GetStats';
import Login from './pages/Login';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/play">
					<Play />
				</Route>
				<Route path="/scoreboard">
					<Scoreboard />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/newpart">
					<NewPart />
				</Route>
				<Route path="/stats">
					<GetStats />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
			</Switch>
		</Router>
	)
}

export default App;