import pandas as pd
import numpy as np
import json
import os

from Calgen.engine.TableTransform import FeaturesGenerator
from Calgen.engine.CodeContainer import CodeContainer
from zipfile import ZipFile
from Calgen.engine.config import templates_dir, defualt_templates, build_options, templates_util_functions

# --------------------------- Read in the source table. ---------------------------
def getSourceDF(filePath) -> pd.DataFrame | None:
    # handle for some thing like missing missing files.
    return pd.read_csv(filePath)

# --------------------------- Read in settings. ---------------------------
def getSettings(filePath) -> pd.DataFrame | None:
    jsonContent: dict | list
    settings: pd.DataFrame | pd.Series

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
    settings = None
    if isinstance(jsonContent, list):
        settings = pd.DataFrame(jsonContent)
    elif isinstance(jsonContent, dict):
        settings = pd.DataFrame(jsonContent, index=[0])


    for opt in build_options:
        if opt not in settings.columns:
            settings[opt] = np.nan

    return settings
# --------------------------- Generates CRUD and custom functions ---------------------------
def Generate(settingsRow:dict ):
    settingsRow= pd.Series(settingsRow)
    df = getSourceDF(settingsRow["tableFilePath"])
    customCols = settingsRow["customFields"] if (isinstance(settingsRow["customFields"], list))else ([])
    df = FeaturesGenerator(df, importantCols=[*customCols]).getDF()
    
    params = {
        "functions": templates_util_functions,
        "variables": {
            "table": df,
            "tableName": settingsRow["tableName"],
            "INPUTFORMAT1": settingsRow["inputFormat"].lower() == "single",
            "INPUTFORMAT2": settingsRow["inputFormat"].lower() == "array",
        }
    }

    if (isinstance(settingsRow["customTemplates"], list)):
        templates = [*defualt_templates, *settingsRow["customTemplates"]]

    outputs = []
    temp_dir = str(templates_dir)
    res = {}
    for template in templates:
        codeBlocks = CodeContainer()
        if (isinstance(settingsRow["customTemplates"], list) and (template in settingsRow["customTemplates"])):
            template = f"customs/{template}"

        codeBlocks.readTemplate([temp_dir, template], params)
        fileName = settingsRow["outputDir"] +  f"/{template.replace('.j2', '.txt')}"
        codeBlocks.writeCodeBlocks(fileName)

        res[template] = codeBlocks.getCodeBlock()
        outputs.append(fileName)

    res["SourceDF"] = df.to_dict()
    fileName = settingsRow["outputDir"]+f"/{settingsRow['tableName']}.csv"
    df.to_csv(fileName, index=False)
    outputs.append(fileName)

    if settingsRow["zipResponse"]:
        # the zip file includes all intermediate dirs.
        # Move the operation to the dir where its occurying so as to have a lean zip file.
        os.chdir(settingsRow["outputDir"])
        print(os.getcwd())
        fileName = settingsRow["tableName"] + ".zip"
        with ZipFile(fileName, "w") as zipf:
            for output in outputs:
                output = output.replace(settingsRow["outputDir"]+"/", "")
                zipf.write(output)

        os.chdir("../" * len(settingsRow["outputDir"].split("/")))
        res["zipFile"] = settingsRow["outputDir"] + "/" + fileName  
        # ./upload/file_code/file_name/ file_name.zip
    return res
