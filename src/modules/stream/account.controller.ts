import { AccountService } from './account.service';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { StreamService } from './stream.service';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly streamService: StreamService,
    private readonly accountService: AccountService,
  ) {}

  // get code after call api account (step 1 : get url redirect get code)
  @Get('getCode')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get code authen in project google drive' })
  getCode() {
    return this.accountService.getAuthUrl();
  }

   // get access token refresh token,id_token,... for get auth query google drive (step 2)
  @Get('account')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get account login google drive' })
  getAccount(): Promise<any> {
    return this.accountService.getTokenFile();
  }

  // get auth querry (step 3: get auth to request google driver api)
  @Get('auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get auth query google drive' })
  getAuth(): Promise<any> {
    return this.accountService.getAuth();
  }
}
