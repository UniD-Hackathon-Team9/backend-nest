import { Body, Controller, Post } from '@nestjs/common';
import { RecommendDto } from './dto/recommend.dto';
import { RecommendPayload } from './payload/recommend.payload';
import { RecommendService } from './recommend.service';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Post('/')
  async recommend(
    @Body() input: RecommendPayload,
  ): Promise<RecommendDto> {
    return this.recommendService.recommend(input)
  }
}
