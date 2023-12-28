import axios from 'axios'
import { Buffer } from 'buffer'

const user_id = 'k73awutonoht07mpf73mcmxrm'
const clientId = '0121c9754df14f919e4db5a78bece9d0'
const client_secret = '8e8c5c6cf9fc49e2ac721426b0cee105'
const scope = 'playlist-modify-public playlist-modify-private'
const authUrl = new URL('https://accounts.spotify.com/authorize')
const redirectUri = 'http://localhost:3000'
const auth_token = Buffer.from(`${clientId}:${client_secret}`, 'utf-8').toString('base64')

const Spotify = {
  CredentialTOKEN: null,
  PCKETOKEN: null,

  redirectToPage: async () => {
    // 1. Random String ve SHA256 Hash Oluşturma
    const generateRandomString = (length) => {
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const values = crypto.getRandomValues(new Uint8Array(length))
      return values.reduce((acc, x) => acc + possible[x % possible.length], '')
    }

    //SHA256 algorithm
    const sha256 = async (plain) => {
      const encoder = new TextEncoder()
      const data = encoder.encode(plain)
      return window.crypto.subtle.digest('SHA-256', data)
    }

    // returns the base64 representation of the digest
    const base64encode = (input) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
    }

    // accomplish of spotify security functions.
    localStorage.setItem('code_verifier', generateRandomString(64))

    const hashed = await sha256(localStorage.getItem('code_verifier'))
    const codeChallenge = base64encode(hashed)

    // Authorization URL Oluşturma
    const authUrl = new URL('https://accounts.spotify.com/authorize')
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }

    // Authorization URL Oluştuldu ve yönlendirildi.
    authUrl.search = new URLSearchParams(params).toString()
    window.location.href = authUrl.toString()
  },

  // get acces token via PCKE  /..1 kere almamız yetiyor gibi../
  getTokenPCKE: async () => {
    const urlParams = new URLSearchParams(window.location.search)
    let code = urlParams.get('code')
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: localStorage.getItem('code_verifier'),
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      //localStorage.setItem('access_token', response.data.access_token)
      document.cookie = `token=${response.data.access_token} expires=${Date()};`
      return response.data.access_token
    } catch (error) {
      console.log('getTokenPCKE alınamıyor: ' + error.message)
    }
  },

  // get acces token via Client Crendetials
  getTokenCredential: async () => {
    try {
      // make post request to SPOTIFY API for receive the access token
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        { grant_type: 'client_credentials' },
        {
          headers: {
            Authorization: `Basic ${auth_token}`, //  öğren
            'Content-Type': 'application/x-www-form-urlencoded', //  öğren
          },
        }
      )
      return response.data.access_token
    } catch (error) {
      console.log('TokenCredential alınamadı' + error.message)
    }
  },

  // Triggered while search something
  getSearchResult: async (search) => {
    if (!Spotify.CredentialTOKEN) {
      Spotify.CredentialTOKEN = Spotify.getTokenCredential()
    }
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
        headers: {
          Authorization: `Bearer ${Spotify.CredentialTOKEN}`,
        },
      })
      return response
    } catch (error) {
      console.log('veri yok')
    }
  },

  // Gets all playlist
  getPlaylist: async () => {
    if (!Spotify.CredentialTOKEN) {
      Spotify.CredentialTOKEN = await Spotify.getTokenCredential()
    }
    try {
      const response = await axios.get(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        headers: {
          Authorization: `Bearer ${Spotify.CredentialTOKEN}`,
        },
      })
      return response.data.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        image: playlist.images[0]?.url,
      }))
    } catch (error) {
      console.log('Initial playlist getirilemedi:' + error.message)
    }
  },

  // Get track clickecd playlist
  getTracks: async (playlistID) => {
    if (!Spotify.CredentialTOKEN) {
      Spotify.CredentialTOKEN = await Spotify.getTokenCredential()
    }
    try {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=3`, {
        headers: {
          Authorization: `Bearer ${Spotify.CredentialTOKEN}`,
        },
      })
      return response.data.items.map((item) => ({
        name: item.track.name,
        image: item.track.album.images[0].url,
        artist: item.track.artists[0].name,
        trackLink: item.track.external_urls.spotify,
      }))
    } catch (error) {
      console.log(error)
    }
  },

  // It creates playlist with the selected songs
  createPlaylist: async (playlistName, playlistDescrib, trackList, token, value) => {
    // extract each of track's uri
    trackList = trackList.map((item) => {
      /*
      console.log(`item name: ${item.name}`)
      console.log(`item uri: ${item.uri}`)
      console.log(`XXXXXXXXXXXXXXXXXXXXX`)
      */
      return item.uri
    })
    try {
      const newPlaylist = await axios.post(
        `https://api.spotify.com/v1/users/${user_id}/playlists`,
        {
          name: playlistName,
          description: playlistDescrib,
          public: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${newPlaylist.data.id}/tracks`,
        {
          uris: trackList,
          position: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response
    } catch (error) {
      console.error("Plasylist'e item ekleme:" + error.message)
    }
  },
}

export default Spotify
