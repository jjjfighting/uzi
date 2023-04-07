export interface Options {
  force?: boolean;
  //   [key: string]: unknown;
}

export interface Context {
  /** 模板名称/remote url */
  template: string;
  /** 生成项目名称 */
  projectName: string;
  /** cli 命令配置 */
  options: Options;
  /** template cache place  */
  src: string;
  /** 生成目录 */
  dest: string;
  /** 配置 */
  config: any;
  /** prompt问答 */
  answers: any;
  /** 文件blob */
  files: any[];
}
