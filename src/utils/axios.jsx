import axios from "axios";


// axios configration are here !

const axi = axios.create({
    baseURL: '/',
    headers : {
      'Content-type' : 'application/json'
    }
});

export{ axi};
