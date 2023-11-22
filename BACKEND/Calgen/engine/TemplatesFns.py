import string
from Calgen.engine.CodeContainer import CodeContainer as codeBlocks


class NameSyntax:
    def toCALVarName(varName: str) -> str:
        special_chars = string.punctuation + " "
        for char in special_chars:
            if char in varName:
                return f' "{varName}" '.strip()
        return varName
    
    def toJSONVarName(varName: str) -> str:
        special_chars = string.punctuation + " "
        for char in special_chars:
            varName = varName.replace(char, "")
        return varName
    
    def JSONType(dataType):
        if dataType.lower() == "integer":
            return "int"
        elif dataType.lower() == "boolean":
            return "bool"
        elif dataType.lower() == "decimal":
            return 'decimal'
        elif dataType.lower() == "date":
            return "date"
        elif dataType.lower() == "time":
            return "time"
        else: 
            return "string"
        
def ModelArray(df):
    df.query()
    
    pass

class CALSerializer:
    def __init__(self, table, tableName):
        self.sourceDF = table
        self.tableName = tableName


    def Serializer(self, stringify: bool|None = True)-> str:
        self.sourceDF["Json Name"] = self.sourceDF["Field Name"].apply(NameSyntax.toJSONVarName)
        result = codeBlocks()
        result.addLine("// Create the JsonBoolean function -> converts CAL Bools to 'true' or 'false'")
        
        jsonTypes = self.sourceDF["Json Type"].unique()
        for jsonType in jsonTypes:
            typeCount = self.sourceDF.query(f'`Json Type` == "{jsonType}"').shape[0]
            result.addLine(f"// {jsonType} - {typeCount}")

        result.addLine("Result := '{'; ")
        calLines = self.sourceDF.apply(
            lambda field: 
                CALSerializer.jsonElement(
                    self.tableName, 
                    field['Field Name'], 
                    field["Json Name"], 
                    field["Data Type"],
                    isLastElm= field.name == max(self.sourceDF.index), # field.name is the row index value 
                    stringify= stringify
                ),
            axis= 1
        )
        
        [result.addLine(calLine) for calLine in calLines]
        result.addLine("Result += '}';")
        
        return result.getCodeBlock()


    def jsonElement(
                tableName, 
                fieldName: str, 
                jsonName:str, 
                fieldType: str, 
                isLastElm:bool | int= False, 
                stringify : bool | None = False
        ) -> str:
            
            """ Generates C/AL code for converting a field to json element """
            formatCmd= ""
            if(fieldType.lower()=="boolean"):
                formatCmd = f""" JsonBoolean({tableName}Tbl.{NameSyntax.toCALVarName(fieldName)}) """.strip()

            elif(fieldType.lower()=="decimal"):
                formatCmd = f""" FORMAT({tableName}Tbl.{NameSyntax.toCALVarName(fieldName)}, 12, '<Sign><Integer><Decimals>' ) """.strip()
            else:
                formatCmd = f""" FORMAT({tableName}Tbl.{NameSyntax.toCALVarName(fieldName)}) """.strip()
                
            rowValue = f""" '+{formatCmd}+' """.strip()

            jsonElm = ""
            if(fieldType.lower() in  ["boolean", "decimal", "integer"]):
                jsonElm = f""" \\"{jsonName}\\":{rowValue} """.strip() 
            else:
                jsonElm = f""" \\"{jsonName}\\":\\"{rowValue}\\" """.strip()

            
            jsonElm = jsonElm.replace("\\", "") if(not stringify)else(jsonElm)
            jsonElm = jsonElm if(isLastElm)else(jsonElm+",")
            calLine = f""" Result += '{jsonElm}'; """.strip()

            return calLine

def getValidates():
    lines = []
    with open("playground.txt", "r") as f:
        lines = f.readlines()

    onValidates = []
    for idx, line in enumerate(lines[:-2]):
        if ("OnValidate()" in line) and ("OnLookup()" not in lines[idx+2]) :
            onValidates.append(line)

    [print(onValidate.replace("- OnValidate()", "")) for onValidate in onValidates]   

