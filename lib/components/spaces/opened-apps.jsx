import * as Uebersicht from "uebersicht";
import * as AppIcons from "../../app-icons";
import { SuspenseIcon } from "../icons/icon.jsx";
import * as Utils from "../../utils";

const { React } = Uebersicht;

export default function OpenedApps({ apps }) {
  if (!apps.length) return null;
  return Utils.sortWindows(apps).map((app, i) => {
    const {
      "is-minimized": isMinimized,
      "has-focus": hasFocus,
      app: appName,
      "has-parent-zoom": hasParentZoom,
      "has-fullscreen-zoom": hasFullscreenZoom,
      "is-topmost": isTopmost,
    } = app;
    if (isMinimized) return null;

    const Icon = AppIcons.apps[appName] || AppIcons.apps.Default;

    const classes = Utils.classNames("space__icon", {
      "space__icon--focused": hasFocus,
      "space__icon--fullscreen": hasParentZoom || hasFullscreenZoom,
      "space__icon--topmost": isTopmost,
    });

    return (
      <SuspenseIcon key={i}>
        <Icon className={classes} />
      </SuspenseIcon>
    );
  });
}
