export const initialData = {
  // template download registry
  // {owner} & {name} & {branch} will eventually be replaced by the corresponding value
  // http://git.tsintergy.com:8070/frontend/adss-template-fire/-/archive/master/adss-template-fire-master.zip
  // TODO gitlab, github 构成方式不同
  registry:
    "http://git.tsintergy.com:8070/{owner}/{name}/-/archive/{branch}/{name}-{branch}.zip",
  // template offlicial owner name
  official: "frontend",
  // default template branch name
  branch: "master",
};
