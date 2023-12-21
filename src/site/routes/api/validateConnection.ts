import { verifyLogin } from '../../../utils/crypto';
import {TokenRepository} from "../../../utils/tokenRepository";

const cachedApi = new Map();

const tokenRepository = new TokenRepository();
export const validateConnection: (client, key) => Promise<boolean> =
  async (client, key) => {

    const cached = cachedApi.get(client);
    let token;
    if(!cached)
      token = await tokenRepository.readById(client);
    else
      token = cached
    const verified =  !(!token || !await verifyLogin(key, token.key, token.salt));
    if(verified)
      cachedApi.set(client,token);
    return verified;
  }