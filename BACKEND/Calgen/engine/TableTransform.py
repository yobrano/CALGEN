import pandas as pd
import numpy as np
from module.ForeignKeyReference import ForeignKeyReference as FKReference
from module.TemplatesFns import NameSyntax


class FeaturesGenerator:
    importantCols: list[str]
    sourceDF: pd.DataFrame

    def __init__(self,  data: pd.DataFrame,  importantCols: list[str] | None = None, importantRows: dict | None = None) -> None:

        self.sourceDF = data
        self.setImportantRows(importantRows)
        self.setImportantCols(importantCols)
        self.setForeignKeyProps()
        self.setTypeIndex()
        self.setOptions()

    def getDF(self) -> pd.DataFrame:
        return self.sourceDF

    def setImportantCols(self, columns: list[str] | None) -> pd.DataFrame:
        # User should ensure all important cols are in the src DF - not doing exceptions
        importantColumns = [
            "Field Name",
            "Retained Field",
            "Primary Key",
            "Foreign Key",
            "Data Type",
            "Option String",
        ]
        self.importantCols = importantColumns
        if (columns != None):
            importantColumns = [*importantColumns, *columns]
            # unique emlements only
            self.importantCols = list(set(importantColumns))

        self.sourceDF = self.sourceDF[self.importantCols]
        return self.sourceDF

    def setImportantRows(self, importantRows: dict | None = None):
        """ Applies filters onto fields to find out what needs to be retained. """
        # {col: filter }
        self.sourceDF = self.sourceDF.loc[self.sourceDF["Retained Field"].notna(
        )]
        return self.sourceDF

    def destructureKeyRef(key):
        if (type(key) != str):
            return [np.nan, [], []]
        key = FKReference(key)
        return key.toList()

    def setForeignKeyProps(self):
        # Generate new fields based on foreign keys
        resValues = self.sourceDF["Foreign Key"].apply(
            FeaturesGenerator.destructureKeyRef)

        # Destructure manually since list elemnts are present in resValue[1, 2]
        resValues = [[col[0], col[1], col[2]] for col in resValues]
        resCols = ["Foreign Table", "Filter Field", "Assign Field"]
        resDF = pd.DataFrame(resValues, columns=resCols)

        self.sourceDF = self.sourceDF.join(resDF)
        return self.sourceDF

    def setTypeIndex(self):
        self.sourceDF["Json Type"] = self.sourceDF["Data Type"].apply(
            NameSyntax.JSONType)
        self.sourceDF["Type Index"] = np.nan

        res = []
        jsonTypes = self.sourceDF["Json Type"].unique()
        temp: pd.DataFrame
        for jsonType in jsonTypes:
            typeCount = self.sourceDF.query(
                f"`Json Type` == '{jsonType}'").shape[0]
            temp = self.sourceDF.query(f"`Json Type` == '{jsonType}'").copy()
            temp["Type Index"] = np.arange(1, typeCount + 1, 1)
            res.append(temp)

        self.sourceDF = pd.concat(res)
        # Uncomment for sorting by index. -> Default sort by Type
        self.sourceDF = self.sourceDF.sort_index()
        # self.sourceDF = self.sourceDF.sort_values(by= ["Json Type", "Type Index"],  ascending= True)
        return self.sourceDF

    def getTypeCount(self) -> dict:
        jsonTypes = self.sourceDF["Json Type"].unique()
        res = {}
        for jsonType in jsonTypes:
            typeCount = self.sourceDF.query(
                f'`Json Type` == "{jsonType}"').shape[0]
            res[jsonType] = typeCount
        return res

    def splitOptions(optString) -> list:
        if (type(optString) == str):
            return optString.split(",")
        else:
            return []

    def setOptions(self):
        self.sourceDF["Option List"] = self.sourceDF["Option String"].map(
            FeaturesGenerator.splitOptions)
        return self.sourceDF


if __name__ == "__main__":
    from Setup import getSourceDF
    df = getSourceDF("data/Employees.csv")
    df = FeaturesGenerator(df).getDF()
    print(df.head())
    pass
