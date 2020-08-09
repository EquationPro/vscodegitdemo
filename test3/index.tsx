import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Divider, Row, Col,Popconfirm,Button } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Loading } from '@/globalType';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import { SearchInput, BaseTable } from '@/components/custom-component';
import { OnSearchValueType } from '@/components/custom-component/SearchInput';
import Authorized from '@/utils/Authorized';
import { ShopPagination, ShopTableListItem } from './data';
import ShopEditModal from './ShopEditMoal'




const modelNameSpace = 'SysAuthShopTest';

const { Option } = SearchInput;

interface ShopsTsxProps {
  list:ShopTableListItem[];
  pagination: ShopPagination;
  dispatch: Dispatch;
  loading: boolean;
}

@connect((state:{list:ShopTableListItem,pagination:ShopPagination,loading:Loading})=>({
  list: state[modelNameSpace].list,
  pagination: state[modelNameSpace].pagination,
  loading: !!state.loading.effects[`${modelNameSpace}/fetch`]
}))
class ShopsTsx extends React.Component<ShopsTsxProps> {

  addShop = (values: ShopTableListItem) => {
    this.dispatch('insertShop', values);
  };

  updateShop=(id: number, values: ShopTableListItem)=>{
    const shop = values;
    shop.id = id; 
    this.dispatch('updateShop', shop);
  }

  deleteID=(shop_id:number|undefined)=>{
    this.dispatch('deleteShop', {shop_id});
  }

  searchShops = (searchType: OnSearchValueType) => {
    window.console.log(searchType)
    this.dispatch('change', {
      pagination: { ...searchType, currentPage: 1 },
    });
  };

  dispatch = (type: string, values: any) => {
    this.props.dispatch({
      type: `${modelNameSpace}/${type}`,
      payload: {
        ...values,
      },
    });
  };

  operation = (_: any, record: ShopTableListItem) => {
    const { id } = record;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { shop_id } = record; // 正常通过ID来操作，店铺表后台指定不接收id，故通过shop_id
    return (
      <span>
        <Authorized authority="SysAuthUsersEdit">
          <ShopEditModal
            title="用户编辑"
            isShow={{ is_able: true }}
            record={record}
            onOk={this.updateShop.bind(null, id)}
          >
            <a>编辑</a>
          </ShopEditModal>
        </Authorized>
        <Authorized authority="SysAuthUsersRoleSet">
          <Divider type="vertical" />
          {/* <RoleSelect title="角色选择" userId={id} onOk={this.saveRoleNodes.bind(null, id)}>
            <a>设置角色</a>
          </RoleSelect> */}
        </Authorized>
        <Divider type="vertical" />
        <Popconfirm
          title="是否删除？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={this.deleteID.bind(null, shop_id)}      // todo 待实验是否需要bind
        >
          <a>删除</a>
        </Popconfirm>
      </span>
    );
  };


  render () {
    const { pagination, list, dispatch, loading } = this.props;
    const columns: ColumnType<ShopTableListItem>[] = [
      {
        title: '平台店铺编号',
        dataIndex: 'shop_id',
        key: 'shop_id',
        width: '110px',
        fixed: 'left',
      },
      {
        title: '店铺名称',
        dataIndex: 'shop_name',
        key: 'shop_name',
        width: '210px',
        filters:[
          {
            text:'361度官方旗舰',
            value:"361度官方旗舰"
          },
          {
            text:'361度官方旗舰店',
            value:"361度官方旗舰店"
          },
          {
            text:"361度源流专卖店",
            value:"361度源流专卖店"
          }
        ]

      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '160px',
      },
      {
        title: '平台买家昵称',
        dataIndex: 'seller_nick',
        key: 'seller_nick',
        width: '110px',
      },
      {
        title: 'ERP店铺名称',
        dataIndex: 'erp_shop_name',
        key: 'erp_shop_name',
        width: '110px',
        sorter: true
      },
      {
        title: '品牌',
        dataIndex: 'band',
        key: 'band',
        width: '160px',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '200px',
        render: (text: any, record: any) => this.operation(text, record),
      },
    ];
    return (
      <div>
      <PageHeaderWrapper
        title="店铺管理TS测试"
        extra={
          <Row justify="end" gutter={32}>
          <Col>

              <ShopEditModal
                title="添加用户"
                record={{ id: 0, sort: 0 }}
                onOk={this.addShop}
                isShow={{ is_able: false }}
              >
                <Button type="primary">添加店铺</Button>

              </ShopEditModal>
            
          </Col>
          <Col>
              <SearchInput initType="shop_name" onSearch={this.searchShops}>
                    <Option value="shop_name">店铺名称</Option>
                    <Option value="shop_id">店铺ID</Option>
                </SearchInput>
          </Col>
        </Row>
        }
      >
               <BaseTable
                    dispatch={dispatch}
                    loading={loading}
                    columns={columns}
                    pagination={pagination}
                    dataSource={list}
                    modelNameSpace={modelNameSpace}
                    rowKey={rowRecord => rowRecord.id}
                    scroll={{ x: '1670px' }}
                  />
      </PageHeaderWrapper>
    </div>
    )
  }
}

export default ShopsTsx;
