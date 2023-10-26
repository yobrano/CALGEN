class ForeignKeyReference:
    """
    cls:ForeignKeyReference brakes down a Foreing Key refernce to 
        1. foreign table --> Parent Table
        2. filter fields --> Filters to be applied in the parent table
        3. association fields --> Field in the child table that are assinged values from the parent table. 

    --------------------------------
            Refernce Format
    --------------------------------
    Parent Table(<filters>){<associations>}

    **** Filters Format ****
        <field Name> = <field Value>[,...] 
    
    **** associations Format ****
        <field Name> = <field Value>[,...] 

        
    -------------------------------------
            Short Hand Notations
    -------------------------------------
    ** --> This field in the child table (equivalent to: ChildTable.CurrentField)
    *.Field Name --> Another Field in the child table (equivalent to: ChildTable.AnotherField)
    
    """
    fkReference : str
    startFilterChar : str
    endFilterChar : str
    startAssocateChar : str
    endAssocateChar : str
    assignChar : str
    sepFieldsChar : str

    def __init__(self, fkReference: str) -> None:
        """
        param:fkReference is a string that details on the foreign key attributes( table name, filters, associated fields )
        fn:__init__ assigns the filter and associate flags, field separators, assingment opperator and the secondary table name.
        """
        self.startFilterChar = "("
        self.endFilterChar = ")"
        self.startAssocateChar = "{"
        self.endAssocateChar = "}"
        self.assignChar = "="
        self.sepFieldsChar = ","
        
        self.fkReference = fkReference
        self.secondaryTbl = self.getSecondaryTbl(fkReference)


    
    def toList(self) -> list :
        """
        fn:toList calls all function that deconsturct attr:fkReference string and returns the result in list format 
        """
        res = [
            self.secondaryTbl, 
            self.getFilterFields(),
            self.getAssociateFields()
        ]
        return res

    def toDict(self) -> dict:
        """
        fn:toDict calls all function that deconsturct attr:fkReference string and returns the result in dictionary format 
        """
        res = self.toList()
        return {
            "table": self.secondaryTbl,
            "filters": res[1],
            "associates": res[1],
        }
    

    def getSecondaryTbl(self, fkReference: str) -> str:
        """
        fn:getSecondaryTbl retrieves the secondary table name from att:fkReference
        """
        if(self.startFilterChar not in fkReference): 
            raise ValueError(f"{self.startFilterChar} should be present in {fkReference}")
        else:
            return fkReference[:fkReference.find(self.startFilterChar)]



    def getFilterFields(self) -> list[str]:
        """
        fn:getFilterFields converts the text with the filter flags to an array of key value pairs.
        """
        withinText =  ForeignKeyReference.getWithin(self.fkReference, self.startFilterChar, self.endFilterChar)
        filterFields = withinText.split(self.sepFieldsChar)

        res = []
        for filterField in filterFields:
            if self.assignChar not in filterField:
                raise ValueError(f"'{filterField}' has no assigned value. ")
            else:
                key = filterField.split(self.assignChar)[0].strip()
                val = filterField.split(self.assignChar)[1].strip()
                res.append( [key, val]) 
        return res


    def getAssociateFields(self) -> list[str]:
        """
        fn:getAssociateFields converts the text with the associate flags to an array of key value pairs.
        """
        withinText =  ForeignKeyReference.getWithin(self.fkReference, self.startAssocateChar, self.endAssocateChar)
        assignFields = withinText.split(self.sepFieldsChar)

        res = []
        for assignField in assignFields:
            if self.assignChar not in assignField:
                raise ValueError(f"'{assignField}' is not associated to any field.")
            else:
                key = assignField.split(self.assignChar)[0].strip()
                val = assignField.split(self.assignChar)[1].strip()
                res.append([key, val]) 
        return res
    
    

    def getWithin(text,  startFlag, endFlag) -> str:
        """
        fn:getWithin is a helper function that extracts text encapsulated within some chars
        """
        if(startFlag not in text):
            raise ValueError(f"{startFlag} was not found in {text}.")

        elif(endFlag not in text): 
            raise ValueError(f"{endFlag} was not found in the {text}.")
        
        else:
            return text[text.find(startFlag) + 1: text.find(endFlag)]


if __name__ == "__main__":
    fkey= "Employee Grouping &  Levels(Type='Employee Function Group', Code=**){**=Code, Employee Level=Level ID}"
    ref = ForeignKeyReference(fkey)
    print(
        fkey,
        ref.secondaryTbl, 
        ref.getAssociateFields(),
        ref.getFilterFields(),
        sep= "\n")