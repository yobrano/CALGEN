import React from "react";

import SourceTableContext from "../context/SourceTableContext"
import SourceTableApiContext from "../context/SourceTableApiContext"
import TemplatesApiContext from "../context/TemplatesApiContext"


function CalgenContexts({ children }) {
    return (
        <SourceTableContext>
            <SourceTableApiContext>
                <TemplatesApiContext>
                    {children}
                </TemplatesApiContext>
            </SourceTableApiContext>
        </SourceTableContext>
    );
}

export default CalgenContexts;
