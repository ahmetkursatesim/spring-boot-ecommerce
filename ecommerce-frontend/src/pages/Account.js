import React, {useContext, useEffect, useState} from "react";

import { Redirect } from "react-router-dom";

import {Grid, Card, Header, Button, Form, Dropdown, Modal, Image} from "semantic-ui-react";
import Context from "../config/context";
import ChangePhoto from "../components/Account/ChangePhoto";
import { useAlert } from 'react-alert'
import { Tab } from 'semantic-ui-react'
import CardInfo from "../components/Pay/CardInfo";
export default function MyAccount() {
    const alert = useAlert()
    const context = useContext(Context);
    const { user,changeAdress,getUser } = context;
    const [picture, setPicture] = useState("");
    const [streetName, setStreetName] = useState("");
    const [townName, setTownName] = useState("");
    const [country, setCountry] = useState("");
    const [postCode, setPostCode] = useState("");
    useEffect(() => {   getUser(user);}, []);
    const handleChange2 = (e, { value }) => setPicture({ value });
    const handleStreetName = (e, { value }) => setStreetName({ value });
    const handleTownName= (e, { value }) => setTownName({ value });
    const handleCountry= (e, { value }) => setCountry({ value });
    const handlePostCode= (e, { value }) => setPostCode({ value });
    const handleSubmit = () => {};
    const panes = [
        {menuItem: 'Hesap Bilgileri', render: () =><Card fluid>  <Card.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        name="name"
                        label="Adı"
                        placeholder="name"
                        value={user.name}
                    />
                    <Form.Input
                        name="Surname"
                        label="Soyadı"
                        placeholder="Product description (Optional)"
                        value={user.surname}
                    />
                    <Form.Input
                        name="Adress"
                        label="Adresi"
                        placeholder="Adress is Empty"
                        value={
                            user.adress?user.adress.streetName +" "+user.adress.townName+"/"+user.adress.country +"  "+user.adress.postCode:""
                        }
                    />
                    <Form.Input
                        name="Email"
                        label="E-Posta"
                        placeholder="Product description (Optional)"
                        value={user.email}
                    />
                </Form>
            </Card.Content> </Card>},
        {menuItem: 'Parola Degiştirme', render: () => <Card fluid>
                <Card.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            name="image"
                            label="Şifre"
                            placeholder="*****"
                            type="password"
                            onChange={handleChange2}
                            value={picture.value}
                        />
                        <Button color="teal" fluid type="submit">
                            Parola Degiştir
                        </Button>
                    </Form>
                </Card.Content>
            </Card>},
        { menuItem: 'Adres Degiştirme ', render: () => <Card fluid>
                <Card.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            name="town"
                            label="Şehir"
                            placeholder="Town or City "
                            type="text"
                            onChange={handleTownName}
                            value={townName.value}
                        />
                        <Form.Input
                            name="town1"
                            label="Sokak Adı ve Daire No"
                            placeholder="StreetName && Street Number "
                            type="text"
                            onChange={handleStreetName}
                            value={streetName.value}
                        />
                        <Form.Input
                            name="country"
                            label="Ülke"
                            placeholder="Country"
                            type="text"
                            onChange={handleCountry}
                            value={country.value}
                        />
                        <Form.Input
                            name="town2"
                            label="Posta Kodu"
                            placeholder="PostCode"
                            type="text"
                            onChange={handlePostCode}
                            value={postCode.value}
                        />

                        <Button color="teal" fluid  onClick={() => {changeAccountAdress()
                            alert.success('Changed Adress')}}>Adresi Degiştir</Button>
                    </Form>
                </Card.Content>
            </Card> },
    ]
    async function changeAccountAdress(){
        const accountAdress={
            streetName:streetName.value,
            townName:townName.value,
            country:country.value,
            postCode:postCode.value,
            user:user
        }
        await changeAdress(accountAdress)
        getUser(user)
    }
    function rootHeight(){
        var e = document.getElementById("root");
        var t = document.getElementById("backgroundImageTemp");
        if(e.clientHeight>0){
            t.style.height=e.clientHeight-15+"px";
        }

    }
    rootHeight()
    const view = user ? (
        <div  style={{display:"flex",width:"100%",marginTop:"150px",height:"500px"}}>
            <div style={{width:"400px",marginRight:"1%"}}>
                {user?(<div>
                                <Image src={user.picture} style={{width:300,height:300,borderRadius:150}}>
                                </Image>
                                <ChangePhoto user={user} />

                            </div>):( <div>
                        <br/>
                              <ChangePhoto user={user} />
                            <Image src="https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image-300x262.jpg">
                            </Image>
                            </div>
                    )
                }
            </div>
            <div style={{width:"60%"}}>
                <Tab panes={panes} />

            </div>
        </div>


    ) : (
        <Redirect to="/" />
    );


    return view;
}
