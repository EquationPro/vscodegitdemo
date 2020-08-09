import { GlobalPagination } from '@/globalType';

interface ShopTableListItem {
  id:number;
  shop_id?:string;
  shop_name?:string;
  description?:string;
  seller_nick?:string;
  erp_shop_name?:string;
  brand?:string;
  sort?:number;
}

interface ShopPagination extends GlobalPagination {}