import React from "react";
import { render, screen } from "@testing-library/react";

import SubjectsPage from "../SubjectsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders subjects page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SubjectsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("subjects-datatable")).toBeInTheDocument();
    expect(screen.getByRole("subjects-add-button")).toBeInTheDocument();
});
