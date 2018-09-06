import IIntelCERequestService from "./IIntelCERequestService";
import pnp from "sp-pnp-js";
import { INewFormState } from "../state/INewFormControlsState";
import { ItemAddResult,Web } from "sp-pnp-js";

export default class IntelCERequestService implements IIntelCERequestService{

    private getInterCEForControlValues():Promise<any>{
        return pnp.sp.web.lists.getByTitle("TestList").items.select("Model").get().then(response => {
            return response;
        });
    }

    // Gets the choices to be displayed in the dropdown fields.
    getNewFormControlsState():Promise<any>{

        let newFormControlsState = {} as INewFormState;

        return this.getInterCEForControlValues().then(IntelCEForValuesResponse => {
            
            newFormControlsState.affectedModelsOptions = IntelCEForValuesResponse.map( p=> { return p.Model});
            
            return newFormControlsState;            
        });
    } 

    // Creates a new purchase request. The request is created in two list. One where the master data is stored and one
    // where the purchase items are stored with a reference of the ID of master request.
    async createIntelCERequest(IntelCERequestData:INewFormState,siteUrl) : Promise<any>{

        console.log(IntelCERequestData);

        return pnp.sp.web.lists.getByTitle("IntelCERequest").items.add({
                    
                affectedModel:IntelCERequestData.affectedModel, 
                Title:IntelCERequestData.title,               
                division : IntelCERequestData.division,
                requestNo: IntelCERequestData.requestno            
            })

            .then((result:ItemAddResult)=>{
                let IntelCERequestID = IntelCERequestData.requestno;
                console.log("Purchase request created : " + IntelCERequestID);
                if(IntelCERequestData.intelBOMs != null && IntelCERequestData.intelBOMs.length > 0){

                    // Creates the multiple purchase items in batch.
                    let web = new Web(siteUrl);
                    let batch = web.createBatch();
                    
                    IntelCERequestData.intelBOMs.forEach(Item => {
                        web.lists.getByTitle("IntelBOM").items.inBatch(batch).add({
                            Title:Item.model,
                            model:Item.model,
                            oldpn:Item.oldPN,
                            newpn:Item.newPN,
                            partdescription:Item.partDescription,
                            requestno : IntelCERequestID
                        });
                        console.log(Item);
                    });

                    batch.execute().then(()=>{
                        console.log("Purchase items added to the list....");
                    });
                }
                else{
                    alert('Select atleast one purchase item.');
                }
        });
    }
}