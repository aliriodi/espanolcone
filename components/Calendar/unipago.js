export default async function unipago(){
    const cJSONFinal = {
        "tipo": 2, 
        "comercio": "EspañolconE", 
        "mail":  "espanolconeacademy@gmail.com",
        "dominio": "localhost:3000", //"espanolcone-five.vercel.app",
        "referencia":"Cliente 1000 - Alberto Gomez o Pedido 0001-0000112334",
        "monto": 11703.00,
        
        "idcliente":1566,
        "token":"inv-61a04c6a4a41961a04c6a4a41f"
    }

    // Convierte el ARRAY en un JSON y lo pone en un buffer para luego convertirlo
    const bParamDat1 = Buffer.from(JSON.stringify(cJSONFinal))
    // Convierte el JSON en un string cifrado en base 64
    const cRetornoArray = bParamDat1.toString("base64")
    // Creo una URL concatenando el código base64 recien obtenido
    const cRutaContenidoArray = "https://mi.unipago.app/pagar/" + cRetornoArray 

    return cRutaContenidoArray

    
}