import { Injectable } from '@nestjs/common';
import { orthographyUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {

  async orthographyCheck( orthographyDto: OrthographyDto ) {
    return await orthographyUseCase( {
      prompt: orthographyDto.prompt
    } );
  }

}
