export const tableColumns = [{
    Header: "Label",
    accessor: "scpiLabel"
}, {
    Header: "Date Création",
    accessor: "dateCreation"
}, {
    Header: "Gestionnaire",
    accessor: "gestionnaire"
}, {
    Header: "Capital Total", 
    accessor: "capital",
    Cell: ({value}) => { if(value) { return value + " €" } else { return "-" } }
}, {
    Header: "Type de capital", 
    accessor: "typeCapital"
}, {
    Header: "Type de marché", 
    accessor: "typeMarche"
}, {
    Header: "Nombre d'immeubles", 
    accessor: "nbImmeubles"
}, {
    Header: "Surface Totale", 
    accessor: "surfaceTotale",
    Cell: ({value}) => { if(value) { return value + " m²" } else { return "-" } }
}, {
    Header: "Taux d'occupation", 
    accessor: "tauxOccupation"
}, {
    Header: "Taux de distribution", 
    accessor: "tauxDistrib"
}, {
    Header: "Prix Part", 
    accessor: "prixPart",
    Cell: ({value}) => { if(value) { return value + " €" } else { return "-" } }
}, {
    Header: "Investissement Minimum", 
    accessor: "investMini",
    Cell: ({value}) => { if(value) { return value + " €" } else { return "-" } }
}, {
    Header: "Frais de souscription", 
    accessor: "fraisSouscri"
}, {
    Header: "Frais de gestion", 
    accessor: "fraisGestion"
}, {
    Header: "Valeur ANR", 
    accessor: "valeurAnr",
    Cell: ({value}) => { if(value) { return value + " €" } else { return "-" } }
}, {
    Header: "Valeur RAN", 
    accessor: "valeurRan"
}, {
    Header: "Valeur PGE", 
    accessor: "valeurPge"
}];