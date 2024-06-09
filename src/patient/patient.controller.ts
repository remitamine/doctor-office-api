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

import { PatientGuard } from './auth/patient.guard';
import { PatientService } from './patient.service';

import { CreatePatientDto } from './dto/create-patient.dto';
import { LoginDto } from '../common/dto/login.dto';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createDoctorDto: CreatePatientDto) {
    createDoctorDto.password = await bcrypt.hash(createDoctorDto.password, 10);
    await this.patientService.create(createDoctorDto);
    return;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const doctor = await this.patientService.findOneByEmail(loginDto.email);
    if (
      !(doctor && (await bcrypt.compare(loginDto.password, doctor.password)))
    ) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this.jwtService.signAsync({ sub: doctor.id }),
    };
  }

  @UseGuards(PatientGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.patientService.findOneById(req.auth.sub);
  }
}
