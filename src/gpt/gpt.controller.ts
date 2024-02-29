import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';

@Controller( 'gpt' )
export class GptController {
  constructor( private readonly gptService: GptService ) {
  }

  @Post( 'orthography-check' )
  orthographyCheck( @Body() orthographyDto: OrthographyDto ) {
    return this.gptService.orthographyCheck( orthographyDto );
  }

  @Post( 'pros-cons-discusser' )
  prosConsDiscusser( @Body() prosConsDiscusserDto: ProsConsDiscusserDto ) {
    return this.gptService.prosConsDiscusser( prosConsDiscusserDto );
  }

  @Post( 'pros-cons-discusser-stream' )
  async prosConsDiscusserStream( @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
                                 @Res() response: Response
  ) {
    const stream = await this.gptService.prosConsDiscusserStream( prosConsDiscusserDto );

    response.setHeader( 'Content-Type', 'application/json' );
    response.status( HttpStatus.OK );

    for await ( const chunk of stream ) {
      const piece = chunk.choices[ 0 ].delta.content ?? '';
      response.write( piece );
    }

    response.end();

    return response;
  }
}
