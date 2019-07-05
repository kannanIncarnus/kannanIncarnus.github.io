(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Admission List";
            tableau.submit();
        });
    });

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getpatients/2019-06-01/2019-07-04", function(resp) {
            var data = resp.patients,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "ADMISSIONID": data[i]._id,
                    "ADMISSIONDATETIME": data[i].registereddate,
                    "DischargeDateTime": data[i]._id, //To Check
                    "DISCWARD": data[i]._id, //To Check
                    "OPVISITDATE": data[i].mrn,
                    "FOLLOWUPDATE": data[i].gender,
                    "createdby": data[i]._id, //To Check
                    "createddatetime": data[i].patienttype,
                    "modifiedby": data[i].country,
                    "modifieddatetime": data[i].state,
                    "DIDTRIAGE": data[i].city,
                    "Readmission Date": data[i].zipcode,
                    "ReadmissionDoctor": data[i]._id, //To Check
                    "ReadmissionDepartment": data[i]._id, //To Check
                    "Admission Type": data[i]._id //To Check
                });
            }
            table.appendRows(tableData);
            doneCallback();
        });
    };
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            {
            id: "ADMISSIONDATETIME",
            dataType: tableau.dataTypeEnum.string
            },{
            id: "DischargeDateTime",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "DISCWARD",
            alias: "DISCWARD",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "BedName",
            alias: "BedName",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "OPVISITDATE",
            alias: "OPVISITDATE",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id:"FOLLOWUPDATE",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id: "createdby",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "createddatetime",
            alias: "createddatetime",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "modifiedby",
            alias: "modifiedby",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "DIDTRIAGE",
            alias: "DIDTRIAGE",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id:"Readmission Date",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"ReadmissionDoctor",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"ReadmissionDepartment",
            dataType: tableau.dataTypeEnum.string},{
            id:"Admission Type",
            dataType: tableau.dataTypeEnum.string}];
            
        var tableSchema = {
            id: "patientFeed",
            alias: "Patient reports are listed here...........",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
})();
