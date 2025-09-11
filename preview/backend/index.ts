/* This folder contains temporary code to be moved to a different package in the future. */
import { createInstance } from "@module-federation/runtime";
import pulseConfig from "../../pulse.config";
import { performReload } from "@module-federation/node/utils";

export async function loadAndCall(func: string, req: Request) {
  await performReload(true);

  // here we assign the return value of the init() function, which can be used to do some more complex
  // things with the module federation runtime
  const instance = createInstance({
    name: "preview_host",
    remotes: [
      {
        name: pulseConfig.id + "_server",
        entry: `http://localhost:3030/.server-function/remoteEntry.js`,
      },
    ],
  });

  const loadedFunc = (
    (await instance.loadRemote(
      `${pulseConfig.id}_server/${func}`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as any
  ).default as (req: Request) => Promise<Response>;

  const res = await loadedFunc(req);

  return res;
}
