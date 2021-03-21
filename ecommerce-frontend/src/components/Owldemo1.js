import React,{Component} from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export class Owldemo1 extends Component {
    render()
    {
        return (
            <div >
                <div class='container-fluid' >
                    <div className="row title" style={{marginBottom: "20px"}} >
                    </div>
                </div>
                <div class='container-fluid' style={{marginTop:"200px"}}>
                    <OwlCarousel items={5} className="owl-theme" loop nav margin={8} autoplay ={true} autoHeight={false} mergeFit={true} style={{zIndex:0}} autoplayTimeout={1000}>
                        <div><img  className="img" src= {process.env.PUBLIC_URL +'/owlImage'+'/1.jpg'} style={{height:"200px"}}/></div>
                        <div><img  className="img" src= {process.env.PUBLIC_URL +'/owlImage'+'/2.jpg'} style={{height:"200px"}}/></div>
                        <div><img  className="img" src= {process.env.PUBLIC_URL +'/owlImage'+'/3.jpg'} style={{height:"200px"}}/></div>
                        <div><img  className="img" src={process.env.PUBLIC_URL +'/owlImage'+'/4.jpg'}  style={{height:"200px"}}/></div>
                        <div><img className="img" src= {process.env.PUBLIC_URL +'/owlImage'+'/1.jpg'}  style={{height:"200px"}}/></div>
                        <div><img className="img" src= {process.env.PUBLIC_URL +'/owlImage'+'/2.jpg'}  style={{height:"200px"}}/></div>
                        <div><img className="img" src= {process.env.PUBLIC_URL +'/owlImage'+'/3.jpg'}  style={{height:"200px"}}/></div>
                        <div><img  className="img" src={process.env.PUBLIC_URL +'/owlImage'+'/4.jpg'}  style={{height:"200px"}}/></div>
                        <div><img  className="img" src= {process.env.PUBLIC_URL +'/owlImage'+'/1.jpg'} style={{height:"200px"}}/></div>
                        <div><img  className="img" src= {process.env.PUBLIC_URL +'/owlImage'+'/2.jpg'} style={{height:"200px"}}/></div>
                        <div><img  className="img" src= {process.env.PUBLIC_URL +'/owlImage'+'/3.jpg'} style={{height:"200px"}}/></div>
                        <div><img  className="img" src={process.env.PUBLIC_URL +'/owlImage'+'/4.jpg'}  style={{height:"200px"}}/></div>
                    </OwlCarousel>
                </div>

            </div>
        )
    }
}


export default Owldemo1
