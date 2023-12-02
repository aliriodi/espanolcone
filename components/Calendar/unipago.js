export default async function unipago(referencia){
    const cJSONFinal = {
        "tipo": 3, 
        "comercio": "EspañolconE", 
        "mail":  "espanolconeacademy@gmail.com",
        "dominio": "espanolcone-five.vercel.app",//"localhost:3000", 
        "referencia":"JSON.stringify(referencia)", 
       "moneda":'usd',
       "monto":1000}

    // Convierte el ARRAY en un JSON y lo pone en un buffer para luego convertirlo
    const bParamDat1 = Buffer.from(JSON.stringify(cJSONFinal))
    // Convierte el JSON en un string cifrado en base 64
    const cRetornoArray = bParamDat1.toString("base64")
    // Creo una URL concatenando el código base64 recien obtenido
    const cRutaContenidoArray = "https://mi.unipago.app/pagar/" + cRetornoArray 

    return cRutaContenidoArray

    
}