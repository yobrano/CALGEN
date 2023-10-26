import pandas as pd
import numpy as np
import json
import os

from Calgen.engine.TemplatesFns import NameSyntax, CALSerializer
from Calgen.engine.TableTransform import FeaturesGenerator 
from Calgen.engine.CodeContainer import CodeContainer
from zipfile import ZipFile

# --------------------------- Read in the source table. --------------------------- 
def getSourceDF(filePath) -> pd.DataFrame | None:
    return pd.read_csv(filePath)


# --------------------------- Read in settings. --------------------------- 
def getSettings(filePath) -> pd.DataFrame | None:
    jsonContent : dict | list
    settings : pd.DataFrame | pd.Series
    
    # Read file using JSON module
    try:
        with open(filePath, "r") as f:
            try:
                jsonContent = json.load(f)
                
            except json.JSONDecodeError as e:
                print("Something is wrong with the file.", e, sep="\n")
                return None
            
            f.close()
            
    except FileNotFoundError as e:
        print("File was not found.", e, sep="\n")
        return None
    
    # convert json Content to a data frame
    if type(jsonContent) == list:
        settings = pd.DataFrame(jsonContent)
    elif type(jsonContent) == dict:
        settings = pd.DataFrame(jsonContent, index= [0])

    expectedOptions = [
        "tableName",
        "tableFilePath",
        "outputDir",
        "inputType",
        "customTemplates",
        "customFields",
        "zipResponse"
    ]
    for opt in expectedOptions:
        if opt not in settings.columns:
            settings[opt] = np.nan



    return settings
# --------------------------- Generates CRUD and custom functions --------------------------- 
def Generate(settingsRow: pd.Series):
    df = getSourceDF(settingsRow["tableFilePath"])
    customCols = settingsRow["customFields"] if(type(settingsRow["customFields"]) == list)else([])
    df = FeaturesGenerator(df, importantCols=[*customCols]).getDF()

    params = {
        "functions": {
            "toJSONVarName": NameSyntax.toJSONVarName, 
            "toCALVarName": NameSyntax.toCALVarName, 
            "CalSerializer": CALSerializer,
            "zip": zip,
            "str":str,
            "type":type, 
            "enumerate": enumerate,
        },
        "variables": {
            "table": df, 
            "tableName": settingsRow["tableName"], 
            "INPUTFORMAT1": settingsRow["inputFormat"].lower() == "single",
            "INPUTFORMAT2": settingsRow["inputFormat"].lower() == "array",
        }
    }

    templates = [
        "Create Item.j2",
        "Get Item.j2",
        "Get Range.j2",
        "Update Item.j2",
        "Delete Item.j2",
        "Serializer.j2",
    ]

    if(type(settingsRow["customTemplates"]) == list):
        templates = [*templates, *settingsRow["customTemplates"]]

    outputs = []
    res = {}

    for template in templates:
        codeBlocks = CodeContainer()
        if ((type(settingsRow["customTemplates"]) == list) and (template in settingsRow["customTemplates"])):
            template = f"customs/{template}"
        
        codeBlocks.readTemplate(["templates", template ], params)
        fileName = settingsRow["outputDir"]+f"/{template.replace('.j2', '.txt')}"
        codeBlocks.writeCodeBlocks(fileName)
        
        res[template] = codeBlocks.getCodeBlock()
        outputs.append(fileName)


    res["SourceDF"] = df.to_dict()
    fileName = settingsRow["outputDir"]+f"/{settingsRow['tableName']}.csv"
    df.to_csv(fileName, index= False)
    outputs.append(fileName)

    if settingsRow["zipResponse"]:
        # the zip file includes all intermediate dirs.
        # Move the operation to the dir where its occurying so as to have a lean zip file.  
        os.chdir(settingsRow["outputDir"])
        print(os.getcwd())
        fileName =  settingsRow["tableName"] + ".zip"
        with ZipFile(fileName, "w") as zipf:
            for output in outputs:
                output = output.replace(settingsRow["outputDir"]+"/", "")
                zipf.write(output)

        os.chdir("../"* len(settingsRow["outputDir"].split("/")))
        res["zipFile"] = settingsRow["outputDir"]+ "/"+ fileName  # ./upload/file_code/file_name/ file_name.zip
    return res