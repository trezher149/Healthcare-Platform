import * as jose from 'jose'

const priv_key = ``

const pub_key = ``
async function tokenDecode(token) {
  const publicKey = await jose.importSPKI(pub_key, "RS256")
  const {payload, protectedHeader} = await jose.jwtVerify(token, publicKey)
  return typeof(payload) == "string" ? JSON.parse(payload) : payload
}

async function headerTokenDecode(token) {
  return tokenDecode(token.split(" ")[1])
}

async function generateToken(obj) {
  const privateKey = await jose.importPKCS8(priv_key, "RS256")
  const jwt = await new jose.SignJWT(obj).setProtectedHeader({ alg: "RS256"}).sign(privateKey)
  return jwt
}

async function generateBearer(obj, customPrefix = "Bearer") {
  const token = await generateToken(obj)
  return `${customPrefix} ${token}`
}

export { generateBearer, headerTokenDecode, tokenDecode}