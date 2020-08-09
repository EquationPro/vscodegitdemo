import React,{ReactNode,MouseEventHandler,useState} from 'react';
import { Modal, Input, Form } from 'antd';
import { ShopTableListItem } from './data';

const FormItem=Form.Item;
// const {Option} =AutoComplete;
const formItemLayout={
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

interface UserEditModalProps{
  title:ReactNode;
  record:ShopTableListItem;
  isShow:{is_able:boolean};
  onOk:(values:ShopTableListItem|any)=>void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserEditModal:React.FC<UserEditModalProps> = ({children,title,record,isShow,onOk})=>{
  const [visible, setVisible] = useState<boolean>(false);
  // const [result, setResult] = useState<string[]>([]);
  const [form] = Form.useForm();

  // 邮箱的自动补全
  // const onComplete=(value:string)=>{
  //   let temSesult:string[];
  //   if(!value||value.indexOf("@")>=0){
  //     temSesult=[]
  //   }else{
  //     temSesult=['361sport.com', '163.com', 'qq.com', 'gmail.com'].map(
  //       domain => `${value}@${domain}`,
  //     )
  //     setResult(temSesult)
  //   }
  // }

  // showModalHandlerd对应着一个箭头函数，参数为e（e中有一个方法属性为stopPropagation）
  const showModalHandler:MouseEventHandler<HTMLSpanElement>=
  (e:{stopPropagation:()=>void})=>{
    if(e){
      e.stopPropagation();
    }
    form.setFieldsValue(record);
    setVisible(true);
  };

  // const AutoCompleteChildren=result.map(value=>
  // <Option key={value} value={value}>{value}</Option>)

  return (
    <span>
    <span onClick={showModalHandler}>{children}</span>
    <Modal
      title={title}
      visible={visible}
      forceRender
      onOk={() => {
        form.validateFields().then(values => {
          onOk(values);
          form.resetFields();
          setVisible(false);
        });
      }}
      onCancel={() => {
        form.resetFields();
        setVisible(false);
      }}
      maskClosable={false}
    >
      <Form layout="horizontal" form={form}>
        <FormItem
          {...formItemLayout}
          name="shop_id"
          label="平台店铺编号"
          rules={[{ required: true, message: '请输入平台店铺编号' }]}
        >
          <Input placeholder="请输入平台店铺编号" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name="shop_name"
          label="店铺名称"
          rules={[{ required: true, message: '请输入店铺名称' }]}
        >
          <Input placeholder="请输入店铺名称" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name="description"
          label="描述"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <Input placeholder="请输入描述" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name="seller_nick"
          label="平台买家昵称"
          rules={[{ required: true, message: '请输入平台买家昵称' }]}
        >
          <Input placeholder="请输入平台买家昵称" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name="erp_shop_name"
          label="ERP店铺名称"
          rules={[{ required: true, message: '请输入ERP店铺名称' }]}
        >
          <Input placeholder="请输入ERP店铺名称" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name="band"
          label="品牌"
          rules={[{ required: true, message: '请输入品牌' }]}
        >
          <Input placeholder="请输入品牌" />
        </FormItem>
     
      </Form>
    </Modal>
  </span>
  )
}

export default UserEditModal;


