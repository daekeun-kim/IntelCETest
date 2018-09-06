import { SPHttpClient } from '@microsoft/sp-http';

export interface ISpFirstProps {
  description: string;
  siteUrl:string;
  spHttpClient:SPHttpClient;
  itemId:string;
}