import { INewFormState } from '../state/INewFormControlsState';
import { GetInitialControlValuesAction } from '../actions/NewFormControlsValuesAction';

// Initial state of the purcahse request.
export const newFormControlsInitialState:INewFormState = {
    // Represent the choices to be displayed in dropdown when the form loads.
    affectedModelsOptions:[],

    // Represent the values selected for the fields
    affectedModel:"",    
    title:"",
    division:"",
    requestno:"",
    intelBOMs:[]
};

export const NewInteCERequestReducer = (state:INewFormState=newFormControlsInitialState,action) => {

    switch(action.type){

        // Gets the values for dropdown fields from SharePoint choice columns.
        case "GET_DEFAULT_CONTROL_VALUES":
        
        
            state={
                ...state,
                affectedModelsOptions : action.payload.affectedModelsOptions,                
            };
        
        break;

        // Creates a new purchase request.
        case "CREATE_NEW_REQUEST":
        
                    state={
                        ...state,
                        affectedModel : action.payload.affectedModel,
                        title : action.payload.title,
                        division : action.payload.division,   
                        requestno : action.payload.requestno,                     
                        intelBOMs: action.payload.intelBOMs
                    }
        
        break;
    }
  

    return state;
};

