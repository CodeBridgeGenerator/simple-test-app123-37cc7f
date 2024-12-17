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
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';


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

const StudentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [studentID, setStudentID] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount studentsGrades
                    client
                        .service("studentsGrades")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleStudentsGradesId } })
                        .then((res) => {
                            setStudentID(res.data.map((e) => { return { name: e['studentId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "StudentsGrades", type: "error", message: error.message || "Failed get studentsGrades" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            name: _entity?.name,
age: _entity?.age,
dateofbirth: _entity?.dateofbirth,
studentID: _entity?.studentID?._id,
        };

        setLoading(true);
        try {
            
        await client.service("students").patch(_entity._id, _data);
        const eagerResult = await client
            .service("students")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "studentID",
                    service : "studentsGrades",
                    select:["studentId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info students updated successfully" });
        props.onEditResult(eagerResult.data[0]);
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

    const studentIDOptions = studentID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Students" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="students-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
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
                <label htmlFor="age">Age:</label>
                <InputNumber id="age" className="w-full mb-3 p-inputtext-sm" value={_entity?.age} onChange={(e) => setValByKey("age", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["age"]) && (
              <p className="m-0" key="error-age">
                {error["age"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateofbirth">Dateofbirth:</label>
                <Calendar id="dateofbirth" value={_entity?.dateofbirth ? new Date(_entity?.dateofbirth) : null} onChange={ (e) => setValByKey("dateofbirth", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateofbirth"]) && (
              <p className="m-0" key="error-dateofbirth">
                {error["dateofbirth"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="studentID">StudentID:</label>
                <Dropdown id="studentID" value={_entity?.studentID?._id} optionLabel="name" optionValue="value" options={studentIDOptions} onChange={(e) => setValByKey("studentID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentID"]) && (
              <p className="m-0" key="error-studentID">
                {error["studentID"]}
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

export default connect(mapState, mapDispatch)(StudentsCreateDialogComponent);
