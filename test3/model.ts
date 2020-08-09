import { fetchShopTestListURL , insertShopURL , updateShopURL ,deleteShopURL } from '@/services/sys/shopstest';
import { BaseModelType, Effect } from '@/globalType';
import { ShopPagination, ShopTableListItem } from './data';


const namespace = 'SysAuthShopTest';

export interface StateType {
  list: ShopTableListItem[];
  pagination: ShopPagination;
}

interface ModelType extends BaseModelType<StateType> {
  effects: {
    fetch: Effect<StateType>;
    change: Effect<StateType>;
    insertShop: Effect<StateType>;
    updateShop: Effect<StateType>;
    deleteShop: Effect<StateType>;
  };
}

const Model: ModelType ={
  namespace:'SysAuthShopTest',
  state:{
    list: [],
    pagination: {
      totalRow: 0,
      currentPage: 1,
      pageSize: 10,
    },
  },
  reducers:{
    saveState(state: any,{payload}: any){
      const result = { ...state, ...payload }
      return result;
    }
  },
  effects:{
    /**
     * 获取数据
     */
    *fetch(_: any,{put,call,select}: any){
      const pagination = yield select((state:any) => state[namespace].pagination);
      const { data } = yield call(fetchShopTestListURL,{...pagination});
        const { totalRow, list } = data;
        yield put({
          type: 'saveState',
          payload: {
            list,
            pagination: { ...pagination, totalRow },
          },
        });
    },
    /**
     * 当参数改变时的处理
     */
    *change({ payload: { pagination } }, { put, select }) {
      const statePagination = yield select(state => state[namespace].pagination);
      yield put({
        type: 'saveState',
        payload: {
          pagination: { ...statePagination, ...pagination },
        },
      });
      yield put({ type: 'fetch' });
    },

    // //非固定方法
    *insertShop({payload:values},{call,put}){
      yield call(insertShopURL, values);
      yield put({ type: 'fetch' });
    },
    *updateShop({payload:values},{call,put}){
      yield call(updateShopURL, values);
      yield put({ type: 'fetch' });
    },
    *deleteShop({payload:values},{call,put}){
      yield call(deleteShopURL, values);
      yield put({ type: 'fetch' });
    }
  },
  subscriptions: {
    setup({ dispatch, history }:{dispatch:any,history:any}) {
      return history.listen(({ pathname }:{pathname:any}) => {
        if (pathname === '/sys/auth/shopstest') {
          dispatch({
            type: 'fetch',
            payload: {},
          });
        }
      });
    },
  },
}

export default Model;