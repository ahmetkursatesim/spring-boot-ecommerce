import React, {useContext, useEffect, useState} from "react";

import { Redirect } from "react-router-dom";
import {Grid, Card, Header, Button, Form, Dropdown, Modal, Image} from "semantic-ui-react";
import Context from "../config/context";
import ChangePhoto from "../components/Account/ChangePhoto";
import { useAlert } from 'react-alert'
import { Tab } from 'semantic-ui-react'
import CardInfo from "../components/Pay/CardInfo";
export default function PayPage() {
    const alert = useAlert()
    const context = useContext(Context);
    const { user,getUser } = context;
    useEffect(() => {   getUser(user);}, []);

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
            <Card fluid>
                <Card.Content>
                    <CardInfo></CardInfo>
                </Card.Content>
            </Card>

        </div>
    ) : (
        <Redirect to="/" />
    );


    return view;
}
