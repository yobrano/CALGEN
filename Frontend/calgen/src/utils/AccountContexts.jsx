import React from "react";

import TokenProvider from "../context/TokenProvider";
import AuthenticateProvider from "../context/AuthenticateProvider";

function AccountContexts({ children }) {
    return (
        <TokenProvider>
            <AuthenticateProvider>
				{children}
			</AuthenticateProvider>
        </TokenProvider>
    );
}

export default AccountContexts;
