import React,{useState,useEffect}from "react";
import { Form, FormGroup } from "reactstrap";
import api from "../../services/api";
import Col from 'react-bootstrap/Col';



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

  

  
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
      <Form.Group className="select__group" as={Col} controlId="formGridState">
            <Form.Label>Categoria</Form.Label>
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
          <select>
          <option value="" disabled selected>Sub-Categoria</option>
            <option parent_category="1" value="1">Citadino</option>
            <option parent_category="1" value="2">SUV</option>
            <option parent_category="1" value="3">Desportivo</option>
            <option parent_category="2" value="4">Citadina</option>
            <option parent_category="2" value="5">Desportiva</option>
            <option parent_category="2" value="6">Todo-o-Terreno</option>
            <option parent_category="3" value="7">Passageiros</option>
            <option parent_category="3" value="8">Caravana</option>
            <option parent_category="3" value="9">Mercadorias</option>
          </select>
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
