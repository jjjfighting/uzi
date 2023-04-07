import type { Options, Context } from './types'
import { Ware } from './core/ware';
import question from './question';
import resolve from './resolve'

const app = new Ware<Context>();

app.use(question);
app.use(resolve);


export default async (template: string, projectName: string = '.', options: Options = {}): Promise<void> => {
  
    console.log('template: ', template);
    console.log('projectName: ', projectName);
    console.log('options: ', options);
    // required arguments
    if (template == null || template === '') {
      throw new Error('Missing required argument: `template`.')
    }
  
    // create context
    const context = {
      template,
      projectName,
      options,
      src: '',
      dest: '',
      config: Object.create(null),
      answers: Object.create(null),
      files: []
    }
  
    // running cli
    await app.run(context)
  }