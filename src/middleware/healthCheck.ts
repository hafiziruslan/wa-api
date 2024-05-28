
import { Request, Response } from 'express';

export async function healthz(req: Request, res: Response) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody = false
     #swagger.description = 'This endpoint can be used to check the health status of the API. It returns a response with a status code indicating the API's health status.'
     }
   */
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.status(200).send(healthcheck);
  } catch (e: any) {
    healthcheck.message = e;
    res.status(503).send();
  }
}

export async function unhealthy(req: Request, res: Response) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody = false
     #swagger.description = 'This endpoint is used to force the API into an unhealthy state. It can be useful for testing error handling or simulating service disruptions.'
     }
   */
  res.status(503).send();
  process.exit();
}
