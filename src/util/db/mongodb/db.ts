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
//import mongoose from 'mongoose';
import config from '../../../config';

const mongoose =
  config.tokenStoreType === 'mongodb' ? require('mongoose') : null;

if (config.tokenStoreType === 'mongodb') {
  mongoose.Promise = global.Promise;
  const userAndPassword =
    config.db.mongodbUser && config.db.mongodbPassword
      ? `${config.db.mongodbUser}:${config.db.mongodbPassword}@`
      : '';

  if (!config.db.mongoIsRemote) {
    mongoose.connect(
      `mongodb://${userAndPassword}${config.db.mongodbHost}:${config.db.mongodbPort}/${config.db.mongodbDatabase}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  } else {
    mongoose.connect(config.db.mongoURLRemote, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default mongoose;
