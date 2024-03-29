(function () {
    var myConnector = tableau.makeConnector();
    const limit = 1000;
    var pagenumber = 1;
    tableData = [];

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Admission List";
            tableau.submit();
        });
    });

    myConnector.getData = function (table, doneCallback) {
        var modifiedat = table.incrementValue

        if (!modifiedat) {
            modifiedat = "2000-01-01"
        }
        else {
            console.log("modifiedat: " + modifiedat);
        }

        var queryPath = "https://demo.incarnus.com:8080/thirdparty/tableauservice/patientreports/getadmissionlist/" + limit + "/" + pagenumber + "/" + modifiedat

        $.getJSON(queryPath, function (resp) {
            var data = resp.admissionlist;
            var totalrecords = resp.totalrecords;

            data.sort(function(a,b){
                return new Date(a.createdat) - new Date(b.createdat);
            });
            console.log("totalRecords in the collection: " + totalrecords);
                // Iterate over the JSON object
                for (var i = 0, len = data.length; i < len; i++) {
                    var serialno = (limit * (pagenumber-1)) + i;
                    tableData.push({
                    "SNo": String(serialno+1),
                    "ADMISSIONID": data[i]._id,
                    "ADMISSIONDATETIME": data[i].admitdate,
                    "ADMITDEPARTMENT": data[i].department,
                    "ADMITDOCTOR": data[i].careprovider,
                    "hospital": data[i].hospital,
                    "hospitalunit": data[i].hospitalunit,
                    "mrn": data[i].mrn,
                    "Payor": data[i].payor1,
                    "gender": data[i].gender,
                    "agegroup": "", //Missing
                    "age": data[i].age,
                    "patienttype": data[i].patienttype,
                    "country": data[i].country,
                    "state": data[i].state,
                    "city": data[i].city,
                    "pincode": data[i].zipcode,
                    "DischargeDateTime": data[i].dischargedate,
                    "DISCWARD": data[i].ward,
                    "OPVISITDATE": data[i].registereddate,
                    "FOLLOWUPDATE": data[i].followupdate, //To Check
                    "BedName": data[i].bed,
                    "createdby": data[i].createdby,
                    "createddatetime": data[i].createdat,
                    "modifiedby": data[i].modifiedby,
                    "modifieddatetime": data[i].modifiedat,
                    "DIDTRIAGE": data[i].triage,
                    "Readmission Date": data[i].admitdate,
                    "ReadmissionDoctor": data[i].careprovider,
                    "ReadmissionDepartment": data[i].department,
                    "Admission Type": data[i].encounter
                });
            }

            var currentrecords = (limit * pagenumber);
            if (currentrecords < totalrecords) {
                console.log("Fetching Again with currentrecords: " + currentrecords);
                pagenumber++;
                myConnector.getData(table, doneCallback);
            }
            else {
                pagenumber = 1;
                table.appendRows(tableData);
                console.log("CompletedRecords: " + tableData.length);
                tableData = [];
                doneCallback();
            }
        });
    };

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            {
                id: "SNo",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "ADMISSIONID",
                alias: "ADMISSIONID",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "ADMISSIONDATETIME",
                alias: "ADMISSIONDATETIME",
                dataType: tableau.dataTypeEnum.date
            },
            {
                id: "ADMITDEPARTMENT",
                alias: "ADMITDEPARTMENT",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "ADMITDOCTOR",
                alias: "ADMITDOCTOR",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "mrn",
                alias: "mrn",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "Payor",
                alias: "Payor",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "gender",
                alias: "gender",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "age",
                alias: "age",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "hospital",
                alias: "hospital",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "hospitalunit",
                alias: "hospitalunit",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "agegroup",
                alias: "agegroup",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "patienttype",
                alias: "patienttype",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "country",
                alias: "country",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "state",
                alias: "state",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "city",
                alias: "city",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "pincode",
                alias: "pincode",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "DischargeDateTime",
                alias: "DischargeDateTime",
                dataType: tableau.dataTypeEnum.date
            }, {
                id: "DISCWARD",
                alias: "DISCWARD",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "OPVISITDATE",
                alias: "OPVISITDATE",
                dataType: tableau.dataTypeEnum.date
            }, {
                id: "FOLLOWUPDATE",
                alias: "FOLLOWUPDATE",
                dataType: tableau.dataTypeEnum.date
            }, {
                id: "BedName",
                alias: "BedName",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "createdby",
                alias: "createdby",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "createddatetime",
                alias: "createddatetime",
                dataType: tableau.dataTypeEnum.date
            },{
                id: "modifiedby",
                alias: "modifiedby",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "modifieddatetime",
                alias: "modifieddatetime",
                dataType: tableau.dataTypeEnum.date
            },{
                id: "DIDTRIAGE",
                alias: "DIDTRIAGE",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "ReadmissionDate",
                alias: "ReadmissionDate",
                dataType: tableau.dataTypeEnum.date
            },{
                id: "ReadmissionDoctor",
                alias: "ReadmissionDoctor",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "ReadmissionDepartment",
                alias: "ReadmissionDepartment",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "AdmissionType",
                alias: "AdmissionType",
                dataType: tableau.dataTypeEnum.string
            }
        ];

        var tableSchema = {
            id: "patientFeed",
            alias: "Patient reports are listed here...........",
            columns: cols,
            incrementColumnId: "createddatetime"
        };

        schemaCallback([tableSchema]);
    };

    tableau.registerConnector(myConnector);

})();