export const initialData = {
  // template download registry
  // {owner} & {name} & {branch} will eventually be replaced by the corresponding value
  // http://git.tsintergy.com:8070/frontend/adss-template-fire/-/archive/master/adss-template-fire-master.zip
  // TODO gitlab, github 构成方式不同
  registry:
    "http://git.tsintergy.com:8070/{owner}/{name}/-/archive/{branch}/{name}-{branch}.zip",
  gitlab_registry: 'http://git.tsintergy.com:8070/{owner}/{name}.git',
  temp: Object.create(null),
  // http://git.tsintergy.com:8070/frontend/adss-template-fire.git
  // template offlicial owner name
  official: "frontend",
  // default template branch name
  branch: "master",
};
