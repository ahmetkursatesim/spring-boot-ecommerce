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
    const {uploadFile,uploadProfilePhoto} = context;
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
        console.log("sdsdsdsdsd")
        debugger;
        await CroppedImagesProfilePhoto();
    };
    async function CroppedImagesProfilePhoto() {
        const croppedProfilePhoto= await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
        let promiseUploadFile2 = new Promise(function (myResolve, myReject) {
            let myUploadResult = uploadFile(croppedProfilePhoto)
            myResolve(myUploadResult)
        });
        let resultProfilePhoto= await promiseUploadFile2
        let pathImage = ""
        if (resultProfilePhoto !== "") {
            pathImage = resultProfilePhoto.data
            console.log("sdsdsd")
        }
        debugger;
        let uploadProfilePromise=new Promise(function(myResolve, myReject) {
            let userTmp=props.user;
            userTmp.picture=process.env.PUBLIC_URL + '/generalfileStorage/'+ pathImage
            let ad= uploadProfilePhoto(userTmp);
            myResolve(ad)
        });
        let result2= await uploadProfilePromise
    }

    return (
        <Modal trigger={
            <IconButton style={{backgroundColor: "#66a7fd", marginLeft: 5}}>
                <EditIcon/>
            </IconButton>
        }>
            <Modal.Header  style={{marginBottom:"300px"}}>Change Photo</Modal.Header>
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
                                    style={{top:"10%!importtant"}}
                                />
                            </div>
                            <center>
                                <div style={{width: "200px", height: "200px"}}>

                                </div>
                                <br/>
                            </center>
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
};