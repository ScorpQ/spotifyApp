import axios from 'axios';
import qs from 'qs'
import { Buffer } from 'buffer'


const client_id = '0121c9754df14f919e4db5a78bece9d0';
const client_secret = '8e8c5c6cf9fc49e2ac721426b0cee105';
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');


const getToken = async () => {
    try{
      //make post request to SPOTIFY API for access token, sending relavent info
      const token_url = 'https://accounts.spotify.com/api/token';
      const data = qs.stringify({'grant_type':'client_credentials'});
  
      const response = await axios.post(token_url, data, {
        headers: { 
          'Authorization': `Basic ${auth_token}`,
          'Content-Type': 'application/x-www-form-urlencoded' 
        }
      })
      //return access token
      return response;

    }catch(error){
      //on fail, log the error in console
      console.log(error);
    }
  }
  
  
export default getToken;



  