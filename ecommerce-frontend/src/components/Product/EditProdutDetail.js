import React, { useContext, useState, useEffect,useCallback } from "react";
import Context from "../../config/context";
import EditIcon from '@material-ui/icons/Edit';
import { Form, Modal, Button, Header, Dropdown,Image ,Grid} from "semantic-ui-react";
import AddIcon from '@material-ui/icons/Add';
import {IconButton} from "@material-ui/core";
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import { getOrientation } from 'get-orientation/browser'
import { withStyles } from '@material-ui/core/styles'
import ImgDialog from '../Image/ImgDialog'
import "../../main.css"
import { getCroppedImg, getRotatedImage } from '../Image/canvasUtils'
import { styles } from '../Image/styles'
function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}
export default function Detail(props) {
    const context = useContext(Context);
    const { categories, getCategories, editProduct ,uploadFile,user} = context;
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
    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])
    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, [])
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
    const handleEditName= (e, { value }) => setName({ value });
    const handleEditDescription = (e, { value }) => setDescription({ value });
    const handleEditCategory = (e, { value }) => setCategory({ value });
    const handleEditPrice = (e, { value }) => setPrice({ value });
    const handleEditPiece = (e, { value }) => setPiece({ value });
    const handleEditManufacturer = (e, { value }) => setManufacturer({ value });

    const HandleSubmit = async () => {
        const pictures = [picture1.value];
        await CroppedImagess();
    };
    async function CroppedImagess() {
        const croppedImage= await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
        let addProductPromise=new Promise(function(myResolve, myReject) {

            var categoryP = categories.filter(function(item){
                return item.id==category.value;
            });
            const product = {
                id:props.product.id,
                name: name.value,
                description: description.value,
                category: categoryP[0],
                price: parseFloat(price.value),
                piece: parseInt(piece.value),
                manufacturer_name:manufacturer.value,
                p_code:"",
                created_user_Id:user.id,
                updated_user_Id:user.id,
                picture1: "ttt",
            };
            let ad= editProduct(product,croppedImage);
            myResolve(ad)
        });
        let result2= await addProductPromise

    }
    return (
        <Modal style={{height:window.innerHeight*0.75,overflowY:"scroll"}} trigger={
                <IconButton style={{backgroundColor:"#66a7fd",marginLeft:5}}>
                    <EditIcon/>
                </IconButton>
        }>
            <Modal.Header>Edit Product</Modal.Header>
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
                                <div className={{ display: 'flex', flex: '1', alignItems: 'center'}}>
                                    <Typography variant="overline" classes={{    display: 'flex', flex: '1', alignItems: 'center'}}>
                                        Rotation
                                    </Typography>
                                    <Slider value={rotation} min={0} max={360} step={1} aria-labelledby="Rotation" classes={{ display: 'flex', flex: '1', alignItems: 'center'}} onChange={(e, rotation) => setRotation(rotation)}
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
                                <Image src={props.product.picture1}   style={{width: 400, height:400,borderRadius:400/2}} />
                                <input type="file" onChange={onFileChange} accept="image/*" />
                            </center>
                        </div>
                    )}
                </div>
                <br />
                <Form onSubmit={HandleSubmit}>
                    <Form.Input name="name" label="Name" onChange={handleEditName}  />
                    <Form.Input name="description" label="Description" onChange={handleEditDescription} />
                    <Form.Field><Header as="h5">Category</Header><Dropdown name="category" placeholder="Category" fluid selection options={listCategories} onChange={handleEditCategory} value={category.value}/>
                    </Form.Field>
                    <Form.Group widths="equal"><Form.Input name="price" label="Price" onChange={handleEditPrice} value={"$" + props.product.price}/></Form.Group>
                    <Form.Group widths="equal"><Form.Input name="piece" label="Piece" onChange={handleEditPiece} value={props.product.piece}/></Form.Group>
                    <Form.Group widths="equal"><Form.Input name="manufacturer" label="Manufacturer" onChange={handleEditManufacturer} value={props.product.manufacturer_name}/></Form.Group>
                    <Button primary fluid  onClick={async () => {await HandleSubmit} }> Edit </Button>
                </Form>

            </Modal.Content>
        </Modal>
    );
}
