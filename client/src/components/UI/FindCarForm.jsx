import React,{useState,useEffect}from 'react';
import api from '../../services/api'
import {  FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import "../../styles/find-car-form.css";
import DatePicker, { DateObject } from "react-multi-date-picker";


const FindCarForm = ({ onSubmit }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get("/cat/subcat");
      setCategoryOptions(response.data);
    }
    fetchCategories();
  }, []);

  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    async function fetchSubcategories() {
      const response = await api.get("subcat/subcat");
      setSubCategoryOptions(response.data);
    }
    fetchSubcategories();
  }, []);

  const [fuel, setFuel] = useState("");
  const handleFuelChange = (event) => {
    setFuel(event.target.value);
  };

  const [brand, setBrand] = useState("");
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const [model, setModel] = useState("");
  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const [maxKms, setMaxKms] = useState("");
  const handleMaxKmsChange = (event) => {
    setMaxKms(event.target.value);
  };

  const [orderBy, setOrderBy] = useState("");
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.get("publi/filter", {
      params: {
        category: selectedCategory,
        subcategory: selectedSubCategory,
        fuel: fuel,
        brand: brand,
        model: model,
        maxKms: maxKms,
        orderBy: orderBy,
      },
    });
    onSubmit(response.data); 
  };

  return (
    <Form className="form" >
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <Form.Group className="select__group">
          <Form.Select
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
            value={selectedSubCategory}
            onChange={(event) => setSelectedSubCategory(event.target.value)}
          >
            <option value="">Escolha a subcategoria...</option>
            {subCategoryOptions.map((subcategory) => (
              <option key={subcategory.ID} value={subcategory.ID}>
                {subcategory.subcategoryName}
              </option>
            ))}
          </Form.Select>
        </FormGroup>
        <FormGroup className="select__group">
          <Form.Select value={fuel} onChange={handleFuelChange}>
            <option value="" disabled>
              Combustível
            </option>
            <option value="Gasolina">Gasolina</option>
            <option value="Gasoleo">Gasóleo</option>
                          
              <option value="Híbrido">Híbrido</option>
              <option value="Elétrico">Elétrico</option>
              <option value="GPL">GPL</option>
              </Form.Select>
              </FormGroup>
              <FormGroup className="form__group">
              <input
              type="text"
              placeholder="Marca"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              />
              </FormGroup>
              <FormGroup className="form__group">
              <input
              type="text"
              placeholder="Modelo"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              />
              </FormGroup>
              <FormGroup className="form__group">
              <input
              type="number"
              placeholder="Até kms"
              value={maxKms}
              onChange={(event) => setMaxKms(event.target.value)}
              />
              </FormGroup>
             <FormGroup className="form__group">
                <Form.Select value={orderBy} onChange={handleOrderByChange}>
                  <option value="">Ordenar por...</option>
                  <option value="price-asc">Valor crescente</option>
                  <option value="price-desc">Valor decrescente</option>
                </Form.Select>
              </FormGroup>
              <FormGroup className="form__group">
              <button onClick={handleSubmit} className="btn find__car-btn">
                Procurar
              </button>
              </FormGroup>
              </div>
              </Form>
);
};

export default FindCarForm;
