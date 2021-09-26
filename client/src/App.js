import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Play from "./pages/Play";
import About from "./pages/About";
import Scoreboard from "./components/Scoreboard";
import Nav from "./components/Nav";

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
					<Nav />
					<Scoreboard />
				</Route>
				<Route path="/about">
					<About />
				</Route>
			</Switch>
		</Router>
	)
}

export default App;