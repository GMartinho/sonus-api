import { Module } from '@nestjs/common';
import { CompositionModule } from './composition/composition.module';

@Module({
  imports: [CompositionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
