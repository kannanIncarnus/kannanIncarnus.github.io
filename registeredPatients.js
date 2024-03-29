(function () {
    var myConnector = tableau.makeConnector();
    const limit = 1000;
    var pagenumber = 1;
    tableData = [];

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Registeredpatients List";
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

        var queryPath = "https://demo.incarnus.com:8080/thirdparty/tableauservice/patientreports/getregisteredpatientsdata/" + limit + "/" + pagenumber + "/" + modifiedat

        $.getJSON(queryPath, function (resp) {
            var data = resp.registeredpatients;
            var totalrecords = resp.totalrecords;

            data.sort(function(arg1,arg2){
                return new Date(arg1.createdat) - new Date(arg2.createdat);
            });

            console.log("totalRecords in the collection: " + totalrecords);
                // Iterate over the JSON object
                for (var i = 0, len = data.length; i < len; i++) {
                    var serialno = (limit * (pagenumber-1)) + i;
                    tableData.push({
                        "SNo": String(serialno+1),
                        "regid": data[i].regid,
                        "id": data[i]._id,
                        "PatientName": data[i].firstname,
                        "createdat": data[i].createdat,
                        "regdatetime": data[i].regdatetime,
                        "hospital": data[i].hospital,
                        "hospitalunit": data[i].hospitalunit,
                        "mrn": data[i].mm, //mrn
                        "gender": data[i].gender,
                        "agegroup": data[i].agegroup,
                        "age": data[i].age,
                        "patienttype": data[i].patienttype,
                        "country": data[i].country,
                        "state": data[i].state,
                        "city": data[i].city,
                        "pincode": data[i].zipcode,
                        "latitude": data[i].hosplatitude,
                        "longitude": data[i].hosplongitude,
                        "createdby": data[i].createdby,
                        "createddatetime": data[i].createddatetime,
                        "modifiedby": data[i].modifiedby,
                        "modifieddatetime": data[i].modifieddatetime
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
            var cols = [{
                id: "regid",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "SNo",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "id",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "hospital",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "hospitalunit",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "PatientName",
                alias: "Patient Name",
                dataType: tableau.dataTypeEnum.string
            }
            , {
                id: "createdat",
                alias: "createdat",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "gender",
                alias: "gender",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "agegroup",
                alias: "agegroup",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "age",
                alias: "age",
                dataType: tableau.dataTypeEnum.int
            }, {
                id: "mrn",
                alias: "mrn",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id:"regdatetime",
                dataType: tableau.dataTypeEnum.date
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
            },  
            {
                id: "createddatetime",
                alias: "createddatetime",
                dataType: tableau.dataTypeEnum.date
            }, 
            {
                id: "createdby",
                alias: "createdby",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "modifiedby",
                alias: "modifiedby",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "modifieddatetime",
                alias: "modifieddatetime",
                dataType: tableau.dataTypeEnum.date
            }
        ];
        
            var tableSchema = {
                id: "Registered",
                alias: "Patient reports are listed here...........",
                columns: cols,
                incrementColumnId: "modifieddatetime"
            };
        
            schemaCallback([tableSchema]);
        };

        tableau.registerConnector(myConnector);

    })();
