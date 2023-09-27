import { useState } from "react"// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


export default function ActivityCarousel(){
    const [slides, setSlides] = useState([
        {
            title:"titulo 1", 
            tests:[
                {
                    position:{top:"50%", left:"50%"},
                    type: "autocomplete",
                    content: "<p>Este es un <input type='text' style='border:none, border_bottom: 2px solid black'/> con formato HTML  <input type='text'/></p>",
                    answers:["pepe", "juan"]
                },
                {
                    position:{top:"20%", left:"50%"},
                    type: "autocomplete",
                    content: "<p>Este es un <input type='text'/> con formato HTML  <input type='text'/></p>",
                    answers:["luis", "albert"]
                }
            ]},
    ])


    function handleSubmit(evento, test){
        evento.preventDefault();
        // console.log(test);
        let testsInputs = evento.target.querySelectorAll(".test");

        // testsInput.target.test.map((t)=>console.log(t))
        // testsInputs.forEach(t => {
        //     console.log(t.querySelectorAll("input"))
        // });
        
        for(let i = 0; i < testsInputs.length; i++){
            console.log(testsInputs[0].querySelectorAll('input'))
           // console.log(testsInputs[i])
        }
    }

    return(
        <div className="bg-gray_clear relative" style={{height:"100vh", width:"100vw"}}>
            <Swiper className="h-full w-full">
                {
                    // Slides
                    slides.length > 0 &&
                    slides.map((slide)=>(
                        <SwiperSlide key={slides.indexOf(slide)}>
                            {slide.title}

                            {/* Los Tests en Pantalla */}
                            <form onSubmit={(evento)=>handleSubmit(evento, slide)}>

                                {/* Test individual */}
                                {slide.tests.map((test)=>(
                                    <div 
                                        style={{
                                            top:test.position.top,
                                            left:test.position.left
                                        }}
                                        className="test absolute"
                                        key={slide.tests.indexOf(test)}
                                        dangerouslySetInnerHTML={{__html: test.content}}></div>
                                ))}

                                {/* Siguiente */}
                                <input type="submit" className="btn-primary p-2" value={"Siguiente"}></input>
                            </form>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}