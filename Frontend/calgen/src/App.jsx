import { Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Account/Login";
import Logout from "./views/Account/Logout";
import Test from "./views/Test";
import Dashboard from "./views/Account/Dashboard";

import SourceTable from "./views/Calgen/SourceTable"
import Upload from "./views/Calgen/Upload"


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
					</Route>
				</Routes>
			</CalgenContexts>
		</AccountContexts>
	);
}

export default App;
