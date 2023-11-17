import axios from 'axios'
import { Buffer } from 'buffer'

const client_id = '0121c9754df14f919e4db5a78bece9d0'
const client_secret = '8e8c5c6cf9fc49e2ac721426b0cee105'
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64')

const Spotify = {
  getToken: async () => {
    try {
      // make post request to SPOTIFY API for receive the access token
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        { grant_type: 'client_credentials' },
        {
          headers: {
            Authorization: `Basic ${auth_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      return response.data.access_token
    } catch (error) {
      console.log(error.message)
    }
  },

  getSearch: async (search) => {
    const TOKEN = await Spotify.getToken()
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      return response
    } catch (error) {}
  },
}

export default Spotify
