import React from 'react';
import { datetimeRender } from '@/utils/lang';
import { Table,Divider, Row, Col, Pagination,Popconfirm,Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
// import { Button, Col, Divider, Popconfirm, Row } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Loading } from '@/globalType';
import { UserPagination, UserTableListItem } from './data';
import { ColumnType } from 'antd/es/table';
import { PageOnChangeType } from '@/globalType';
import { BaseTable } from '@/components/custom-component';
import Authorized from '@/utils/Authorized';
import UserEditModal from './UserEditModalTest';

// import moment from 'moment';

interface UsersTsxProps {
  list: UserTableListItem[];
  pagination: UserPagination;
  dispatch: Dispatch;
  loading: boolean;
}



const modelNameSpace = 'SysAuthUsersTest2';


//传进来state，然后及进行解构
  @connect((state:{list:UserTableListItem[],pagination:UserPagination,loading:Loading}) => ({
    list: state[modelNameSpace].list,
    pagination: state[modelNameSpace].pagination,
    loading: !!state.loading.effects[`${modelNameSpace}/fetch`]}
  ))
class UsersTsx extends React.Component<UsersTsxProps> {

  hanleTableChange=(pagination:any,filters:any,sorter:any)=>{
    debugger
    this.dispatch('change', {
      pagination:{
        sortField:sorter.field,
        sortOrder:sorter.order,
        ...filters
      }
    })
  }
    /**
   * 页面改变触发
   */
  pageOnChange: PageOnChangeType = (currentPage:any) => {
    debugger
    this.dispatch('change', {
      pagination: { currentPage },
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

  addUser = (values: UserTableListItem) => {
    this.dispatch('insertUser', values);
  };

  updateUser = (userId: number, values: UserTableListItem) => {
    const user = values;
    user.id = userId;
    this.dispatch('updateUser', user);
  };
  deleteID=(id:number)=>{
    this.dispatch("deleteUser",{id})
  }

  operation = (_: any, record: UserTableListItem) => {
    const { id } = record;
    return (
      <span>
        <Authorized authority="SysAuthUsersEdit">
          <UserEditModal
            title="用户编辑"
            isShow={{ is_able: true }}
            record={record}
            onOk={this.updateUser.bind(null, id)}
          >
            <a>编辑</a>
          </UserEditModal>
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
          onConfirm={this.deleteID.bind(null, id)}      // todo 待实验是否需要bind
        >
          <a>删除</a>
        </Popconfirm>
      </span>
    );
  };

  render() {
    const { pagination, list, dispatch, loading } = this.props;
    // const { totalRow,pageSize } = this.props.pagination;
    const columns: ColumnType<UserTableListItem>[] = [
      {
        title: '真实姓名',
        dataIndex: 'real_name',
        key: 'real_name',
        width: '110px',
        fixed: 'left',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: '210px',
        render: text => <span className="break-word">{text}</span>,
      },
      {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
        width: '160px',
      },
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        width: '110px',
      },
      {
        title: '是否启用',
        dataIndex: 'is_able',
        key: 'is_able',
        width: '110px',
        filters: [
          { text: '启用', value: '1' },
          { text: '弃用', value: '0' },
        ],
        render: isAble => (isAble ? '启用' : '弃用'),
      },
      {
        title: '上次登录时间',
        dataIndex: 'last_login_time',
        key: 'last_login_time',
        width: '195px',
        render: time => datetimeRender(time),
        sorter: true,
      },
      {
        title: '登录时间',
        dataIndex: 'login_time',
        key: 'login_time',
        width: '195px',
        render: time => datetimeRender(time),
        sorter: true,
      },
      {
        title: '上次登录IP',
        dataIndex: 'last_login_ip',
        key: 'last_login_ip',
        width: '160px',
        sorter: true,
      },
      {
        title: '登录IP',
        dataIndex: 'login_ip',
        key: 'login_ip',
        width: '160px',
        sorter: true,
      },
      {
        title: '登录次数',
        dataIndex: 'login_times',
        key: 'login_times',
        width: '110px',
        sorter: true,
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
          title="用户管理TS测试"
          extra={
            <Row justify="end" gutter={32}>
            <Col>
              <Authorized authority="SysAuthUsersAdd">
                <UserEditModal
                  title="添加用户"
                  record={{ id: 0, sort: 0 }}
                  onOk={this.addUser}
                  isShow={{ is_able: false }}
                >
                  <Button type="primary">添加用户</Button>
                </UserEditModal>
              </Authorized>
            </Col>
          </Row>
          }
        >
          {/* <Table rowKey={rowRecord => rowRecord.id} columns={columns} dataSource={this.props.list} pagination={false}
          onChange={this.hanleTableChange}
          />
          <Pagination
                    className="ant-table-pagination"
                    defaultCurrent={1}
                    showQuickJumper
                    // showTotal={(totalRow, range) =>`显示 ${range[0]} 至 ${range[1]}， ${totalRow}条`}
                    showSizeChanger={false}
                    total={totalRow}
                    pageSize={pageSize}
                    onChange={this.pageOnChange}
              /> */}
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


// function mapStateToProps(state: any) {
//   const { list, pagination } = state[modelNameSpace];
//   return {
//     list,
//     pagination,
//     loading: !!state.loading.effects[`${modelNameSpace}/fetch`],
//   };
// }

// export default connect(
//   // mapStateToProps
//   (state:any)=>({
//     list: state[modelNameSpace].list,
//     pagination: state[modelNameSpace].pagination,
//     loading: !!state.loading.effects[`${modelNameSpace}/fetch`]
//   })
//   // (dispatch:any)=>{                     //由于上方在Props接口中定义了dispatch，则底下的这个将reducer方法映射到组件的步骤可以被省略，默认完成
//   //   return {
//   //     init:()=>{
//   //       dispatch({ type: `${modelNameSpace}/fetch` })
//   //     }
//   //   }
//   // }
// )(UsersTsx);

export default UsersTsx;