import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyUseCase = async ( openai: OpenAI, options: Options ) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create( {
    messages: [
      {
        role: 'system',
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        las palabras usadas deben de existir en el diccionario de la Real Academia Española,
        debes de responder en formato JSON,
        tu tarea es corregirlos y retornar información de las solicitudes,
        también debes de dar un porcentaje de acierto por el usuario.
        
        Si no hay errores, debes de retornar un mensaje indicando que no hay errores.
        
        {
          userScore: number,
          errors: string[]. // ['error -> solución'],
          message: string, // usa emojis y texto para dar retroalimentación al usuario
        }
        `
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object'
    }
  } );

  return JSON.parse( completion.choices[ 0 ].message.content );
};
