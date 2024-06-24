/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import config from '../../config';
import redisClient from '../db/redis/db';
import { getIPAddress } from '../functions';

class RedisTokenStore {
  declare client: any;
  declare prefix: string;
  constructor(client: any) {
    this.client = client;

    let prefix = config.db.redisPrefix || '';
    if (prefix === 'docker') {
      prefix = getIPAddress();
    }
  }
  tokenStore = {
    getToken: (sessionName: string) =>
      new Promise((resolve, reject) => {
        (redisClient as any).get(
          this.prefix + sessionName,
          (err: any, reply: any) => {
            if (err) {
              return reject(err);
            }
            const object = JSON.parse(reply);
            if (object) {
              if (object.config && Object.keys(this.client.config).length === 0)
                this.client.config = object.config;
              if (
                object.webhook &&
                Object.keys(this.client.config).length === 0
              )
                this.client.config.webhook = object.webhook;
            }
            resolve(object);
          },
        );
      }),
    setToken: (sessionName: string, tokenData: any) =>
      new Promise((resolve) => {
        tokenData.sessionName = sessionName;
        tokenData.config = this.client.config;
        (redisClient as any).set(
          this.prefix + sessionName,
          JSON.stringify(tokenData),
          (err: any) => {
            return resolve(err ? false : true);
          },
        );
      }),
    removeToken: (sessionName: string) =>
      new Promise((resolve) => {
        (redisClient as any).del(this.prefix + sessionName, (err: any) => {
          return resolve(err ? false : true);
        });
      }),
    listTokens: () =>
      new Promise((resolve) => {
        (redisClient as any).keys(this.prefix + '*', (err: any, keys: any) => {
          if (err) {
            return resolve([]);
          }
          keys.forEach((item: any, indice: any) => {
            if (this.prefix !== '' && item.includes(this.prefix)) {
              keys[indice] = item.substring(
                item.indexOf(this.prefix) + this.prefix.length,
              );
            }
          });
          return resolve(keys);
        });
      }),
  };
}

export default RedisTokenStore;
