import React from "react";
import "../../styles/header.css";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Form, Field } from "react-final-form";

const onSubmit = values => {
  console.log(values);
};

const Register = () => (
  <Form
    onSubmit={onSubmit}
    validate={values => {
      const errors = {};
      function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
      if (!values.fname) {
        errors.fname = "Required";
      }
      if (!values.lname) {
        errors.lname = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (!validateEmail(values.email)) {
        errors.email = "Not an email adress";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (!values.tos) {
        errors.tos = "Required";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Does not match";
      }
      return errors;
    }}
    render={({ handleSubmit, values, submitting, validating, valid }) => (
      <form onSubmit={handleSubmit}> 
        <div style={{ width:'50%', margin:'10px auto'}}>
        <FormGroup >
          <Label for="fname">First Name</Label>
          <Field name="fname">
            {({ input, meta }) => (
              <div>
                <Input
                  {...input}
                  type="text"
                  placeholder="first name"
                  invalid={meta.error && meta.touched}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </FormGroup>
        <FormGroup>
          <Label for="lname">Last Name</Label>
          <Field name="lname">
            {({ input, meta }) => (
              <div>
                <Input
                  {...input}
                  type="text"
                  placeholder="first name"
                  invalid={meta.error && meta.touched}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Field name="email">
            {({ input, meta }) => (
              <div>
                <Input
                  {...input}
                  type="text"
                  placeholder="first name"
                  invalid={meta.error && meta.touched}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Field name="password">
            {({ input, meta }) => (
              <div>
                <Input
                  {...input}
                  type="password"
                  placeholder="password"
                  invalid={meta.error && meta.touched}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Field name="confirmPassword">
            {({ input, meta }) => (
              <div>
                <Input
                  {...input}
                  type="password"
                  placeholder="confirm password"
                  invalid={meta.error && meta.touched}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </FormGroup>
        <FormGroup check>
          <Field name="tos" type="checkbox">
            {({ input, meta }) => (
              <Label>
                <Input
                  {...input}
                  type="checkbox"
                  invalid={meta.error && meta.touched}
                />{" "}
                Check Me
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </Label>
            )}
          </Field>
        </FormGroup>
        <Button className=" contact__btn" type="submit" style={{backgroundColor: '#000d6b', color:'white', width:'80%', margin:'10px auto'}} disabled={!valid}>
          Submit
        </Button>
        </div>
      </form>
    )}
  />
);

export default Register;
