import Space from "./space.jsx";
export { styles } from "../../styles/components/spacesV2/spaces";

export function Component({ spaces, currentSpace }) {
  return (
    <div className="spaces">
      {spaces.map((space) => (
        <Space
          key={space.id}
          space={space}
          focused={space.id === currentSpace}
        />
      ))}
    </div>
  )
}
