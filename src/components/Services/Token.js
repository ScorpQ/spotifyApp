import axios from 'axios';

const clientId = '0121c9754df14f919e4db5a78bece9d0'
const clientSecret = '8e8c5c6cf9fc49e2ac721426b0cee105'

const token = async () => {
    try{
        const response = await axios.post('https://accounts.spotify.com/api/token',
        {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        console.log(response)
    }
    catch{

    }
}

export default token;