function ScpiComp(props) {
    const {scpi} = props;
    return (
        <div key={scpi.indexNumber} className="scpiComp">
            <a href={scpi.scpiUrl}>{scpi.scpiLabel}</a> : Taux distribution : {scpi.tauxDistrib} // Prix part
            : {scpi.prixPart}
        </div>
    )
}

export default ScpiComp;