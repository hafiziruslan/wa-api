import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const saltRounds = 10;

export async function encryptSession(
  req: Request,
  res: Response
): Promise<any> {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.parameters['secretkey'] = {
       schema: 'THISISMYSECRETKEY',
     }
     #swagger.parameters["session"] = {
      schema: '60123456789'
     }
     #swagger.autoHeaders = false
   */
  const { session, secretkey } = req.params;
  const { authorization: token } = req.headers;
  const secureTokenEnv = req.serverOptions.secretKey;

  let tokenDecrypt = '';

  if (secretkey === undefined) {
    tokenDecrypt = (token as string).split(' ')[0];
  } else {
    tokenDecrypt = secretkey;
  }

  if (tokenDecrypt !== secureTokenEnv) {
    return res.status(400).json({
      response: false,
      message: 'The SECRET_KEY is incorrect',
    });
  }

  bcrypt.hash(session + secureTokenEnv, saltRounds, function (err, hash) {
    if (err) return res.status(500).json(err);

    const hashFormat = hash.replace(/\//g, '_').replace(/\+/g, '-');
    return res.status(201).json({
      status: 'success',
      session: session,
      token: hashFormat,
      full: `${session}:${hashFormat}`,
    });
  });
}
