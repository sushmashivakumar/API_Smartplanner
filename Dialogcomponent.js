import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import "./DataTableDemo.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

function Dialogcomponent({ columns, data, colEdit, handleTableData }) {

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
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedCity1, setSelectedCity1] = useState(null);
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
    
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
      }
      
      const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
      }
      
      const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
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
      
      const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};
        _product[`${name}`] = val;
      
        setProduct(_product);
      }
      
      const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        }
      
      
      
      const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                {/* <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." /> */}
            </span>
        </div>
      );
      const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
      );
      const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
      );
      const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            {/* <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} /> */}
        </React.Fragment>
      );
  return (
    <div>
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
                {/* <div className="field">
                    <label htmlFor="name">Function</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus  />
                    
                    <label htmlFor="name">Function</label>
                    <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select a City" />
 
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div> */}
                {/* <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div> */}

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
                        {/* <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div> */}
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
                        {/* <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div> */}
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="name">Estimation Type</label>
                    <Dropdown value={selectedCity1} options={estimations} onChange={onCityChange} optionLabel="name" placeholder="Select Estimation Type" />
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
    </div>
  );
}

export default Dialogcomponent;