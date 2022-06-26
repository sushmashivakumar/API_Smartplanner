import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Menubar } from "primereact/menubar";
import TableInfo from "./TableInfo";
import PMO from "./pmo";
import { TabMenu } from "primereact/tabmenu";
import Mode from "./Mode";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Data,
  SummaryColumns,
  SummaryData,
  PMOColumns,
  PMOData,
} from "../data";
import { loadData } from "../features/tableInfo";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import Api from "../service/Api";
import { Toolbar } from "primereact/toolbar";

const Dashboard = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [productDialog, setProductDialog] = useState(false);
  const [columnEdit, setColumnEdit] = useState(false);
  const [getDate, setGetDate] = useState([]);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [getTableData, setGetTableData] = useState([]);

  const userStore = useSelector((state) => state.userInfo);
  const [error, setError] = useState("");
  const [selectedMode, setSelectedMode] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const modes = [
    { name: "Low Modify" },
    { name: "Medium Modify" },
    { name: "Heavy Modify" },
  ];



  const tableInfo = useSelector((state) => state.tableInfo);
  const dispatch = useDispatch();
  const items = [
    { label: "PMO", icon: "pi pi-fw pi-flag-fill" },
    { label: "Development", icon: "pi pi-fw pi-slack" },
    { label: "Validation", icon: "pi pi-fw pi-check-circle" },
    { label: "Horizontal", icon: "pi pi-fw pi-arrows-h" },
    { label: "Budget", icon: "pi pi-fw pi-briefcase" },

  ];

  const exports = [
    { name: "" },
    { name: "Export to XLS" },
    { name: "Export to XLS with Prognos template" },
  ];

  // const UserInfo = () => {
  //   return <div> Welcome, Sushma</div>;
  // };

  const columns = [
    { field: "function_owner", header: "Function Owner" },
    { field: "function", header: "Function" },
    { field: "feature_owner", header: "Feature Owner" },
    { field: "domain", header: "Domain" },
    { field: "features", header: "Features" },
    { field: "status", header: "Feature ON/OFF" },
    { field: "mode", header: "Feature Mode" },
    { field: "q1", header: "Q1" },
    { field: "q2", header: "Q2" },
    { field: "q3", header: "Q3" },
    { field: "q4", header: "Q4" },
    { field: "q5", header: "Q5" },
    { field: "q6", header: "Q6" },
    { field: "q7", header: "Q7" },
    { field: "q8", header: "Q8" },
    { field: "q9", header: "Q9" },
    // { field: "q10", header: "Q10" },
    // { field: "q11", header: "Q11" },
    // { field: "q12", header: "Q12" },
    // { field: "q13", header: "Q13" },
    { field: "total_till_prq", header: "Total till PRQ" },
    { field: "estimation_type", header: "Estimation Type" },
  ];

  const handlePMOData = (data) => {
    console.log('submit', data)
  }

  const CustomComponent = () => {
    let componentRender = "";
    switch (activeIndex) {
      case 0:
        componentRender = (
          <PMO columns={PMOColumns} data={getDate} colEdit={columnEdit} handleTableData={submitpmo} />
        );
        break;

      case 4:
        componentRender = (
          <TableInfo columns={SummaryColumns} data={SummaryData} />
        );
        break;
      default:
        break;
    }
    return componentRender;
  };

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="" rowSpan={1} colSpan={12} />
        <Column header="SI Milestone" colSpan={3} />
        <Column header="PO" />
        <Column header="A1" />
        <Column header="PRQ" />
      </Row>
      <Row>
        <Column header="" rowSpan={1} colSpan={12} />
        <Column header="PX Milestone" colSpan={3} />
        <Column header="Alpha" />
        <Column header="Beta" />
        <Column header="PV" />
      </Row>
      <Row>
        {columns.map((column) => {
          return <Column header={column.header} />;
        })}
      </Row>
    </ColumnGroup>
  );
  const openNew = () => {
    console.log("button clicked");
    setProductDialog(true);
  };

  const handleTableData = (data) => {
    const newTableInfo = tableInfo.map((table, index) => {
      if (index === data.rowIndex) {
        return { ...table, ...data.newRowData };
      }
      return table;
    });
    dispatch(loadData(newTableInfo));
  };

  const handleColumnEdit = () => {
    setColumnEdit(true);
  };

  const handleCancelEdit = () => {
    setColumnEdit(false);
  };

  // API

  // POST API-Filter Milestone mode wise

  const onModeChange = (e) => {
    console.log(e, "this is mode");
    setSelectedMode(e.value);
    console.log('userStore', userStore)
    const data = { project_id: userStore.project_name.project_id, mode: e.value.name, }
    Api.post('/filter_milestone', data).then((res) => {
      console.log(res, "this is response");
      const response = res;
      if (response.status == 200) {
        setShowMessage(true);
      }
    })
      .catch((error) => {
        setError(error);
      })

  };
  const submitpmo = (data) => {
    console.log(data, "this is post submit");


    // POST Api call for submit Inserting and updating milestone date

    Api.post('/insert_update_milestone_date', data).then((res) => {
      console.log(res, "this is response");
      const response = res;
      if (response.status == 200) {
        // Handle Response
        setShowMessage(true);
      }
    })
      .catch((error) => {
        setError(error);
      })

  };


  // GET API for milestone date
  const milestoneData = () => {
    Api.get("/get_milestone_date")
    .then((res) => {
      console.log(res, "this is date")
      setGetDate(res.data.data);
    })
    .catch((error) => {
      setError(error);
    });
  }

  useEffect(() => {
    milestoneData();
  }, []);

  // GET API for Dev, Hor and Validation

  useEffect(() => {
    let url = "";

    if (activeIndex === 1) {
      url = "/get_dev";
    }
    if (activeIndex === 2) {
      url = "/get_val";
    }
    if (activeIndex === 3) {
      url = "/get_hor";
    }
    setGetTableData(tableInfo);
    Api.get(url)
      .then((res) => {
        console.log(res, "this is horizontal data");
        setGetTableData(res.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [activeIndex]);


  useEffect(() => {
    if (!userStore.hasOwnProperty("useremail")) {
      navigate("/");
    }
    dispatch(loadData(Data));
  }, [userStore]);
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {activeIndex === 0 ? (
          <div>
            <span style={{ fontWeight: "600", fontSize: "18px" }}>
              Modes:
              <Dropdown
                className="ml-2"
                value={selectedMode}
                options={modes}
                onChange={onModeChange}
                optionLabel="name"
                placeholder="Select a Mode"
              />
            </span>
          </div>
        ) : null}

        {activeIndex !== 0 && activeIndex !== 4 ? (
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-rounded p-button-secondary mr-2"
            style={{ backgroundColor: "#405685" }}
            onClick={openNew}
          />
        ) : null}
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {activeIndex !== 0 && activeIndex !== 4 ? (
          <Dropdown
            className="p-button-raised p-button-rounded mb-2 mr-2"
            style={{
              color: "grey",
              border: "1px solid",
              borderRadius: "2rem",
              fontWeight: "700",
            }}
            value={selectedCity1}
            options={exports}
            // onClick={exportExcel}
            // onChange={onCityChange}
            optionLabel="name"
            icon="pi pi-upload"
            placeholder="Export"
            colEdit={columnEdit}
          />
        ) : null}

        {activeIndex !== 4 && columnEdit ? (
          <Button
            className="p-button-rounded p-button-outlined mb-2"
            icon="pi pi-times"
            style={{ color: "grey" }}
            onClick={handleCancelEdit}
          />
        ) : (
          <Button
            label="Edit"
            className="p-button-rounded p-button-outlined mb-2"
            icon="pi pi-user-edit"
            style={{ color: "grey" }}
            onClick={handleColumnEdit}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="datatable-editing-demo">
      <Toast ref={toast} />
      {/* <Menubar end={<UserInfo />} /> */}

      <div>
        <div className="card">
          <TabMenu
            model={items}
            activeIndex={activeIndex}
            onTabChange={(e) => {
              console.log(e);
              setActiveIndex(e.index);
            }}
          />
        </div>
      </div>

      <div>
        {activeIndex !== 4 ? (
          <Toolbar
            className="mb-2 pt-2 pb-2"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
        ) : null}

        <div className="edit_button">

        </div>
        <CustomComponent />
        {activeIndex !== 0 && activeIndex !== 4 ? (
          <TableInfo
            columns={columns}
            data={getTableData}
            // handleTableData={handleTableData}
            colEdit={columnEdit}
            custHeader={true}
            customHeader={headerGroup}
          />
        ) : null}
      </div>
      {activeIndex !== 4 ? (
        <Button
          label="Submit"
          onClick={submitpmo}
          aria-label="Submit"
          style={{
            display: "flex",
            float: "right",
            backgroundColor: "#405685",
          }}
        />
      ) : null}
    </div>
  );
};

export default Dashboard;