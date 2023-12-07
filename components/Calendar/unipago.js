export default async function unipago(){
    const cJSONFinal = {
        "tipo": 3, 
        "comercio": "EspañolconE", 
        "mail":  "espanolconeacademy@gmail.com",
        "dominio": "localhost:3000/inicio/home/", //"espanolcone-five.vercel.app",
        "referencia":"Cliente 1000 - Alberto Gomez o Pedido 0001-0000112334",
        "monto": 11703.00,
        "telefono":543156132710,
        "email":"aliriodi@gmail.com"     
       
    }

    // Convierte el ARRAY en un JSON y lo pone en un buffer para luego convertirlo
    const bParamDat1 = Buffer.from(JSON.stringify(cJSONFinal))
    // Convierte el JSON en un string cifrado en base 64
    const cRetornoArray = bParamDat1.toString("base64")
    // Creo una URL concatenando el código base64 recien obtenido
    const cRutaContenidoArray = "https://mi.unipago.app/pagar/" + cRetornoArray + "/possum-false"

    return cRutaContenidoArray

    
}