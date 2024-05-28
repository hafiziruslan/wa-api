
import { Readable } from 'stream';

// type AsyncBufferToStream

function bufferToReadableStream(buffer: Buffer): Readable {
  const readableInstanceStream = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });

  return readableInstanceStream;
}

async function AsyncBufferToStream(buffer: Buffer): Promise<Readable> {
  return new Promise((resolve, reject) => {
    const bufferStream = bufferToReadableStream(buffer);
    bufferStream.on('data', () => {
      // data = chunck;
    });

    bufferStream.on('end', () => {
      resolve(bufferStream);
    });

    bufferStream.on('error', (error) => {
      reject(error);
    });
  });
}

export default { bufferToReadableStream, AsyncBufferToStream };
