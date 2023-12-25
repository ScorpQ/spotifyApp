async function sha256(plain) {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
  
    return window.crypto.subtle.digest('SHA-256', data)
  }
  
  function base64urlencode(a){
    return btoa(String.fromCharCode.apply(null, new Uint8Array(a))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }
  
  const hashed = await sha256(verifyCode)
  const codeChallenge = base64urlencode(hashed)