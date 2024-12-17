import React from "react";
import { render, screen } from "@testing-library/react";

import TeachersPage from "../TeachersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders teachers page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TeachersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("teachers-datatable")).toBeInTheDocument();
    expect(screen.getByRole("teachers-add-button")).toBeInTheDocument();
});
