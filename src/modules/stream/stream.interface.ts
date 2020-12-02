import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export interface ICredential {
  installed: {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

export class createDirDto {
  @ApiProperty({
    example: '/home/happy/code/smart-edu/mp4/a.mp4',
    description: 'url upload mp4',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly yrl: string;
}
