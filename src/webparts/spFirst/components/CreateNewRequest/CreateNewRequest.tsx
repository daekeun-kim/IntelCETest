import * as React from 'react';
import { INewFormState } from '../../state/INewFormControlsState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ISpFirstProps  } from '../SpFirst/ISpFirstProps';
import { GetInitialControlValuesAction, CreateNewIntelCERequest } from '../../actions/NewFormControlsValuesAction';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Field, reduxForm, InjectedFormProps, FieldArray, WrappedFieldArrayProps, BaseFieldArrayProps } from 'redux-form';
import { renderDropDown, renderInput } from '../IntelCECustomFieldRenders/IntelCEFieldRenders'



// Connected state
interface INewFormConnectedState{

    // Represents a purchase request and the data from the form.
    newFormControlValues : INewFormState;

    // Represents the initial values. << Unused now. Useful for edit item feature >>
    initialValues:any;
}

// Represents the connected dispatch
interface INewFormConnectedDispatch{

    // Gets the options for dropdown fields
    getDefaultControlsData:() => void;

    createNewIntelCERequest:(IntelCERequestData:INewFormState, siteUrl:string) => void;
}

// Validations for the redux form
const required = value => (value ? undefined : ' *');
const number = value =>
value && isNaN(Number(value)) ? ' Invalid value' : undefined;


// Represents the repeating purchase items component. 
// Used in "NewRequestComponent" react component below along with "FieldsArray" from redux-form.
// Renders custom input component with validations
class IntelBOMComponent extends React.Component<WrappedFieldArrayProps<any>,{}>{

    public render(){
        return(            
            <div>
                <button type="button" onClick={() => this.props.fields.push({})}>Add impact intel BOM</button>
 
                { this.props.fields.map((IntelBOMItem, index) =>
                <tr>
                    <div>
                        <h4>Item {index + 1}</h4>
                        <td>
                            <Field name={`${IntelBOMItem}.model`} type="text" component={renderInput} placeholder="Model" validate={[required]}/>
                        </td>
                        <td>
                            <Field name={`${IntelBOMItem}.oldPN`} type="text" component={renderInput}  placeholder="Old P/N" validate={[required]}/>
                        </td>
                        <td>
                            <Field name={`${IntelBOMItem}.newPN`} type="text" component={renderInput} placeholder="New P/N" validate={[required]}/>
                        </td>
                        <td>
                            <Field name={`${IntelBOMItem}.partDescription`} type="text" component={renderInput} placeholder="Part Description" validate={[required]}/>
                        </td>
                        <td>
                            <button type="button" title="Remove Item" onClick={() => this.props.fields.remove(index)}>Remove item</button>
                        </td>
                    </div>
                </tr>
                )}


          </div>
        );
    }

}

class NewRequestComponent extends React.Component<INewFormConnectedState & INewFormConnectedDispatch & ISpFirstProps & InjectedFormProps<{}, INewFormConnectedState>>{
    
    constructor(props){
        super(props);
    }
 
    public render(){
        return(
            
          <div>
           {/* Sent the props as well to the SubmitForm handler to use the Connected Dispatch. Renders custom dropdown component with validation*/}
           <form onSubmit={this.props.handleSubmit(((values) =>this.SubmitForm(values,this.props)))}>               
        

                <div>
                    <Field name="requestno" type="text" component={renderInput} placeholder="Request NO" />   
                </div>
                <br/>
                <div>
                    <Field component={renderDropDown} label="Affected Models for : " name="affectedModel" validate={required}>
                        {this.props.newFormControlValues.affectedModelsOptions.map(affectedModelFor => {return <option key={affectedModelFor} value={affectedModelFor}>{affectedModelFor}</option>})};
                    </Field>
                </div>                    
                <br/>
                <div>
                    <Field name="affectedModel" type="text" component={renderInput} placeholder="Model" validate={[required]}/>   
                </div>
                <br/>
                <div>
                    <Field name="title" type="text" component={renderInput} placeholder="title" validate={[required]}/>   
                </div>
                <br/>
                <div>
                    <Field name="division" type="text" component={renderInput} placeholder="division" validate={[required]}/>   
                </div>
                <br/>
                <table>
                    <FieldArray name="intelBOMs" component={IntelBOMComponent}/>
                </table>
                <br/>
                <button type="submit" disabled={this.props.submitting}>Create purchase request</button>
                <br/>
            </form>
            
          </div>
        );
    }
   
    // Handles the submit form.
    SubmitForm(values, props){

        let IntelCERequestData = {} as INewFormState;
        IntelCERequestData = values;
        IntelCERequestData.affectedModelsOptions = props.newFormControlValues.affectedModelsOptions;        
        
        // Call the connected dispatch to create new purchase request
        props.createNewIntelCERequest(IntelCERequestData,props.siteUrl);

        CreateNewIntelCERequest(IntelCERequestData,props.siteUrl);
    }


    componentDidMount(){

        this.props.getDefaultControlsData();
    }
}

// Maps the State to props
const mapStateToProps = (state) : INewFormConnectedState => {

    // Includes the initialValues property to load the form with initial values
    return{
        newFormControlValues : state.NewFormControlValues,
        initialValues : state.NewFormControlValues
    };
};

// Maps dispatch to props
const mapDispatchToProps = (dispatch):INewFormConnectedDispatch => {
    return{
        getDefaultControlsData:() => {
            return dispatch(GetInitialControlValuesAction());
        },
        createNewIntelCERequest:(intelCERequestData:INewFormState, siteUrl:string) => {
            return dispatch(CreateNewIntelCERequest(intelCERequestData,siteUrl));
        }
    };
};

const NewRequestUI = reduxForm<{},INewFormConnectedState>(
    {
        form:'IntelCERequestForm',
        destroyOnUnmount:false,

        // Reinitializes when the state changes. << Unused at the moment. Useful in edit item feature >>
        enableReinitialize:true
    }
)(NewRequestComponent);


export default connect(mapStateToProps,mapDispatchToProps)(
    NewRequestUI
);
