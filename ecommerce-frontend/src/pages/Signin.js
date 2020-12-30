import React, { useContext, useState } from "react";

import { Redirect } from "react-router-dom";

import {Grid, Card, Header, Button, Form, Image} from "semantic-ui-react";

import Home from "./Home";

import Context from "../config/context";

export default function Signin() {
  const context = useContext(Context);
  const { user, addUser } = context;

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const handleChange1 = (e, { value }) => setName({ value });
  const handleChange2 = (e, { value }) => setPicture({ value });
  const handleChange3 = (e, { value }) => setEmail({ value });
  const handleChange4= (e, { value }) => setSurname({ value });



  const handleSubmit = () => {
    const user = {
      adress_id:0 ,
      email: email.value,
      name:name.value,
      surname:surname.value,
      password: picture.value,
      is_admin: false,
      picture:""
    };
    addUser(user);
  };

  const view = user ? (
    <Redirect to="/" />
  ) : (
      <div  style={{width:"100%",marginTop:"150px"}}>
        <Card fluid>
          <Card.Content>
            <Header textAlign="center">Drug Store Hoşgeldiniz</Header>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                  name="name"
                  label="Adı"
                  placeholder="Adı"
                  onChange={handleChange1}
                  value={name.value}
              />
              <Form.Input
                  name="surname"
                  label="Soyadı"
                  placeholder="Soyadı"
                  onChange={handleChange4}
                  value={surname.value}
              />
              <Form.Input
                  name="email"
                  label="E-Posta"
                  placeholder="mail@mail.com"
                  onChange={handleChange3}
                  value={email.value}
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
               Kayıt ol
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>

  );

  return view;
}
