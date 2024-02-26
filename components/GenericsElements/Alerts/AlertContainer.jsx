export default function AlertContainer({children}){
    
    return(
        <div className=' fixed top-[130px] left-2 z-[999]
        md:top-[60px] md:left-0'>
            {
                children &&
                children
            }
        </div>
    )
} 