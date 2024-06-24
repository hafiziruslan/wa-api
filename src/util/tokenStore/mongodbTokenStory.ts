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
import Token from './model/token';

class MongodbTokenStore {
  declare client: any;
  constructor(client: any) {
    this.client = client;
  }
  tokenStore = {
    getToken: async (sessionName: string) => {
      let result = await (Token as any).findOne({ sessionName });
      if (result === null) return result;
      result = JSON.parse(JSON.stringify(result));
      result.config = JSON.parse(result.config);
      result.config.webhook = result.webhook;
      this.client.config = result.config;
      return result;
    },
    setToken: async (sessionName: any, tokenData: any) => {
      const token = new (Token as any)(tokenData);
      token.sessionName = sessionName;
      token.webhook = this.client.config.webhook;
      token.config = JSON.stringify(this.client.config);

      const tk = await (Token as any).findOne({ sessionName });

      if (tk) {
        token._id = tk._id;
        return (await (Token as any).updateOne({ _id: tk._id }, token))
          ? true
          : false;
      } else {
        return (await token.save()) ? true : false;
      }
    },
    removeToken: async (sessionName: string) => {
      return (await (Token as any).deleteOne({ sessionName })) ? true : false;
    },
    listTokens: async () => {
      const result = await (Token as any).find();
      return result.map((m: any) => m.sessionName);
    },
  };
}

export default MongodbTokenStore;
