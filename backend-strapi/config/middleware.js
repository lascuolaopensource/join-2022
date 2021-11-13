module.exports = {
    //...
    settings: {
      cors: {
        enabled: true, 
        // headers: '*', 
        origin: ["http://localhost:1337", process.env.FRONTEND_URL, process.env.BACKEND_URL ],
      },
    },
  };