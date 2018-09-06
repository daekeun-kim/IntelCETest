import { INewFormState } from '../state/INewFormControlsState';
import IntelCERequestService  from '../services/IntelCERequestService';

// The file contains actions for the NewPurchaseRequestReducer

// Gets the choices for dropdown fields in the new form. The values are fetched from the choice field options.
export function GetInitialControlValuesAction(){

     return dispatch => {
       
        let intelCERequestServiceObj:IntelCERequestService = new IntelCERequestService();
        let formControlsState = {affectedModelsOptions:[]} as INewFormState;
        
        intelCERequestServiceObj.getNewFormControlsState().then((resp:INewFormState) => {
            console.log(resp);
            formControlsState.affectedModelsOptions = resp.affectedModelsOptions;            
            dispatch({
                type:"GET_DEFAULT_CONTROL_VALUES",
                payload:formControlsState
            });
        });
    };
}


// Creates a new purchase request.
export function CreateNewIntelCERequest(IntelCERequestData:INewFormState, siteUrl){
    return dispatch => {
        
        let newIntelCERequestServiceObj:IntelCERequestService = new IntelCERequestService();

        newIntelCERequestServiceObj.createIntelCERequest(IntelCERequestData,siteUrl).then(response =>{
            alert(" request created...");
        }).catch(()=>{
            alert("Error in creating purchase request...")
        });

        dispatch({
            type:"CREATE_NEW_REQUEST",
            payload:IntelCERequestData
        });
    };
}