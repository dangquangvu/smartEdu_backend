import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as token from '../../../token.json';
import * as credential from '../../../credential.json';
import { ICredential } from './stream.interface';

@Injectable()
export class AccountService {
  SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  //get account auth query
  async getAuth() {
    const { access_token, refresh_token, expiry_date, email } = <any>token;
    const auth = await this.authorize(credential, {
      access_token: access_token,
      refresh_token: refresh_token,
      scope: 'https://www.googleapis.com/auth/drive',
      token_type: 'Bearer',
      expiry_date: expiry_date,
    });
    return auth;
  }

  drive = google.drive({
    version: 'v3',
  });

  //getlink authen get code
  getAuthUrl = () => {
    const oauth2Client = new google.auth.OAuth2(
      (<any>credential).installed.client_id,
      (<any>credential).installed.client_secret,
      (<any>credential).installed.redirect_uris[0],
    );
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.SCOPES,
      include_granted_scopes: true
    });
  };
  //get and save token file
  getTokenFile = async () => {
    const code = await this.readFileSync();
    const data = await this.add(code);
    if (data) {
      await this.writeFileSync(JSON.stringify(data));
      return data;
    }
  };

  add = code => {
    return new Promise((resolve, reject) => {
      const { client_id, client_secret, redirect_uris } = (<any>(
        credential
      )).installed;
      const oauth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0],
      );
      oauth2Client.getToken(code, (err, tokens) => {
        if (err) {
          return reject(err);
        }
        try {
          oauth2Client.setCredentials(tokens);
          var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
          });
          if (!tokens.hasOwnProperty('refresh_token')) {
            return reject(Error('No refresh token'));
          }
          oauth2.userinfo.v2.me.get(async (err, res) => {
            if (err) {
              return reject(err);
            } else {
              try {
                let fields = {
                  email: res.data.email,
                  credential: credential,
                  access_token: tokens.access_token,
                  refresh_token: tokens.refresh_token,
                  token_type: tokens.token_type,
                  expiry_date: tokens.expiry_date,
                  id_token: null,
                };
                if (tokens.hasOwnProperty('id_token')) {
                  fields.id_token = tokens.id_token;
                }
                return resolve(fields);
              } catch (err) {
                return reject(err);
              }
            }
          });
        } catch (err) {
          return reject(err);
        }
      });
    });
  };

  authorize = (credential, token) => {
    const { client_secret, client_id, redirect_uris } =
      credential.installed || credential.web;
    var oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );
    // Check if we have previously stored a token.
    oauth2Client.setCredentials(token);
    return oauth2Client;
  };

  writeFileSync = data => {
    fs.writeFileSync('token.json', data, 'utf8');
    console.log('ss');
  };

  readFileSync = async () => {
    const data = await fs.readFileSync('code.txt', 'utf8');
    if (!data) {
      return '';
    }
    return data;
  };
}
