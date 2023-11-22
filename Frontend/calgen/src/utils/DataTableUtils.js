export class DataTableMethods{
    
    // Static Methods =============
    static getColumns_(datatable) {
        return Object.keys(datatable[0]);
    }

    static getValues_(datatable) {
        const values = datatable.map((row, index) => {
            return Object.values(row);
        });
        return values;
    }

    static getColumnValues_(datatable, columnName){
        return datatable.map((row)=>row[columnName])
    }

    static addColumn_(datatable, columnName, defaultValue) {
        console.log("adding col: ", datatable)
        const updatedRows = datatable.map((row, index) => {
            let value =
                defaultValue instanceof Function
                    ? defaultValue(row, index)
                    : defaultValue;

            let temp = {...row}
            temp[columnName] = value
            return temp;
        });
        return updatedRows;
    }

    static addRow_(datatable, index, row) {
        datatable.splice(index, 0, row);
        return datatable;
    }

    static addRowsStatic(datatable, index, rows) {
        const section1 = datatable.slice(0, index);
        const section2 = datatable.slice(index);
        return [...section1, ...rows, ...section2];
    }

    static updateRow_(datatable, index, row) {
        datatable.splice(index, 1, row);
        return datatable;
    }

    static updateWhere_(datatable, fieldValuePairs, condition) {
        const keys = Object.keys(fieldValuePairs);
        const values = Object.values(fieldValuePairs);
        const zippedKeyValuePairs = DataTable.zip_(keys, values);

        return datatable.map((row, index) => {
            const isUpdatable = condition(row);
            if (!isUpdatable) {
                return row;
            }

            const newRow = { ...row };
            zippedKeyValuePairs.map((keyValuePair, index) => {
                const [key, value] = keyValuePair;
                newRow[key] = value instanceof Function ? value(row) : row;
            });
            return newRow;
        });
    }
    static removeRow_(datatable, index) {
        datatable.splice(index, 1);
        return datatable;
    }

    static zip_(listOfLists) {
        return listOfLists[0].map((value, index) => {
            let result = [];

            for (let i = 0; i <= listOfLists.length - 1; i++) {
                result[i] = listOfLists[i][index];
            }
            return result;
        });
    }
}

export class DataTable extends DataTableMethods {
    datatable = null;
    constructor(datatable) {
        if(datatable !== undefined){
            this.setDataTable(datatable)
        }
    }
    
    getDataTable() {
        return this.datatable;
    }
    setDataTable(datatable) {
        this.datatable = datatable;
    }
    isEmpty(){
        return this.datatable === null
    }

    // exporting
    // importing
}


