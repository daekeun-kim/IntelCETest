import * as React from 'react';
import styles from './SpFirst.module.scss';
import { ISpFirstProps } from './ISpFirstProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ConfigureStore from "../../store/ConfigureStore";
import { connect } from "react-redux";
import {INewFormState} from "../../state/INewFormControlsState";
import { Provider } from "react-redux";
import  NewRequestComponent from "../CreateNewRequest/CreateNewRequest";

let styles7 = {
  
  width: '700px'
  
  
};


export default class SpFirst extends React.Component<ISpFirstProps, {}> {
  
  public render(){

    // Initialize the redux store
    const IntelCERequestStoretore = ConfigureStore();
    
    return (
      <Provider store={IntelCERequestStoretore}>
          <NewRequestComponent {...this.props}/>
      </Provider>
    );
  }


}

