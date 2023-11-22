from pathlib import Path
from Calgen.engine.TemplatesFns import NameSyntax, CALSerializer

templates_dir = Path(__file__).parent / "templates"

defualt_templates = [
    "Create Item.j2",
    "Get Item.j2",
    "Get Range.j2",
    "Update Item.j2",
    "Delete Item.j2",
    "Serializer.j2",
]

templates_util_functions = {
            "toJSONVarName": NameSyntax.toJSONVarName,
            "toCALVarName": NameSyntax.toCALVarName,
            "CalSerializer": CALSerializer,
            "zip": zip,
            "str": str,
            "type": type,
            "enumerate": enumerate,
        }

build_options = [
    "tableName",
    "tableFilePath",
    "outputDir",
    "inputType",
    "customTemplates",
    "customFields",
    "zipResponse"
]

importantColumns = [
            "Field Name",
            "Retained Field",
            "Primary Key",
            "Foreign Key",
            "Data Type",
            "Option String",
        ]