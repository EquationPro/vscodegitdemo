import React,{ReactNode,MouseEventHandler,useState} from 'react';
import { Modal, Input, Switch, InputNumber, Form, AutoComplete } from 'antd';
import { UserTableListItem } from './data';

const FormItem=Form.Item;
const {Option} =AutoComplete;
const formItemLayout={
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

interface UserEditModalProps{
  title:ReactNode;
  record:UserTableListItem;
  isShow:{is_able:boolean};
  onOk:(values:UserTableListItem|any)=>void;
}

const UserEditModal:React.FC<UserEditModalProps> = ({children,title,record,isShow,onOk})=>{
  const [visible, setVisible] = useState<boolean>(false);
  const [result, setResult] = useState<string[]>([]);
  const [form] = Form.useForm();

  //邮箱的自动补全
  const onComplete=(value:string)=>{
    let temSesult:string[];
    if(!value||value.indexOf("@")>=0){
      temSesult=[]
    }else{
      temSesult=['361sport.com', '163.com', 'qq.com', 'gmail.com'].map(
        domain => `${value}@${domain}`,
      )
      setResult(temSesult)
    }
  }

  //showModalHandlerd对应着一个箭头函数，参数为e（e中有一个方法属性为stopPropagation）
  const showModalHandler:MouseEventHandler<HTMLSpanElement>=
  (e:{stopPropagation:()=>void})=>{
    if(e){
      e.stopPropagation();
    }
    form.setFieldsValue(record);
    setVisible(true);
  };

  const AutoCompleteChildren=result.map(value=>
  <Option key={value} value={value}>{value}</Option>)

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
          name="real_name"
          label="真实姓名"
          rules={[{ required: true, message: '请输入真实姓名' }]}
        >
          <Input placeholder="请输入真实姓名" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name="email"
          label="邮箱"
          rules={[
            { type: 'email', message: '这不是一个有效的邮箱' },
            { required: true, message: '请输入邮箱' },
          ]}
        >
          <AutoComplete placeholder="请输入邮箱" onSearch={onComplete}>
            {AutoCompleteChildren}
          </AutoComplete>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name="phone"
          label="手机号"
          rules={[
            {
              required: true,
              pattern: /^1\d{10}$/,
              message: '请输入正确手机号',
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name="department"
          label="部门"
          rules={[{ required: true, message: '请输入部门' }]}
        >
          <Input placeholder="请输入部门" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name="sort"
          label="排序"
          rules={[
            {
              required: true,
              message: '请输入排序',
            },
          ]}
        >
          <InputNumber />
        </FormItem>
        {/* 使用&&截断，当前面为false时，就不去读取后面的内容了。 */}
        {isShow.is_able && (
          <FormItem {...formItemLayout} name="is_able" label="是否启用" valuePropName="checked">
            <Switch />
          </FormItem>
        )}
      </Form>
    </Modal>
  </span>
  )
}

export default UserEditModal;


