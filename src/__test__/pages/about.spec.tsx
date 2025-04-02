import { describe } from "node:test";
import AboutPage from "@/pages/about";
import { render } from "@testing-library/react";

describe("About Page", () => {
  it("should render the about page", () => {
    const page = render(<AboutPage />);
    expect(page).toMatchSnapshot();
  });
});
