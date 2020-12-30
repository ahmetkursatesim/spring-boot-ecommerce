import React, { useContext, useEffect } from "react";

import Context from "../config/context";
import InfoIcon from '@material-ui/icons/Info';
import { useAlert } from 'react-alert'
import {
    Form,
    Modal,
    Button,
    Header,
    Dropdown,
    Image,
    Grid
} from "semantic-ui-react";
import {IconButton} from "@material-ui/core";
const styledisp={
    display: "flex",
    justifyContent: "flex-end",
    marginRight:"5px",
    marginBottom:"5px",
    marginTop:"5px"
}
const colorBtn={
    backgroundColor:"#66a7fd"
}
export default function Detail(props) {
    const context = useContext(Context);

    var cv=props.product
    return (
        <Modal trigger={
           <IconButton style={colorBtn}>
               <InfoIcon/>
           </IconButton>
        }>
            <Modal.Content>
                 <div style={{justifyContent:"center",display:"flex"}}>
                     <Image src={props.product.picture1}   style={{width: 400, height:400,borderRadius:400/2}} />
                </div>
                <br />
                <Form>
                    <Form.Input name="name" label="Ürün Adı" value={props.product.name} />
                    <Form.Input
                        name="description"
                        label="Ürün Açıklaması"
                        value={props.product.description}
                    />
                    <Form.Group widths="equal">
                        <Form.Input
                            name="price"
                            label="Fiyatı"
                            value={props.product.price+"TL" }
                        />
                    </Form.Group>
                </Form>
            </Modal.Content>
        </Modal>
    );
}
