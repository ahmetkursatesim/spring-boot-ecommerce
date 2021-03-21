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
import "../../main.css"
import "../sepet.css"
import { getCroppedImg, getRotatedImage } from '../Image/canvasUtils'
function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}
export default  function ChangePhoto(props) {
    const context = useContext(Context);
    const {uploadProfilePhoto} = context;
    const ORIENTATION_TO_ANGLE = {
        '3': 180,
        '6': 90,
        '8': -90,
    }

    const [imageSrc, setImageSrc] = React.useState(null)
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    ////////////////////////////  Image///////////////////
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
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
    const HandleProfilePhoto = async () => {
        await CroppedImagesProfilePhoto();
    };
    async function CroppedImagesProfilePhoto() {
        const croppedProfilePhoto= await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
        let uploadProfilePromise=new Promise(function(myResolve, myReject) {
            let userTmp=props.user
            let ad=uploadProfilePhoto(croppedProfilePhoto,userTmp);
            myResolve(ad)
        });
        let result2= await uploadProfilePromise
    }

    return (
        <Modal style={{height:window.innerHeight*0.75,overflowY:"scroll"}} trigger={
            <div className="showcase" style={{width:"100px",borderRadius:"2rem",marginLeft:"100px"}}>
                <div className="showcase-buttons" style={{width:"100px",marginTop:"10px"}}>
                    <button style={{width:"100px",marginTop:"0px"}} class="showcase-add-to-cart" >
                        Resim Degiştir
                    </button>
                </div>
            </div>

        }>
            <Modal.Header>Fotograf Degiştir</Modal.Header>
            <Modal.Content>

                <div>
                    {imageSrc ? (
                        <React.Fragment>
                            <div className="crop-container">

                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    rotation={rotation}
                                    aspect={1}
                                    zoom={zoom}
                                    onCropChange={setCrop}
                                    onRotationChange={setRotation}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    cropShape={"round"}
                                    style={{top:"50px !importtant"}}
                                />
                            </div>

                                <div style={{width: "200px", height: "200px"}}>

                                </div>
                                <br/>
                            <div className={{
                                padding: 16,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch'
                            }}>
                                <div className={{display: 'flex', flex: '1', alignItems: 'center'}}>
                                    <Typography variant="overline">
                                        Zoom
                                    </Typography>
                                    <Slider value={zoom} min={1} max={3} step={0.1} aria-labelledby="Zoom"
                                            classes={{padding: '22px 0px', marginLeft: 16}}
                                            onChange={(e, zoom) => setZoom(zoom)}
                                    />
                                </div>
                                <div className={{display: 'flex', flex: '1', alignItems: 'center'}}>
                                    <Typography variant="overline"
                                                classes={{display: 'flex', flex: '1', alignItems: 'center'}}>
                                        Rotation
                                    </Typography>
                                    <Slider value={rotation} min={0} max={360} step={1} aria-labelledby="Rotation"
                                            classes={{display: 'flex', flex: '1', alignItems: 'center'}}
                                            onChange={(e, rotation) => setRotation(rotation)}
                                    />
                                </div>
                            </div>
                            <br/>
                            <center>
                                <input type="file" onChange={onFileChange} accept="image/*"/>
                            </center>

                        </React.Fragment>
                    ) : (
                        <div style={{width: "100%"}}>
                            <center>
                                <Image src={props.user.picture}
                                       style={{width: 400, height: 400, borderRadius: 400 / 2}}/>
                                <input type="file" onChange={onFileChange} accept="image/*"/>
                            </center>


                        </div>
                    )}
                </div>
                <br/>

                <Form onSubmit={HandleProfilePhoto}>
                    <Button  primary fluid  onClick={async () => {await HandleProfilePhoto}}>Change Photo</Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
}
