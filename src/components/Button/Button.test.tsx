import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Button from "./Button";

describe("rendering Button", () => {
  const props = {
    children: <div>dcdvd </div>,
    handleClick: jest.fn(),
    loading: false,
  };

  it("renders Button component without crashing", () => {
    shallow(<Button {...props} />);
  });

  it("renders children when passed in", () => {
    const wrapper: ShallowWrapper = shallow(
      <Button {...props}>
        <div> Submit </div>
      </Button>
    );
    expect(wrapper.contains(<div> Submit </div>)).toEqual(true);
  });

  it("Test click event", () => {
    const mockCallBack = jest.fn();
    const button: ShallowWrapper = shallow(
      <Button handleClick={mockCallBack}>{props.children}</Button>
    );
    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
