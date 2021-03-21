import React, { useContext, useState, useEffect,useCallback } from "react";

import { Form, Modal, Button, Header, Dropdown,Image } from "semantic-ui-react";
import AddIcon from '@material-ui/icons/Add';

import Context from "../config/context";
import {IconButton} from "@material-ui/core";
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import { getOrientation } from 'get-orientation/browser'
import { withStyles } from '@material-ui/core/styles'
import ImgDialog from './Image/ImgDialog'

import { getCroppedImg, getRotatedImage } from './Image/canvasUtils'
import "../main.css"
import Select from "react-select";
import UpdateIcon from "@material-ui/icons/Update";
function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export default function AddProductForm() {
  const context = useContext(Context);
  const { categories, getCategories, addProduct,uploadFile,user} = context;
  const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
  }
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  ////////////////////////////  Image///////////////////
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {setCroppedAreaPixels(croppedAreaPixels)}, [])

  const onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }
      setImageSrc(imageDataUrl)
    }
  }

  ////////////////
  useEffect(() => {
    getCategories();
  }, []);

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

  const listCategories = categories.map(category => ({
    key: category.id,
    text: category.name,
    value: category.id
  }));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [piece, setPiece] = useState("");
  const [picture1, setPicture1] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const handleChange1 = (e, { value }) => setName({ value });
  const handleChange2 = (e, { value }) => setDescription({ value });
  const handleChange3 = (e, { value }) => setCategory({ value });
  const handleChange4 = (e, { value }) => setPrice({ value });
  const handleChangePiece = (e, { value }) => setPiece({ value });
  const handleChangeManufacturer = (e, { value }) => setManufacturer({ value });

  const HandleSubmit = async () => {
    const pictures = [picture1.value];
    await CroppedImagess();
  };
  async function CroppedImagess() {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
        let addProductPromise=new Promise(function(myResolve, myReject) {
        var categoryP = categories.filter(function(item){
          return item.id==category.value;
        });
        const product = {
          name: name.value,
          description: description.value,
          category:categoryP[0],
          price: parseFloat(price.value),
          piece: parseInt(piece.value),
          manufacturer_name:manufacturer.value,
          p_code:"",
          created_user_Id:user.id,
          updated_user_Id:user.id,
          picture1: "tt",
        };
        let ad= addProduct(croppedImage,product);
        myResolve(ad)
      });
      let result2= await addProductPromise
  }
  return (
    <Modal style={{height:window.innerHeight*0.75,overflowY:"scroll"}}
      trigger={
        <div style={styledisp}>
          <IconButton style={colorBtn} >
            <AddIcon/>
          </IconButton>
        </div>

      }
    >
      <Modal.Header>Ürün Ekle</Modal.Header>
      <Modal.Content>
        <div>
          {imageSrc ? (
              <React.Fragment>
                      <div className="crop-container">
                        <Cropper image={imageSrc} crop={crop} rotation={rotation} aspect={1} zoom={zoom} onCropChange={setCrop} onRotationChange={setRotation} onCropComplete={onCropComplete} onZoomChange={setZoom} cropShape={"round"}/>
                      </div>
                <center>
                <div style={{width:"200px",height:"200px"}}></div><br/>
                </center>
                <div className={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
                  <div className={ {display: 'flex',flex: '1',alignItems: 'center'}}>
                    <Typography variant="overline">
                      Zoom
                    </Typography>
                    <Slider value={zoom} min={1} max={3} step={0.1} aria-labelledby="Zoom" classes={{  padding: '22px 0px', marginLeft: 16 }} onChange={(e, zoom) => setZoom(zoom)}
                    />
                  </div>
                </div>
                <br/>
                <center>
                  <input type="file" onChange={onFileChange} accept="image/*" />
                </center>

              </React.Fragment>
          ) : (
              <div style={{width:"100%"}}>
                 <center>
                  <Image src="https://www.pureingenuity.com/wp-content/uploads/2018/07/empty-profile-image-300x262.jpg"></Image><br/>
                  <input type="file" onChange={onFileChange} accept="image/*" />
                </center>
              </div>
          )}
        </div>
        <div>
          <Form onSubmit={HandleSubmit}>
            <Form.Input
                name="name"
                label="Ürün adı"
                placeholder="Ürün adı"
                onChange={handleChange1}
                value={name.value}
            />
            <Form.Input
                name="description"
                label="Ürün Açıklaması"
                placeholder="Product description (Optional)"
                onChange={handleChange2}
                value={description.value}
            />
            <Form.Field>
              <Header as="h5">Kategori</Header>
              <Dropdown
                  name="category"
                  placeholder="Category"
                  fluid
                  selection
                  options={listCategories}
                  onChange={handleChange3}
                  value={category.value}
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Input
                  name="price"
                  label="Fiyat"
                  placeholder="Fiyat (TL)"
                  onChange={handleChange4}
                  value={price.value}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                  name="piece"
                  label="Adet veya Miktar"
                  placeholder="adt."
                  onChange={handleChangePiece}
                  value={piece.value}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                  name="manufacturer"
                  label="Üreten Firma"
                  placeholder="Üreten Firma"
                  onChange={handleChangeManufacturer}
                  value={manufacturer.value}
              />
            </Form.Group>



            <Button primary fluid  onClick={async () => {await HandleSubmit} }> Save </Button>
          </Form>
        </div>

      </Modal.Content>
    </Modal>
  );
}
