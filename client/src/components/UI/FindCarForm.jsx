import React,{useState,useEffect}from 'react';
import api from '../../services/api'
import {  FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import "../../styles/find-car-form.css";
import DatePicker, { DateObject } from "react-multi-date-picker";


const FindCarForm = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get("/cat/subcat");
      setCategoryOptions(response.data);
    }
    fetchCategories();
  }, []);

  const [SubcategoryOptions, setSubCategoryOptions] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  

  useEffect(() => {
    async function fetchSubcategories() {
      const response = await api.get('subcat/subcat')
      setSubCategoryOptions(response.data);
    }
    fetchSubcategories();
  }, []);

  const [valuePrice, setPrice]=useState(0);

  const setValuePrice = (event) => {
    setPrice(event.target.value);
  };

  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days")
  ])

  
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <Form.Group className="select__group">
              <Form.Select
                defaultValue=""
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}>
                <option value="">Escolha a categoria...</option>
                {categoryOptions.map((category) => (
                  <option key={category.ID} value={category.ID}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          <FormGroup className="select__group">
          <Form.Select
                defaultValue=""
                value={selectedSubCategory}
                onChange={(event) => setSelectedSubCategory(event.target.value)}>
                <option value="">Escolha a subcategoria...</option>
                {SubcategoryOptions.map((Subcategory) => (
                  <option key={Subcategory.ID} value={Subcategory.ID}>
                    {Subcategory.SubcategoryName}
                  </option>
                ))}
              </Form.Select>
          </FormGroup>
          <FormGroup className="select__group">
            <Form.Select>
              <option value="" disabled selected>Combustivel</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Gasoleo">Gasoleo</option>
              <option value="Hibrido">Hibrido</option>
              <option value="Eletrico">Elétrico</option>
              <option value="GPL">GPL</option>
            </Form.Select>
          </FormGroup>

          <FormGroup className="form__group">
            <input type="text" placeholder="Marca" />
          </FormGroup>

          <FormGroup className="form__group">
            <input type="text" placeholder="Modelo" />
          </FormGroup>

          <FormGroup className="form__group">
          <DatePicker  onlyYearPicker range value={values} onChange={setValues} dateSeparator=" até "/>
          </FormGroup>

          <FormGroup className="form__group">
            <input type="number" placeholder="kms" />
          </FormGroup>
          
          <FormGroup className="form__group">  
            <input type="range" onChange={setValuePrice} value={valuePrice} name="price" min="0" max="500000" step={1000}/>
            <label for="price">Preço Máximo: {valuePrice} €</label>
          </FormGroup>

          <FormGroup className="form__group">
            <button className="btn find__car-btn">
            <Link to="registerCategory" className="btn find__car-btn">
                    Procurar
                  </Link>
              </button>
          </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
