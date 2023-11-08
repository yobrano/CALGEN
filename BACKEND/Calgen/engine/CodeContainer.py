from jinja2 import Environment, FileSystemLoader


class CodeContainer:

    """
    cls: `ClassContainer` manages lines and blocks of code.
    attr: `codeLines` is a list that houses lines and blocks of code. 
    """
    codeLines: list[str] = []

    def __init__(self, sep="\n\n"):
        self.clear()
        self.separator = sep

    def clear(self):
        self.codeLines = []

    def getCodeBlock(self):
        return "\n".join(self.codeLines)

    def addLine(self, line):
        self.codeLines.append(line)

    def skipLine(self):
        self.addLine("\n")

    def addIndentLine(self, line, tabs=1):
        tabs = '\t'*(tabs)
        self.addLine(f"{tabs}{line}")

    def addFlushLine(self, line):
        line.strip()
        line.replace('\t', "")

        self.addLine(line)

    def readTemplate(self, templatePath: list, params: dict):
        """
        fn:`readTemplate` reads and populates a template. it updates existing lines in the code block.
        param:`templatePath` is list of two elements, directories to the template and the template file itself.
        param:`params` is a dictionary of two elements, variables and functions to be passed onto a template 
        """
        tempDir = templatePath[0]
        tempFile = templatePath[1]

        env = Environment(loader=FileSystemLoader(tempDir),
                          trim_blocks=True, lstrip_blocks=True, )
        template = env.get_template(tempFile)

        template.globals.update(**params["functions"])
        rendered = template.render(**params["variables"])
        self.addLine(rendered)

    def writeCodeBlocks(self, filePath):
        """
        param:`filePath` is the destination where all lines in this code block will be output.
        """
        import os

        # error handling for non existant paths
        dirs = filePath.split("/")[:-1]
        if (len(dirs)):
            dirs = "/".join(dirs)
            os.makedirs(dirs, exist_ok=True)

        # write out the code blocks
        with open(filePath, 'w') as f:
            f.writelines(self.getCodeBlock())
            f.close()

        return self.getCodeBlock().strip()
