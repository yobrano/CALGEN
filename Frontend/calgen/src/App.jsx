import { Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Account/Login";
import Logout from "./views/Account/Logout";
import Test from "./views/Test";
import Dashboard from "./views/Account/Dashboard";

import SourceTable from "./views/Calgen/SourceTable"
import Upload from "./views/Calgen/Upload"
import Build from "./views/Calgen/Build"


import ProtectedView from "./utils/ProtectedView";
import AccountContexts from "./utils/AccountContexts";
import CalgenContexts from "./utils/CalgenContexts";

function App() {
	return (
		<AccountContexts>
			<CalgenContexts>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/logout" element={<Logout />} />
					<Route exact path="/test" element={<Test />} />
					<Route element={<ProtectedView />}>
						<Route exact path="/dashboard" element={<Dashboard />} />
						<Route path="/table" element={<SourceTable />} />
						<Route path="/upload" element={<Upload />} />
						<Route path="/build" element={<Build />} />
					</Route>
				</Routes>
			</CalgenContexts>
		</AccountContexts>
	);
}

export default App;

/*
import SourceTableContext from "@src-context/SourceTableContext"
import SourceTableApiContext from "@src-context/SourceTableApiContext"
import TemplatesApiContext from "@src-context/TemplatesApiContext"

import Home from "@src-views/Home"
import SourceTable from "@src-views/SourceTable"
import Upload from "@src-views/Upload"
import Build from "./views/Build"
function App() {

	return (
		<SourceTableContext>
			<SourceTableApiContext>
				<TemplatesApiContext>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/table" element={<SourceTable />} />
						<Route path="/upload" element={<Upload />} />
						<Route path="/build" element={<Build />} />
					</Routes>
				</TemplatesApiContext>
			</SourceTableApiContext>
		</SourceTableContext>
	)
}
export default App
*/
