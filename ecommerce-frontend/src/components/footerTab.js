import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPagePro = () => {
    return (
        <MDBFooter color="stylish-color-dark" className="page-footer font-small pt-4 mt-4" style={{backgroundColor:"black !important"}}>
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold" style={{color:"#fff"}}>
                            Cantürk Kuruyemiş
                        </h5>
                        <p style={{color:"#fff"}}>
                            Cantürk Kuruyemiş
                        </p>
                        <br/>
                        <p style={{color:"#fff"}}>
                            Adres: Yayla mahallesi şehit mustafa erciges caddesi no,91/b
                            06220 Keçiören
                            Türkiye
                        </p>
                        <br/>
                        <p style={{color:"#fff"}}>
                            Telefon Numarası: (0312) 378 37 00
                        </p>
                    </MDBCol>
                    <hr className="clearfix w-100 d-md-none" />
                    <MDBCol md="2">
                        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold" style={{color:"#fff"}}>
                            Ürünler
                        </h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!" style={{color:"#fff"}}>Kavrulmuş Kuruyemişler</a>
                            </li>
                            <li>
                                <a href="#!" style={{color:"#fff"}}>Çig Kuruyemişler</a>
                            </li>
                            <li>
                                <a href="#!" style={{color:"#fff"}}>Kahveler</a>
                            </li>
                            <li>
                                <a href="#!" style={{color:"#fff"}} >Şekerlemeler</a>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <hr />
            <div className="text-center">
                <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                        <a className="btn-floating btn-sm btn-fb mx-1">
                            <i className="fab fa-facebook-f"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-sm btn-tw mx-1">
                            <i className="fab fa-twitter"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-sm btn-gplus mx-1">
                            <i className="fab fa-google-plus"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-sm btn-li mx-1">
                            <i className="fab fa-linkedin-in"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-sm btn-dribbble mx-1">
                            <i className="fab fa-dribbble"> </i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid style={{color:"#000"}}> &copy; {new Date().getFullYear()} Copyright: <a href="https://www.AhmetKursatEsim.com"> ahmetkursat.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default FooterPagePro;
