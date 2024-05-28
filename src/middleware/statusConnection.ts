
import { NextFunction, Request, Response } from 'express';
import { contactToArray } from '../util/functions';

export default async function statusConnection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const numbers: any = [];
    if (req.client && req.client.isConnected) {
      await req.client.isConnected();

      const localArr = contactToArray(
        req.body.phone || [],
        req.body.isGroup,
        req.body.isNewsletter
      );
      let index = 0;
      for (const contact of localArr) {
        if (req.body.isGroup || req.body.isNewsletter) {
          localArr[index] = contact;
        } else if (numbers.indexOf(contact) < 0) {
          const profile: any = await req.client
            .checkNumberStatus(contact)
            .catch((error) => console.log(error));
          if (!profile?.numberExists) {
            const num = (contact as any).split('@')[0];
            return res.status(400).json({
              response: null,
              status: 'Connected',
              message: `The number ${num} does not exist.`,
            });
          } else {
            if ((numbers as any).indexOf(profile.id._serialized) < 0) {
              (numbers as any).push(profile.id._serialized);
            }
            (localArr as any)[index] = profile.id._serialized;
          }
        }
        index++;
      }
      req.body.phone = localArr;
    } else {
      return res.status(404).json({
        response: null,
        status: 'Disconnected',
        message: 'WhatsApp session is not active.',
      });
    }
    next();
  } catch (error) {
    req.logger.error(error);
    return res.status(404).json({
      response: null,
      status: 'Disconnected',
      message: 'WhatsApp session is not active.',
    });
  }
}
