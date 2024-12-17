import React from "react";
import { render, screen } from "@testing-library/react";

import ClassesPage from "../ClassesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders classes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ClassesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("classes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("classes-add-button")).toBeInTheDocument();
});
