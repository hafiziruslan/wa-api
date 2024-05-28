
import { Request, Response } from 'express';
import Prometheus from 'prom-client';

const register = new Prometheus.Registry();

export async function metrics(req: Request, res: Response) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody = false
     #swagger.description = 'This endpoint can be used to check the status of API metrics. It returns a response with the collected metrics.'
     }
   */
  const register = new Prometheus.Registry();
  register.setDefaultLabels({
    app: 'wppconnect-server',
  });
  Prometheus.collectDefaultMetrics({ register });

  res.setHeader('Content-Type', register.contentType);
  register.metrics().then((data) => res.status(200).send(data));
}
export const prometheusRegister = register;
