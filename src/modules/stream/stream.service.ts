import { AccountService } from './account.service';
import { BadRequestException, Injectable } from '@nestjs/common';
const { google } = require('googleapis');
import * as mime from 'mime';
import * as fs from 'fs';
import { convertName } from 'src/shared/helper';
import { IPath } from './stream.type';

@Injectable()
export class StreamService {
  folderId = '1SsXGMQz2UpGJQqvOgW_zSpkew8EE2JEv';
  drive = google.drive({
    version: 'v3',
  });
  constructor(private readonly accountService: AccountService) {}

  postVideo = async dir => {
    const auth = await await this.accountService.getAuth();
    var fileMetadata = {
      name: convertName(dir),
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

  indexPaths = async (): Promise<any> => {
    const auth = await await this.accountService.getAuth();
    function getAllFiles(folderId, pageToken, allFiles = []) {
      return new Promise((resolve, reject) => {
        const drive = google.drive('v3');
        drive.files.list(
          {
            auth: auth,
            pageToken: pageToken,
            pageSize: 1000,
            q: "'" + folderId + "' in parents and trashed=false",
            fields: 'nextPageToken,files(name,id)',
          },
          (err, res) => {
            if (err) {
              console.log(err);
              return;
            }
            allFiles = allFiles.concat(res.data.files);
            if (res.data.nextPageToken) {
              getAllFiles(folderId, res.data.nextPageToken, allFiles).then(
                resAllFiles => {
                  return resolve(resAllFiles);
                },
              );
            } else {
              return resolve(allFiles);
            }
          },
        );
      });
    }
    const results = getAllFiles(this.folderId, '', []);
    return results;
  };

  indexUrlVideo = async (id: string) => {
    if (!id) {
      throw new BadRequestException('Id is not match!');
    }
    const paths: IPath[] = await this.indexPaths();
    const exist = paths && paths.filter(path => path.id === id);
    if (!exist[0].id) {
      throw new BadRequestException('Id is not found!');
    }
    const url = `https://www.googleapis.com/drive/v3/files/${exist[0].id}?alt=media&key=AIzaSyAz9zeayNFx6H7Op4XWn3K2VfFCb6cfbBg&v=.mp4`;
    return url;
  };
}
