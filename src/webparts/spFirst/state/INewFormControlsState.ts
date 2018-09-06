// Represents a purchase request
export interface INewFormState{

    // Represent the choices to be displayed in dropdown when the form loads.
    affectedModelsOptions:string[];    

    // Represent the values selected for the fields
    affectedModel:string;    
    title:string;
    division:string;
    requestno:string;
    intelBOMs:IintelBOM[];
}


// Represents one purchase item in the purchase request.
export interface IintelBOM{
    requestno:string;
    model:string;
    oldPN:string;
    newPN:string;
    partDescription:string;
}
