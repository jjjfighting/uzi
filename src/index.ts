import type { Options, } from './types'


export default async (template: string, project: string = '.', options: Options = {}): Promise<void> => {
  
    console.log('template: ', template);
    console.log('project: ', project);
    console.log('options: ', options);
    // required arguments
    if (template == null || template === '') {
      throw new Error('Missing required argument: `template`.')
    }
  
    // create context
    const context = {
      template,
      project,
      options,
      src: '',
      dest: '',
      config: Object.create(null),
      answers: Object.create(null),
      files: []
    }
  
    // running creator
    // await creator.run(context)
  }