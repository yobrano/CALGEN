import { Route, Routes } from "react-router-dom"

import Home from "./views/Home"
import Login from "./views/Account/Login"
import Logout from "./views/Account/Logout"
import Test from "./views/Test"

import TokenProvider from "./context/TokenProvider"

function App(){
	return (
		<TokenProvider>
			<Routes>
				<Route exact path="/" element={<Home/>} />
				<Route exact path="/login" element={<Login/>} />
				<Route exact path="/logout" element={<Logout/>} />
				<Route exact path="/test" element={<Test/>} />
			</Routes>
		</TokenProvider>
	)
}

export default App






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
