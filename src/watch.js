import watch from "node-watch";
import { loadPages } from "./pages";

export default () => {
  watch(
    process.cwd(),
    { recursive: true, filter: (f) => !/dist/.test(f) },
    (evt, name) => {
      console.log("%s changed.", name, evt);
      loadPages();
    }
  );
};
