import { INewFormState } from '../state/INewFormControlsState';

// Represents the service to interact with SharePoint to work with purchase request.
export default interface IIntelCERequestService{
    getNewFormControlsState() : Promise<any>;
    createIntelCERequest(IntelCERequestData:INewFormState,siteUrl) : Promise<any>;
}