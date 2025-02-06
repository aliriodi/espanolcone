export default function handler(req, res) {
    const ip = 
      req.headers["x-forwarded-for"]?.split(",")[0] || // IP real detrás de un proxy
      req.socket.remoteAddress; // IP directa
  
    res.status(200).json({ ip });
  }
  