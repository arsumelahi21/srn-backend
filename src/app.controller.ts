import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('jobs')
  addJob(@Body() data: { title: string; description: string }) {
    return this.appService.addJob(data);
  }

  @Post('candidates')
  addCandidate(@Body() data: { name: string; summary: string }) {
    return this.appService.addCandidate(data);
  }

  @Post('match')
  matchCandidates(@Body() input: { jobId?: number; description: string }) {
    return this.appService.matchCandidates(input);
  }
}
