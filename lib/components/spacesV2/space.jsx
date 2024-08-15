import * as Uebersicht from "uebersicht";
import OpenedApps from "./opened-apps.jsx";
import * as Aerospace from "../../aerospace";
import * as Utils from "../../utils";

const { React } = Uebersicht;

export default function Space({ space, focused, apps }) {
  if (!apps && !focused) {
    return null
  }

  const onClick = () => Aerospace.goToSpace(space)
  
  const classes = Utils.classNames('space', {
    "space--focused": focused,
  });

  return (
    <React.Fragment>
      <div className={classes}>
        <button
          className="space__inner"
          onClick={onClick}
        >
          <input
            type="text"
            className="space__label"
            value={space}
            style={{ width: `${space.toString().length}ch` }}
            readOnly
          />
          <OpenedApps apps={apps} />
        </button>
      </div>
    </React.Fragment>
  )
}
