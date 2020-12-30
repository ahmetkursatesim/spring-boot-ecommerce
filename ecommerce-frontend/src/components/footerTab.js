import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPagePro = () => {
    return (
        <MDBFooter color="stylish-color-dark" className="page-footer font-small pt-4 mt-4" style={{backgroundColor:"#3e4551 !important"}}>
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                            Birsen Eczanesi
                        </h5>
                        <p style={{color:"#000"}}>
                            Birsen Eczanesi
                        </p>
                        <br/>
                        <p style={{color:"#000"}}>
                            Adres: Aşağı Eğlence Mh, Altınoluk Sk. No:4/b, 06010 Keçiören/Ankara
                        </p>
                        <br/>
                        <p style={{color:"#000"}}>
                            Telefon Numarası: (0312) 322 67 17
                        </p>
                    </MDBCol>
                    <hr className="clearfix w-100 d-md-none" />
                    <MDBCol md="2">
                        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                            Ürünler
                        </h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Bebek ve Çocuk Sağlığı</a>
                            </li>
                            <li>
                                <a href="#!">Kozmetik</a>
                            </li>
                            <li>
                                <a href="#!">Bitkisel Ürünler</a>
                            </li>
                        </ul>
                    </MDBCol>
                    <hr className="clearfix w-100 d-md-none" />
                    <MDBCol md="2">
                        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                            Popüler Markalar
                        </h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Afye</a>
                            </li>
                            <li>
                                <a href="#!">Zinc</a>
                            </li>
                        </ul>
                    </MDBCol>
                    <hr className="clearfix w-100 d-md-none" />
                    <MDBCol md="2">
                        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">

                        </h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Aura Cacia</a>
                            </li>
                            <li>
                                <a href="#!">Nature's Bounty</a>
                            </li>
                            <li>
                                <a href="#!">Sport Aid</a>
                            </li>
                            <li>
                                <a href="#!">View All</a>
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