import { createStore,combineReducers, applyMiddleware } from "redux";
import { NewInteCERequestReducer }  from "../reducers/NewInterCERequestReducer"
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'; 


// Configures the redux store.
export default function ConfigureStore():any{
    
    // Combine multiple reducers to create the store. FormReducer is for the redux-form.
    const IntelCERequestStore = createStore(
        combineReducers
        ({
            NewFormControlValues:NewInteCERequestReducer,
            form:formReducer
        }),
        {},
        applyMiddleware(thunk)
    );

    return IntelCERequestStore;
}