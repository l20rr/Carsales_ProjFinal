import React,{useState,useEffect}from 'react';
import api from '../../services/api'
import {  FormGroup } from "reactstrap";
import Form from 'react-bootstrap/Form';
import "../../styles/find-car-form.css";


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

  
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
      <Form.Group className="select__group">
            <Form.Select
              defaultValue=""
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
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
              onChange={(event) => setSelectedSubCategory(event.target.value)}
            >
              <option value="">Escolha a subcategoria...</option>
              {SubcategoryOptions.map((Subcategory) => (
                <option key={Subcategory.ID} value={Subcategory.ID}>
                  {Subcategory.SubcategoryName}
                </option>
              ))}
            </Form.Select>
        </FormGroup>
        <FormGroup className="select__group">
          <select>
            <option value="" disabled selected>Combustivel</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Gasoleo">Gasoleo</option>
            <option value="Gasoleo">Hibrido</option>
            <option value="Gasoleo">Elétrico</option>
            <option value="Gasoleo">GPL</option>
          </select>
        </FormGroup>
        <FormGroup className="form__group">
          <input type="text" placeholder="Marca" />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Modelo" />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="month" placeholder="Ano" />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="number" placeholder="kms" />
        </FormGroup>
        
        <FormGroup className="form__group">  
          <input type="range" name="price" min="0" max="1000000"/><br></br>
          <label for="price">Preço Máximo</label>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Procurar</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
