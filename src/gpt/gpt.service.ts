import { Injectable } from '@nestjs/common';
import { orthographyUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {

  private openai = new OpenAI( {
    apiKey: process.env.OPENAI_API_KEY
  } );

  async orthographyCheck( orthographyDto: OrthographyDto ) {
    return await orthographyUseCase( this.openai, {
      prompt: orthographyDto.prompt
    } );
  }

  async prosConsDiscusser( { prompt }: ProsConsDiscusserDto ) {
    return await prosConsDiscusserUseCase( this.openai, { prompt } );
  }

  async prosConsDiscusserStream( { prompt }: ProsConsDiscusserDto ) {
    return await prosConsDiscusserStreamUseCase( this.openai, { prompt } );
  }

}
