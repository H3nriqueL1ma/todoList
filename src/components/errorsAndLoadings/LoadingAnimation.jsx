import { Spinner } from "react-bootstrap";

export default function Loading () {
    return (
        <>
            <div id="animations" className="d-flex justify-content-center align-items-center">
                <Spinner id="loading-animation" animation="grow" size="sm"/>
                <Spinner id="loading-animation" animation="grow" size="sm"/>
                <Spinner id="loading-animation" animation="grow" size="sm"/>
            </div>
        </>
    );
}