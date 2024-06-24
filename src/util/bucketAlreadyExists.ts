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
import { HeadBucketCommand, S3Client } from '@aws-sdk/client-s3';

import { logger } from '..';
import config from '../config';

export async function bucketAlreadyExists(bucketName: string) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (!config.aws_s3.region) throw new Error('Config your AWS environment');
      const s3Client = new S3Client({ region: config.aws_s3.region });

      const command = new HeadBucketCommand({ Bucket: bucketName });
      await s3Client.send(command);
      resolve(true);
    } catch (error: any) {
      if (error.name === 'NoSuchBucket' || error.name === 'NotFound') {
        resolve(false);
      } else {
        logger.error(error);
        reject(error);
      }
    }
  });
}
