let [domain, clientId, clientSecret] = ['lelai', 'yy_frontend', 'xuu&15sGywOv#sbQV9Jf5!p8wwL1XuaK7%RXsCfrn^MBBc67hkcDxay0fx4pphvk']
if (process.env.NODE_ENV !== 'production') {
  [domain, clientId, clientSecret] = ['laile', 'testclient', 'client_secret']
}

export const rootUrl = `http://yy.${domain}.com/`
export {clientId}
export {clientSecret}
export const loginUrl = `http://auth.${domain}.com/auth/index?response_type=code&client_id=${clientId}&state=xyz&redirect_uri=${rootUrl}`
