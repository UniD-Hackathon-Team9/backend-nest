import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { RecommendModule } from './recommend/recommend.module';

@Module({
  imports: [CommonModule, RecommendModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
