import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class CompositionGateway {
  constructor(private readonly compositionService: CompositionService) {}

  @SubscribeMessage('createComposition')
  create(@MessageBody() createCompositionDto: CreateCompositionDto) {
    return this.compositionService.create(createCompositionDto);
  }

  @SubscribeMessage('findAllComposition')
  findAll() {
    return this.compositionService.findAll();
  }

  @SubscribeMessage('findOneComposition')
  findOne(@MessageBody() id: number) {
    return this.compositionService.findOne(id);
  }

  @SubscribeMessage('updateComposition')
  update(@MessageBody() updateCompositionDto: UpdateCompositionDto) {
    return this.compositionService.update(updateCompositionDto.id, updateCompositionDto);
  }

  @SubscribeMessage('removeComposition')
  remove(@MessageBody() id: number) {
    return this.compositionService.remove(id);
  }
}
