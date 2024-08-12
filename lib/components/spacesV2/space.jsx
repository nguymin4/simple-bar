import * as Uebersicht from "uebersicht";
import { useSimpleBarContext } from "../simple-bar-context.jsx";
import * as Utils from "../../utils";

const { React } = Uebersicht;

export default function Space({ space, focused }) {
  const { settings } = useSimpleBarContext();
  const { aerospacePath } = settings.global;
  const { id, label } = space

  const onClick = () => {
    Uebersicht.run(`${aerospacePath} workspace ${id}`);
  }

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
            value={label}
            style={{ width: `${label.length}ch` }}
            readOnly
          />
        </button>
      </div>
    </React.Fragment>
  )
}
