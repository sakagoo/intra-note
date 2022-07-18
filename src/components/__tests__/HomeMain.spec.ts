import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HomeMain from "../HomeMain.vue";

describe("HomeMain", () => {
  it("renders properly", () => {
    const wrapper = mount(HomeMain, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Home");
  });
});
