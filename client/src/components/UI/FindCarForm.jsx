import React from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="Marca" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Modelo" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="month" placeholder="Ano" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="number" placeholder="kms" required  />
        </FormGroup>
        <FormGroup className="select__group">
          <select>
            <option value="Gasolina">Gasolina</option>
            <option value="Gasoleo">Gasoleo</option>
            <option value="Gasoleo">Disel</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Procurar</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
