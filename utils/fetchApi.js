import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const {data} = await axios.get((url), {
        headers: {
                 'x-rapidapi-host': 'bayut.p.rapidapi.com',
                 'x-rapidapi-key': '4460d50f19msh58fb9515711345ep12c352jsn24a0126c241f'
               }  
    })

    return data;
}