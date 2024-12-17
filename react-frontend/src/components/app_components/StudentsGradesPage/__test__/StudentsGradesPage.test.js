import React from "react";
import { render, screen } from "@testing-library/react";

import StudentsGradesPage from "../StudentsGradesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders studentsGrades page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StudentsGradesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("studentsGrades-datatable")).toBeInTheDocument();
    expect(screen.getByRole("studentsGrades-add-button")).toBeInTheDocument();
});
