import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { DoctorGuard } from './auth/doctor.guard';
import { DoctorService } from './doctor.service';

import { CreateDoctorDto } from './dto/create-doctor.dto';
import { LoginDto } from '../common/dto/login.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TokenResponse } from '../common/responses/token.response';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createDoctorDto: CreateDoctorDto) {
    createDoctorDto.password = await bcrypt.hash(createDoctorDto.password, 10);
    await this.doctorService.create(createDoctorDto);
    return;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiNotFoundResponse()
  async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    const doctor = await this.doctorService.findOneByEmail(loginDto.email);
    if (
      !(doctor && (await bcrypt.compare(loginDto.password, doctor.password)))
    ) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this.jwtService.signAsync({ sub: doctor.id }),
    };
  }

  @UseGuards(DoctorGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiUnauthorizedResponse()
  getProfile(@Request() req) {
    return this.doctorService.findOneById(req.auth.sub);
  }
}
