import type { Options, Context } from "./types";
import { Ware } from "./core/ware";
import question from "./question";
import resolve from "./resolve";
import load from "./load";
import inquire from "./inquire";
import prepare from "./prepare";
import render from "./render";
import release from "./release";

const app = new Ware<Context>();

app.use(question);
app.use(resolve);
app.use(load);
app.use(inquire);
app.use(prepare);
app.use(render);
app.use(release);

export default async (
  template: string,
  projectName: string = ".",
  options: Options = {}
): Promise<void> => {
  // required arguments
  if (template == null || template === "") {
    throw new Error("Missing required argument: `template`.");
  }

  // create context
  const context = {
    template,
    projectName,
    options,
    src: "",
    dest: "",
    config: Object.create(null),
    answers: Object.create(null),
    files: [],
  };

  // running cli
  await app.run(context);
};
