import React from "react";
import { render, screen } from "@testing-library/react";

import StudentsGradesCreateDialogComponent from "../StudentsGradesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders studentsGrades create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StudentsGradesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("studentsGrades-create-dialog-component")).toBeInTheDocument();
});
