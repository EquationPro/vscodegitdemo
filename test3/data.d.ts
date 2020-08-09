import { GlobalPagination } from '@/globalType';

export interface ShopTableListItem {
  id:number;
  shop_id?:number;
  shop_name?:string;
  description?:string;
  seller_nick?:string;
  erp_shop_name?:string;
  band?:string;
  sort?:number;
}

export interface ShopPagination extends GlobalPagination {}