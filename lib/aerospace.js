/* eslint-disable no-console */
import * as Uebersicht from "uebersicht";
import * as Settings from "./settings";

const settings = Settings.get();
const { aerospacePath = "/opt/homebrew/bin/aerospace" } = settings.global;

export async function getFocusedWindow() {
  try {
    const focusedAppRaw = await Uebersicht.run(`
      ${aerospacePath} list-windows --focused \
        --format '{"windowId": "%{window-id}", "appName": "%{app-name}", "workspace": %{workspace} }'
    `);
    return JSON.parse(focusedAppRaw)
  } catch (err) {
    console.warn(err)
    return {};
  }
}

export async function listWindows(workspace) {
  try {
    const filter = workspace ? `--workspace ${workspace}` : "--all"
    const appsRaw = await Uebersicht.run(`
      ${aerospacePath} list-windows ${filter} \
        --format '{"windowId": "%{window-id}", "appName": "%{app-name}", "workspace": %{workspace} },'
    `);

    // This is a hack as aerospace doesn't support json output format
    return JSON.parse(`[${appsRaw.trim().slice(0, -1)}]`);
  } catch (err) {
    console.warn(err)
    return [];
  }
}

export async function goToSpace(id) {
  await Uebersicht.run(`${aerospacePath} workspace ${id}`);
}
