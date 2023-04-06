const cac = require('cac');

const cli = cac();

cli
  .command('deploy <folder>', 'Deploy a folder to AWS')
  .option('--scale [level]', 'Scaling level')
  .action((folder, options) => {
      console.log('folder: ', folder);
      console.log('options: ', options);
    // ...
  })

cli
  .command('build [project]', 'Build a project')
  .option('--out [dir]', 'Output directory')
  .action((folder, options) => {
    // ...
    console.log('folder: ', folder);
    console.log('options: ', options);
  })
  const parsed = cli.parse()
  
  console.log(JSON.stringify(parsed, null, 2))