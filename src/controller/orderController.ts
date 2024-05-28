import { Request, Response } from 'express';

function returnSucess(
  res: Response,
  session: string,
  phone: string | null,
  data?: any
) {
  res.status(201).json({
    status: 'Success',
    response: {
      message: 'Information retrieved successfully.',
      contact: phone,
      session: session,
      data: data,
    },
  });
}

function returnError(
  req: Request,
  res: Response,
  session: string,
  error?: any
) {
  req.logger.error(error);
  res.status(400).json({
    status: 'Error',
    response: {
      message: 'Error retrieving information',
      session: session,
      log: error,
    },
  });
}

export async function getBusinessProfilesProducts(req: Request, res: Response) {
  /**
   * #swagger.tags = ["Catalogs"]
     #swagger.autoBody = false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: '60123456789'
     }
     #swagger.parameters["phone"] = {
      in: 'query',
      schema: '601112345678@c.us',
     }
   */
  const session = req.session;
  const { phone } = req.query as unknown as any;

  try {
    const results: any = [];

    const result = await req.client.getBusinessProfilesProducts(phone);
    results.push(result);

    returnSucess(res, session, phone, results);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
export async function getOrderbyMsg(req: Request, res: Response) {
  /**
   * #swagger.tags = ["Catalogs"]
     #swagger.autoBody = false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: '60123456789'
     }
     #swagger.parameters["messageId"] = {
      schema: 'true_601112345678@c.us_3EB0E69ACC5B396B21F2FE'
     }
   */
  const session = req.session;
  const { messageId } = req.params;

  try {
    const result = await (req.client as any).getOrder(messageId);

    returnSucess(res, session, null, result);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
