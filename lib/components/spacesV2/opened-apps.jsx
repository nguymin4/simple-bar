import * as Uebersicht from "uebersicht";
import * as AppIcons from "../../app-icons";
import { SuspenseIcon } from "../icons/icon.jsx";
import * as Utils from "../../utils";

const { React } = Uebersicht;

export default function OpenedApps({ windows, focusedWindowId }) {
  if (!windows || !windows.length) {
    return null;
  }

  return windows.map(({ appName, windowId }) => {
    const Icon = AppIcons.apps[appName] || AppIcons.apps.Default;
    const classes = Utils.classNames("space__icon", {
      "space__icon--focused": windowId == focusedWindowId,
    });

    return (
      <SuspenseIcon key={windowId}>
        <Icon className={classes} style={{"margin": "0px 5px"}} />
      </SuspenseIcon>
    );
  });
}
