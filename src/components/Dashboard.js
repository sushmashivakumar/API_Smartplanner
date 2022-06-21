import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from 'primereact/dropdown';
import { Menubar } from "primereact/menubar";
import TableInfo from "./TableInfo";
// import Milestone from "./Milestone";
import PMO from "./pmo";
import Prognos from "./Prognos";
import { TabMenu } from "primereact/tabmenu";
import Mode from "./Mode";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Data, SummaryColumns, SummaryData, PMOColumns, PMOData } from "../data";
import { loadData } from "../features/tableInfo";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import Api from "../service/Api";
// import { dashboard } from "../service/Config";
import { Toolbar } from 'primereact/toolbar';
import { baseUrl } from '../service/Config';
import axios from 'axios';

const Dashboard = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [productDialog, setProductDialog] = useState(false);
  const [columnEdit, setColumnEdit] = useState(false);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [getTableData, setGetgetTableData] = useState([]);
  const userStore = useSelector((state) => state.userInfo);
  const [error, setError] = useState("");
  const [selectedMode, setSelectedMode] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const modes = [
    { name: 'All' },
    { name: 'Low Modify' },
    { name: 'Medium Modify' },
    { name: 'Heavy Modify' },

];
  
//   let emptyProduct = {
//     domain: null,
//     name: '',
//     image: null,
//     description: '',
//     category: null,
//     price: 0,
//     quantity: 0,
//     rating: 0,
//     inventoryStatus: 'INSTOCK'
// };
//   const [product, setProduct] = useState(emptyProduct);

  const tableInfo = useSelector((state) => state.tableInfo);
  const dispatch = useDispatch();
  const items = [

    { label: "PMO", icon: "pi pi-fw pi-flag-fill" },
    { label: "Development", icon: "pi pi-fw pi-slack" },
    { label: "Validation", icon: "pi pi-fw pi-check-circle" },
    { label: "Horizontal", icon: "pi pi-fw pi-arrows-h" },
    { label: "Budget", icon: "pi pi-fw pi-briefcase" },
    // { label: "Prognos", icon: "pi pi-fw pi-sitemap" },

  ];

  const exports = [
    { name: '', id: 1 },
    { name: 'Export to XLS', id: 2 },
    { name: 'Export to XLS with Prognos template', id: 3  },

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

  const CustomComponent = () => {
    let componentRender = "";
    switch (activeIndex) {
      case 0:
        componentRender = (
          <PMO columns={PMOColumns} data={PMOData} colEdit={columnEdit} />
        );
        break;
      // case 1:
      //   componentRender = (
      //     <Milestone
      //       tab={activeIndex}
      //       reset={setActiveIndex}
      //       colEdit={columnEdit}
      //     />
      //   );
      //   break;
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
  const onModeChange = (e) => {
    console.log( e, "this is mode")
    setSelectedMode(e.value);
    axios.post(baseUrl + '/filter_milestone', {"project_id":2,
    "mode": e.value.name} )

}
const submitpmo = (data) => {
  console.log( data, "this is post submit")
  const datas = {
    "project_id":3,
    "mode":"High",
    "popl_2":"3/11/2020",
    "popl_3":"10/12/2020",
    "po":"16/1/2021",
    "es":"20/1/2021",
    "ao":"10/2/2021",
    "bo":"5/3/2021",
    "alpha":"10/4/2020",
    "beta":"10/5/2021",
    "prq":"3/6/2021",
    "pv":"15/7/2021"
 }
  const res = axios.post(baseUrl + '/insert_milestone_date', { datas }).then((res) => {
    console.log( res, "this is post of pmo dates")
    const response = res;
  
            if (response.data.success) {
              setShowMessage(true);
            }
  
     
    }).catch(error => {
      setError(error)
    
  });
  console.log(res, "this is pmo post submit")
  // axios.post(baseUrl, data).then((res) => {
  //   console.log(res, "this is post");
  
  //         const response = res;
  //         if (response.data.success) {
  //           setShowMessage(true);
  //         }

   
  // }).catch(error => {
  //   setError(error)
  // });
  // setSelectedMode(e.value);
  // console.log( "this is mode")
}
  let headerGroup = <ColumnGroup>
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

      {
        columns.map(column => {
          return <Column header={column.header} />
        })
      }
    </Row>
  </ColumnGroup>;
    const openNew = () => {
     console.log('button clicked')
      // setGetgetTableData(emptyProduct);
      // setSubmitted(false);
      setProductDialog(true);
  }


  const exportExcel = () => {
    console.log('export button clicked')
     // setGetgetTableData(emptyProduct);
     // setSubmitted(false);
    //  setProductDialog(true);
 }

  useEffect(() => {
    let url = '';

    if (activeIndex === 1) { url = '/get_dev' }
    if (activeIndex === 2) { url = '/get_val' }
    if (activeIndex === 3) { url = '/get_hor' }
    Api.get(url).then(res => {
      console.log(res, "this is horizontal data")
      setGetgetTableData(res.data.data)
    }).catch(error => {
      setError(error);
    })

  }, [activeIndex]);
  // console.log(activeIndex, "this is ")

  useEffect(() => {
    if (!userStore.hasOwnProperty("useremail")) {
      navigate("/");
    }
    dispatch(loadData(Data));
  }, [userStore]);
  const leftToolbarTemplate = () => {
    return (
        <React.Fragment>
           {activeIndex === 0  ? (
            <div >
            
              <span style={{fontWeight:"600", fontSize:"18px"}}>
                Modes: 
              <Dropdown className="ml-2" value={selectedMode} options={modes} onChange={onModeChange} optionLabel="name" placeholder="Select a Mode" /></span>
              </div>
            
          
            ) : null}
         
          {activeIndex !== 0 && activeIndex !== 4 ? (
            <Button label="New" icon="pi pi-plus" className="p-button-rounded p-button-secondary mr-2" style={{backgroundColor:"#405685"}} onClick={openNew} />
            ) : null}
           
        </React.Fragment>
    )
}

const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
          
            {activeIndex !== 0 && activeIndex !== 4 ? (
            <Dropdown
              className="p-button-raised p-button-rounded mb-2 mr-2"
              style={{ color: "grey", border: "1px solid", borderRadius: "2rem", fontWeight: "700" }}
              value={selectedCity1}
              options={exports}
              onClick={exportExcel}
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
    )
}


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
      <Toolbar className="mb-2 pt-2 pb-2" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
      ) : null}
      {/* {activeIndex !== 0 && activeIndex !== 4 ? (
      <Button label="New" icon="pi pi-plus" className="p-button-rounded p-button-outlined mb-2 mr-2" style={{ color: "grey", float:"left" }} onClick={openNew} />
      ) : null} */}
        <div className="edit_button">
        
          {/* {activeIndex !== 0 && activeIndex !== 4 ? (
            <Dropdown
              className="p-button-raised p-button-rounded mb-2 mr-2"
              style={{ color: "grey", border: "1px solid", borderRadius: "2rem", fontWeight: "700" }}
              value={selectedCity1}
              options={exports}
              // onClick={exportExcel}
              // onChange={onCityChange}
              optionLabel="name"
              placeholder="Export"
              colEdit={columnEdit}
            />
          ) : null} */}
          {/* {columnEdit ? (
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
          )} */}
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
        <Button label="Submit" onClick={submitpmo} aria-label="Submit" style={{ display: "flex", float: "right", backgroundColor: '#405685' }} />
      ) : null}
    </div>
  );
};

export default Dashboard;
