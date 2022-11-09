import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import TableInfo from "./TableInfo";
import Pmo from "./Pmo";
import { TabMenu } from "primereact/tabmenu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import {
  Data,
  SummaryColumns,
  // SummaryData,
  PMOColumns,
  Developement
} from "../data";
import { loadData } from "../features/tableInfo";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import Api from "../service/Api";
import { Toolbar } from "primereact/toolbar";
import { exports, modes, items, columns } from '../shared/utils'

const Dashboard = () => {
  let emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    // price: 0,
    // quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK'
};
const estimations = [
  { name: 'HC'  },
  { name: 'BTI' },
  { name: 'Hardware Resorces' },

];
  const toast = useRef(null);
  const navigate = useNavigate();

  // Internal State
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [columnEdit, setColumnEdit] = useState(false);
  const [estimationType, setEstimationType] = useState(null);
  const [getTableData, setGetgetTableData] = useState([]);
  const userStore = useSelector((state) => state.userInfo);
  const [error, setError] = useState("");
  const [selectedMode, setSelectedMode] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [pmoData, setPMOData] = useState([]);
  const [budgetData, setbudgetData] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [value2, setValue2] = useState(0.00);
  const [value3, setValue3] = useState(0.00);
  const [value4, setValue4] = useState(0.00);
  const [value5, setValue5] = useState(0.00);
  const [value6, setValue6] = useState(0.00);
  const [value7, setValue7] = useState(0.00);
  const [value8, setValue8] = useState(0.00);
  const [value9, setValue9] = useState(0.00);
  const [value10, setValue10] = useState(0.00);
  const [value11, setValue11] = useState(0.00);
  const [value12, setValue12] = useState(0.00);
  const [value13, setValue13] = useState(0.00);
  const [value14, setValue14] = useState(0.00);
  // Redux
  const tableInfo = useSelector((state) => state.tableInfo);
  const dispatch = useDispatch();

  const CustomComponent = () => {
    let componentRender = "";
    switch (activeIndex) {
      case 0:
        componentRender = (
          <Pmo
            columns={PMOColumns}
            data={pmoData}
            colEdit={columnEdit}
            handleTableData={submitpmo}
          />
        );
        break;
      case 4:
        componentRender = (
          <TableInfo
            columns={SummaryColumns}
            data={budgetData}
            handleTableData={submitpmo}
          />
        );
        break;
      default:
        break;
    }
    return componentRender;
  };

  const onEstimationChange = (e) => {
    setEstimationType(e.value);
}
const openNew = () => {
  setProduct(emptyProduct);
  setSubmitted(false);
  setProductDialog(true);
}

const hideDialog = () => {
  setSubmitted(false);
  setProductDialog(false);
}


