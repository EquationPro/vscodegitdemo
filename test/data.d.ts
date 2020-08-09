import { GlobalPagination } from '@/globalType';

interface UserTableListItem {
  id:number;
  real_name?:string;
  email?:string;
  phone?:string;
  department?:string;
  is_able?:number;
  last_login_time?:string;
  login_time?:string;
  last_login_ip?:string;
  login_ip?:string;
  login_times?:number;
  sort:number;
}

interface UserPagination extends GlobalPagination {}
