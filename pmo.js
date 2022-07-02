import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import Api from "../service/Api";
import { useNavigate } from "react-router-dom";
import "./DataTableDemo.css";

function PMO({ columns, data, colEdit, handleTableData }) {
  let navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(null);

  const [milestoneEdit, setMilestoneEdit] = useState(false);
  const [milestoneDate, setMilestoneDate] = useState({});
  const [date3, setDate3] = useState(null);
  const [getDate, setGetDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const modes = [
    { name: "Low Modify" },
    { name: "Medium Modify" },
    { name: "Heavy Modify" },
  ];
  const cellEditor = (options) => {
    // return textEditor(options);
    console.log("options", options);
    return (
      <Calendar
        id="icon"
        value={date3 !== '' ? date3 : options.value}
        onChange={(e) => {
          console.log("eeeee", e);
          let date = new Date(e.value);
          let dd = date.getDate();
          let mm = date.getMonth() + 1;
          let yyyy = date.getFullYear();
          console.log('date', date)
          setDate3(dd + "/" + mm + "/" + yyyy)
        }}
        showIcon
        name="popl_2"
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, newRowData, originalEvent: event } = e;
    console.log("e", e);
    console.log(date3)
    let data = { ...newRowData, [field]: date3 };
    console.log('final', data)

    handleTableData(data);
  };

  const onModeChange = (e) => {
    setSelectedMode(e.value);
  };

  const textEditor = (options) => {
    console.log(options);
    if (options.field === "milestone") return options.value;

    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => {
          console.log(options);
          options.editorCallback(e.target.value);
        }}
      />
    );
  };

  const milestoneTemplate = () => {
    return "Date";
  };
  const dateTemplate = (rowData) => {
    return (
      <div className="field col-12 md:col-12">

        <Calendar
          id="icon"
          // className="p-button-rounded p-button-outlined mb-2"
          value={milestoneDate[rowData.milestone] || null}
          onChange={(e) => {
            setMilestoneDate({
              ...milestoneDate,
              [rowData.milestone]: e.value,
            });
          }}
          showIcon
          {...(!milestoneEdit ? { disabled: true } : {})}
        />
      </div>
    );
  };

  useEffect(() => {
  //   // Temporary
  //   // const getPMO = [
  //   //   {
  //   //     alpha: "10/4/2020",
  //   //     ao: "10/2/2021",
  //   //     beta: "10/5/2021",
  //   //     bo: "5/3/2021",
  //   //     es: "20/1/2021",
  //   //     milestone_id: 1,
  //   //     mode: "High",
  //   //     po: "16/1/2021",
  //   //     popl_2: "3/11/2020",
  //   //     popl_3: "10/12/2020",
  //   //     project_id: 2,
  //   //     prq: "3/6/2021",
  //   //     pv: "15/7/2021",
  //   //   },
  //   // ];
  //   // setGetDate(getPMO);
  //   //Temporary End

    Api.get("/get_milestone_date")
      .then((res) => {
        console.log(res, "this is date")
        setGetDate(res.data.data);
      })
      .catch((error) => {
        setError(error);
      });
    // setProjectList(projects);
  }, []);

  return (
    <div>

      <div className="card">
        <DataTable
          value={data}
          //   editMode="cell"
          className="datatable-editing-demo"
          style={{ border: "1px solid grey" }}
          responsiveLayout="scroll"
          scrollable
          scrollHeight="400px"
        >
          <Column field="milestone" header="Milestone" body={milestoneTemplate}>
            Date
          </Column>
          {columns.map(({ field, header }) => {
            return (
              <Column
                key={field}
                field={field}
                header={header}
                // body={dateTemplate}
                style={{ width: "30%" }}
                {...(colEdit
                  ? { editor: (options) => cellEditor(options) }
                  : {})}
                {...(colEdit ? { onCellEditComplete: onCellEditComplete } : {})}
              />

            );
          })}
        </DataTable>
      </div>
    </div>
  );
}

export default PMO;