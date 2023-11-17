import axios from 'axios'

const getSearch = async () => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
      headers: {
        Authorization:
          'Bearer BQAZ1XOPqrAsNCdDIcwElDMwxOMlTULIq7MhDkyFiibsrCLn0IZdolDOMU4fj3Rp_sVn0f_vGCUHkoWK5w6INNn3ofxYp-qsIUGRJmFO_bjdpU1R6nA',
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export default getSearch
