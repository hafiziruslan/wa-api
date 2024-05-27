import { BucketLocationConstraint } from '@aws-sdk/client-s3';

export interface ServerOptions {
  secretKey: string;
  host: string;
  port: number;
  deviceName: string;
  poweredBy: string;
  startAllSession: boolean;
  tokenStoreType: string;
  maxListeners: number;
  customUserDataDir: string;
  webhook: {
    url: string;
    autoDownload: boolean;
    uploadS3: boolean;
    allUnreadOnStart: boolean;
    listenAcks: boolean;
    onIncomingCall: boolean,
    onLabelUpdated: boolean,
    onParticipantsChanged: boolean;
    onPollResponse: boolean;
    onPresenceChanged: boolean;
    onReactionMessage: boolean;
    onRevokedMessage: boolean;
    onSelfMessage: boolean;
    readMessage: boolean;
    ignore: string[];
  };
  websocket: {
    autoDownload: boolean;
    uploadS3: boolean;
  };
  archive: {
    enable: boolean;
    waitTime: number;
    daysToArchive: number;
  };
  log: {
    level: string;
    logger: string[];
  };
  createOptions: {
    browserArgs: string[];
  };
  mapper: {
    enable: boolean;
    prefix: string;
  };
  db: {
    mongodbDatabase: string;
    mongodbCollection: string;
    mongodbUser: string;
    mongodbPassword: string;
    mongodbHost: string;
    mongoIsRemote: boolean;
    mongoURLRemote: string;
    mongodbPort: number;
    redisHost: string;
    redisPort: number;
    redisPassword: string;
    redisDb: string;
    redisPrefix: string;
  };
  aws_s3: {
    region: BucketLocationConstraint | null;
    access_key_id: string | null;
    secret_key: string | null;
    defaultBucketName: string | null;
    endpoint?: string | null;
    forcePathStyle?: boolean | null;
  };
}
