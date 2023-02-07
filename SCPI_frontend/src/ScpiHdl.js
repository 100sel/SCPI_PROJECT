import ScpiComp from "./ScpiComp";

function ScpiHdl(props) {
    return (
        <div className="scpiHdl">
            {props.scpiList.map(scpi => (
                <ScpiComp scpi={scpi} />
            ))}
        </div>
    )
}

export default ScpiHdl;