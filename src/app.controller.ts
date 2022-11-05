import { Body, Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  constructor(){}

  @Get('/')
  health(){
    return {"health": true}
  }
}
