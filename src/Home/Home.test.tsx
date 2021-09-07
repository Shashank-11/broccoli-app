import { shallow, ShallowWrapper } from "enzyme";
import Home from "./Home";
import Button from "../components/Button/Button";

describe("rendering Home component", () => {
  it("renders App component without crashing", () => {
    shallow(<Home />);
  });

  it("displays the title for the home page", () => {
    const wrapper: ShallowWrapper = shallow(<Home />);
    expect(wrapper.find("h1").text()).toContain(
      "A better way to enjoy everyday!"
    );
  });
  it("has a button to open request to invite modal", () => {
    const wrapper: ShallowWrapper = shallow(<Home />);

    const button = wrapper.find(Button);
    expect(button.props().children).toEqual("Request an invite");
  });
});
