import React, { useContext, useState } from "react";

import "semantic-ui-css/semantic.min.css";
import { Card, Header, Form, Button } from "semantic-ui-react";

import Context from "../config/context";
import { Redirect } from "react-router-dom";

export default function Login() {
  const context = useContext(Context);
  const { user, getUser } = context;

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");

  const handleChange1 = (e, { value }) => setName({ value });
  const handleChange2 = (e, { value }) => setPicture({ value });

  const handleSubmit = () => {
    const user = {
      email: name.value,
      password: picture.value,
      is_admin: false
    };

    getUser(user);
  };
  debugger;
  const view = user ? (
    <Redirect to="/" />
  ) : (
      <div style={{width:"100%",marginLeft:"0",marginRight:"0",marginTop:"150px",minHeight:"400px"}}>

        <Card fluid >
          <Card.Content>
            <Header textAlign="center">Merhabalar Hoşgeldiniz</Header>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                  name="name"
                  label="E-Posta"
                  placeholder="mail@mail.com"
                  onChange={handleChange1}
                  value={name.value}
              />
              <Form.Input
                  name="image"
                  label="Şifre"
                  placeholder="*****"
                  type="password"
                  onChange={handleChange2}
                  value={picture.value}
              />
              <Button color="teal" fluid type="submit">
                Login
              </Button>
            </Form>
          </Card.Content>
        </Card>

      </div>

  );

  return view;
}
