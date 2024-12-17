import React from "react";
import { render, screen } from "@testing-library/react";

import StudentsPage from "../StudentsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders students page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StudentsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("students-datatable")).toBeInTheDocument();
    expect(screen.getByRole("students-add-button")).toBeInTheDocument();
});