const saveProduct = () => {
  setSubmitted(true);

  if (product.name.trim()) {
      let _products = [...products];
      let _product = {...product};
      if (product.id) {
          const index = findIndexById(product.id);

          _products[index] = _product;
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
          _product.id = createId();
          _product.image = 'product-placeholder.svg';
          _products.push(_product);
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
  }
}

const editProduct = (product) => {
  setProduct({...product});
  setProductDialog(true);
}

const confirmDeleteProduct = (product) => {
  setProduct(product);
  setDeleteProductDialog(true);
}

const deleteProduct = () => {
  let _products = products.filter(val => val.id !== product.id);
  setProducts(_products);
  setDeleteProductDialog(false);
  setProduct(emptyProduct);
  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

const createId = () => {
  let id = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}



const onCategoryChange = (e) => {
  let _product = {...product};
  _product['category'] = e.value;
  setProduct(_product);
}
const onCategoryChange1 = (e) => {
  let _product = {...product};
  _product['category'] = e.value;
  setProduct(_product);
}

const onInputChange = (e, name) => {
  const val = (e.target && e.target.value) || '';
  let _product = {...product};
  _product[`${name}`] = val;

  setProduct(_product);
}
const onInputChange1 = (e, name1) => {
  const val = (e.target && e.target.value) || '';
  let _product = {...product};
  _product[`${name1}`] = val;

  setProduct(_product);
}
const onInputChange2 = (e, name2) => {
  const val = (e.target && e.target.value) || '';
  let _product = {...product};
  _product[`${name2}`] = val;

  setProduct(_product);
}
const onInputChange3 = (e, name3) => {
  const val = (e.target && e.target.value) || '';
  let _product = {...product};
  _product[`${name3}`] = val;

  setProduct(_product);
}


const productDialogFooter = (
  <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
  </React.Fragment>
);


  const handleColumnEdit = () => {
    setColumnEdit(true);
  };

  const handleCancelEdit = () => {
    setColumnEdit(false);
  };
  const onModeChange = (e) => {
    const data = {
      project_id: userStore.project_name.project_id,
      mode: e.value.name,
    };
    Api.post("/filter_milestone", data).then((res) => {
      const response = res;
      if (response.status == 200) {
        // Handle Response
      }
    });
    setSelectedMode(e.value);
  };

  const submitpmo = (data) => {
    let url = "";
    // Api call for submit
    console.log(activeIndex, "active")
    if (activeIndex === 0) {
      Api.post("/insert_update_milestone_date", data).then((res) => {
        const response = res;
        if (response.status == 200) {
          // Handle Response
          // Updating data after success in API
          if (activeIndex === 0) {
            getPMOData();
          }
          if (activeIndex !== 0) {
            getApiData();
          }
        }
      });
      console.log('data', data)
      // setPMOData([data])
    }

    if (activeIndex === 1) {
      url = "/insert_update_records"; // change url
    }
    if (activeIndex === 2) {
      url = "/insert_update_records"; // change url
    }
    if (activeIndex === 3) {
      url = "/insert_update_records"; // change url
    }

    if (activeIndex !== 0 && activeIndex !== 4) {

      Api.post(url, { data: [data] }).then((res) => {
        const response = res;
        if (response.status == 200) {
          // Handle Response
          // Updating data after success in API
          if (activeIndex === 0) {
            getPMOData();
          }
          if (activeIndex !== 0) {
            getApiData();
          }
        }
      });
    }
    setColumnEdit(false);
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

 

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
         {activeIndex !== 0 && activeIndex !== 4 ? (
         <Button label="New" icon="pi pi-plus" className="p-button-raised p-button-rounded mb-2 mr-2" style={{
          backgroundColor:"transparent",
          float:"left",
              color: "grey",
              border: "1px solid",
              borderRadius: "2rem",
              fontWeight: "700",
            }} onClick={openNew} />
            ) : null}
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

       
      </React.Fragment>
    );
  };

  //Export Excel
  const handleExport = (e) => {
    if (e.value === "xls") {
      axios({
        url: 'http://10.49.3.7:5000/download',
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.xls'); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    }
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
            value={estimationType}
            options={exports}
            // onClick={exportExcel}
            onChange={handleExport}
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

  const getApiData = (data) => {
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
    if (activeIndex !== 0 && activeIndex !== 4) {
      Api.get(url)
        .then((res) => {
          setGetgetTableData(res.data.data);
        })
        .catch((error) => {
          setError(error);
        });
        setGetgetTableData(Developement)
    }
    if (activeIndex === 4) {
      // setbudgetData(SummaryData);
      Api.post("/get_budget", {project_id:userStore.project_name.project_id}).then((res) => {
            const response = res;
            if (response.status == 200) {
              setbudgetData(res.data.data);

              // Handle Response
            }
          });
    }


  };

  const getPMOData = () => {

    // Actual API Call
    Api.get("/get_milestone_date")
      .then((res) => {
        setPMOData(res.data.data);
      })
      .catch((error) => {
        setError(error);
      });

  };

  useEffect(() => {
    if (activeIndex !== 0) {
      getApiData();
    }
    if (activeIndex === 0) {
      getPMOData();
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!userStore.hasOwnProperty("useremail")) {
      navigate("/");
    }
    dispatch(loadData(Data));
  }, [userStore]);


  return (
    <div className="datatable-editing-demo">
      <Toast ref={toast} />
      <div>
        <div className="card">
          <TabMenu
            model={items}
            activeIndex={activeIndex}
            onTabChange={(e) => {
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

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Add new row" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name">Function Owner</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus  />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label className="mb-3">Function</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Development" onChange={onCategoryChange1} checked={product.category === 'Development'} />
                            <label htmlFor="category1">Development</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Validation" onChange={onCategoryChange1} checked={product.category === 'Validation'} />
                            <label htmlFor="category2">Validation</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Horizontal" onChange={onCategoryChange1} checked={product.category === 'Horizontal'} />
                            <label htmlFor="category3">Horizontal</label>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="name">Feature Owner</label>
                    <InputText id="name" value={product.name1} onChange={(e) => onInputChange1(e, 'name1')} required autoFocus  />
                    {submitted && !product.name1 && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="name">Domain</label>
                    <InputText id="name" value={product.name2} onChange={(e) => onInputChange2(e, 'name2')} required autoFocus  />
                    {submitted && !product.name2 && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="name">Features</label>
                    <InputText id="name" value={product.name3} onChange={(e) => onInputChange3(e, 'name3')} required autoFocus  />
                    {submitted && !product.name3 && <small className="p-error">Name is required.</small>}
                </div>
               

                <div className="field">
                    <label className="mb-3">Feature ON/OFF</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Yes" onChange={onCategoryChange} checked={product.category === 'Yes'} />
                            <label htmlFor="category1">Yes</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="No" onChange={onCategoryChange} checked={product.category === 'No'} />
                            <label htmlFor="category2">No</label>
                        </div>
                     
                    </div>
                </div>
             
                <div className="field">
                    <label className="mb-3">Feature Mode</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Low" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Low</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Medium" onChange={onCategoryChange} checked={product.category === 'Medium'} />
                            <label htmlFor="category2">Medium</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Heavy" onChange={onCategoryChange} checked={product.category === 'Heavy'} />
                            <label htmlFor="category3">Heavy</label>
                        </div>
                        
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="name">Estimation Type</label>
                    <Dropdown value={estimationType} options={estimations} onChange={onEstimationChange} optionLabel="name" placeholder="Select Estimation Type" />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Quarter 1</label>
                        <InputNumber id="price" value={value2} onValueChange={(e) => setValue2(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quarter 2</label>
                        <InputNumber id="quantity" value={value3} onValueChange={(e) => setValue3(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5} />
                    </div>
                    <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Quarter 3</label>
                        <InputNumber id="price" value={value4} onValueChange={(e) => setValue4(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quarter 4</label>
                        <InputNumber id="quantity" value={value5} onValueChange={(e) => setValue5(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5} />
                    </div>
                    </div>
                    <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Quarter 5</label>
                        <InputNumber id="price" value={value6} onValueChange={(e) => setValue6(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quarter 6</label>
                        <InputNumber id="quantity" value={value7} onValueChange={(e) => setValue7(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5} />
                    </div>
                    </div>
                    <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Quarter 7</label>
                        <InputNumber id="price" value={value8} onValueChange={(e) => setValue8(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quarter 8</label>
                        <InputNumber id="quantity" value={value9} onValueChange={(e) => setValue9(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5} />
                    </div>
                    </div>
                    <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Quarter 9</label>
                        <InputNumber id="price" value={value10} onValueChange={(e) => setValue10(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quarter 10</label>
                        <InputNumber id="quantity" value={value11} onValueChange={(e) => setValue11(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5} />
                    </div>
                    </div>
                    <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Quarter 11</label>
                        <InputNumber id="price" value={value12} onValueChange={(e) => setValue12(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quarter 12</label>
                        <InputNumber id="quantity" value={value13} onValueChange={(e) => setValue13(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5} />
                    </div>
                    </div>
                    <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="quantity">Quarter 13</label>
                        <InputNumber id="quantity" value={value14} onValueChange={(e) => setValue14(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={5} />
                    </div>
                    </div>
                </div>
            </Dialog>
        <CustomComponent />
        {activeIndex !== 0 && activeIndex !== 4 ? (
          <TableInfo
            columns={columns}
            data={getTableData}
            colEdit={columnEdit}
            custHeader={true}
            customHeader={headerGroup}
            handleTableData={submitpmo}
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