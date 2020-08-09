// import React from 'react';
// import { Input, Button ,Table,Row,Col } from 'antd';
// import {connect} from 'dva';
// // import EditModal from './EditModel';
// import { datetimeRender } from '@/utils/lang';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';

// const { Search } = Input;

// const modelNameSpace='SysAuthUsersTest';

// class UsersTest extends React.Component {

//   UNSAFE_componentWillMount (){
//     this.props.init();
//   }

//   handleClick=()=>{
//     this.props.init({dt:20191026});
//   }

//   handleShowCreate=()=>{
//     this.props.setVisible(true);
//     this.props.setHandleType('create');
//   }

//   handleShowUpdate=(record)=>{
//     this.props.setVisible(true);
//     this.props.setRecord(record);
//     this.props.setHandleType('update');
//   }
  
//   handleDelete=(id)=>{
//     this.props.deleteShop({id})
//   }

//   onSearch=(value)=>{
//     this.props.searchShop({shopName:value});
//   }


    

//   render () {
//     const columns= [
//       {
//         title: '真实姓名',   
//         dataIndex: 'real_name',
//         key: 'real_name',
//         width: '110px',  
//         fixed: 'left',
//       },
//       {
//         title: '邮箱',
//         dataIndex: 'email',
//         key: 'email',
//         width: '210px',
//         render: text => <span className="break-word">{text}</span>,
//       },
//       {
//         title: '手机',
//         dataIndex: 'phone',
//         key: 'phone',
//         width: '160px',
//       },
//       {
//         title: '部门',
//         dataIndex: 'department',
//         key: 'department',
//         width: '110px',
//       },
//       {
//         title: '是否启用',
//         dataIndex: 'is_able',
//         key: 'is_able',
//         width: '110px',
//         filters: [
//           { text: '启用', value: '1' },
//           { text: '弃用', value: '0' },
//         ],
//         render: isAble => (isAble ? '启用' : '弃用'),
//       },
//       {
//         title: '上次登录时间',
//         dataIndex: 'last_login_time',
//         key: 'last_login_time',
//         width: '195px',
//         render: time => datetimeRender(time),
//         sorter: true,
//       },
//       {
//         title: '登录时间',
//         dataIndex: 'login_time',
//         key: 'login_time',
//         width: '195px',
//         render: time => datetimeRender(time),
//         sorter: true,
//       },
//       {
//         title: '上次登录IP',
//         dataIndex: 'last_login_ip',
//         key: 'last_login_ip',
//         width: '160px',
//         sorter: true,
//       },
//       {
//         title: '登录IP',
//         dataIndex: 'login_ip',
//         key: 'login_ip',
//         width: '160px',
//         sorter: true,
//       },
//       {
//         title: '登录次数',
//         dataIndex: 'login_times',
//         key: 'login_times',
//         width: '110px',
//         sorter: true,
//       },
//       // {
//       //   title: '操作',
//       //   dataIndex: 'operation',
//       //   width: '200px',
//       //   render: (text, record) => this.operation(text, record),
//       // },
//     ];
//     return (
//         <div>
//           <PageHeaderWrapper 
//               title="用户管理测试"
//               extra={
//                 <Row justify="end" gutter={32}>
//                   <Col>
//                   <Search
//                       placeholder="input search text"
//                       onSearch={this.onSearch}
//                       style={{ width: 200 }}
//                     />
//                   </Col>
//                 </Row>
//               }
//           >
//               <Button onClick={this.handleShowCreate}>添加</Button> 
//                 <Table rowKey={rowRecord => rowRecord.id} columns={columns}  dataSource={this.props.list}/>
//                 {/* <EditModal ></EditModal> */}
//           </PageHeaderWrapper>
//         </div>    
//     )
//   }
// }

// export default connect(
//   (state)=>({
//     list:state[modelNameSpace].list,
//    }),
//   dispatch=>{
//     return{
//       init:()=>{
//         dispatch({type:`${modelNameSpace}/fetch`})
//       },
//     }
//   }
// )(UsersTest);

