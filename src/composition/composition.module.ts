import { Module } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CompositionGateway } from './composition.gateway';

@Module({
  providers: [CompositionGateway, CompositionService],
})
export class CompositionModule {}
