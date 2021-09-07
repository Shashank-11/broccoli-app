import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Container from "./Container";

describe("rendering Button", () => {
  const props = {
    children: <div> child component </div>,
  };

  it("renders Conatiner component without crashing", () => {
    shallow(<Container {...props} />);
  });

  it("renders children when passed in", () => {
    const wrapper: ShallowWrapper = shallow(
      <Container {...props}>
        <div> home page </div>
      </Container>
    );
    expect(wrapper.contains(<div> home page </div>)).toEqual(true);
  });
});
