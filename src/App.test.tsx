import { shallow, ShallowWrapper } from "enzyme";
import App from "./App";
import Main from "./Main";

describe("rendering App components", () => {
  it("renders App component without crashing", () => {
    shallow(<App />);
  });
  it("displays a main component", () => {
    const wrapper: ShallowWrapper = shallow(<App />);

    expect(wrapper.find(Main).exists()).toEqual(true);
  });
});
