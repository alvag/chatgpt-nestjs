import { Injectable } from '@nestjs/common';
import { orthographyUseCase } from './use-cases';

@Injectable()
export class GptService {

  async orthographyCheck() {
    return await orthographyUseCase();
  }

}
