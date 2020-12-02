import { AccountService } from './account.service';
import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');
import * as mime from 'mime';
import * as fs from 'fs';

@Injectable()
export class StreamService {
  folderId = '1SsXGMQz2UpGJQqvOgW_zSpkew8EE2JEv';
  drive = google.drive({
    version: 'v3',
  });
  constructor(private readonly accountService: AccountService) {}

  postVideo = async dir => {
    const auth = await (await this.accountService.getAuth()).auth;
    var fileMetadata = {
      name: this.convertName(dir),
      parents: [this.folderId],
    };
    var media = {
      mimeType: mime.getType(dir),
      body: await fs.createReadStream(dir),
    };
    let data = await this.drive.files.create({
      auth: auth,
      resource: fileMetadata,
      media: media,
      fields: 'id,name',
    });
    if (data) {
      return data;
    }
    return false;
  };

  convertName(dir: string) {
    const arr = dir.split('/');
    return arr[arr.length - 1];
  }
}
