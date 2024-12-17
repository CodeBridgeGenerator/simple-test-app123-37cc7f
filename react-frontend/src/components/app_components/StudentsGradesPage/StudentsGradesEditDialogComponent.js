import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const StudentsGradesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            studentId: _entity?.studentId,
name: _entity?.name,
grade: _entity?.grade,
mathGrade: _entity?.mathGrade,
scienceGrade: _entity?.scienceGrade,
englishGrade: _entity?.englishGrade,
        };

        setLoading(true);
        try {
            
        const result = await client.service("studentsGrades").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info studentsGrades updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Students Grades" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="studentsGrades-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="studentId">Student ID:</label>
                <InputNumber id="studentId" className="w-full mb-3 p-inputtext-sm" value={_entity?.studentId} onChange={(e) => setValByKey("studentId", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentId"]) && (
              <p className="m-0" key="error-studentId">
                {error["studentId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) && (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="grade">Grade:</label>
                <InputNumber id="grade" className="w-full mb-3 p-inputtext-sm" value={_entity?.grade} onChange={(e) => setValByKey("grade", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["grade"]) && (
              <p className="m-0" key="error-grade">
                {error["grade"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="mathGrade">Math Grade:</label>
                <InputText id="mathGrade" className="w-full mb-3 p-inputtext-sm" value={_entity?.mathGrade} onChange={(e) => setValByKey("mathGrade", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["mathGrade"]) && (
              <p className="m-0" key="error-mathGrade">
                {error["mathGrade"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="scienceGrade">Science Grade:</label>
                <InputText id="scienceGrade" className="w-full mb-3 p-inputtext-sm" value={_entity?.scienceGrade} onChange={(e) => setValByKey("scienceGrade", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["scienceGrade"]) && (
              <p className="m-0" key="error-scienceGrade">
                {error["scienceGrade"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="englishGrade">English Grade:</label>
                <InputText id="englishGrade" className="w-full mb-3 p-inputtext-sm" value={_entity?.englishGrade} onChange={(e) => setValByKey("englishGrade", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["englishGrade"]) && (
              <p className="m-0" key="error-englishGrade">
                {error["englishGrade"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(StudentsGradesCreateDialogComponent);
