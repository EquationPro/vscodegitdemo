import React, { useState , useEffect } from 'react';
import {connect} from 'dva';
import { MailOutlined, MobileOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { Button, Col, Input, Row, Spin, Form } from 'antd';
import { Loading } from '@/globalType';
import styles from './login.less';

const FormItem =Form.Item;
const {setInterval,clearInterval} =window;

interface LoginProps {
  loading: boolean;
  dispatch: Dispatch;
}

const countDown = 120;

const LoginTsx:React.FC<LoginProps>=({loading,dispatch})=>{
  const [form] =Form.useForm();
  const [count,setCount]=useState<number>(countDown||0);
  const [timing,setTiming] =useState(false);
  const {validateFields} =form;

  // 待回去了解  类似于componentDidMount和componentDidUpdate，第二个参数的作用时是当着这个参数的值发生改变时会调用effect的方法
  useEffect(() => {
    window.console.log("我执行了") // 初始化时调用一次，点击获取验证码后改变了timing，再调用一次
    let interval: number = 0;
    if (timing) {
      interval = setInterval(() => {
        setCount(preSecond => {     // 通过计时器将120--  count是state的值，每次改变会触发render进行重新渲染
          if (preSecond <= 1) {     // 进行判断，当值<1时设置清理计数器，重置值为120
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return countDown;
          }
          return preSecond - 1;
        });
      }, 1000);  
    }
    return () => clearInterval(interval);
  }, [timing]);

  const onGetCaptcha=()=>{
    validateFields(['phone']).then(({phone})=>{  // 进行校验，校验通过就执行下方代码
      if(!timing){         // 当timing为false（初始化状态）时发送
        setTiming(true);
        dispatch({
          type:'Login/getCaptcha',
          payload:{phone}
        })
      }
    })
  }

  const captchaText = timing? `获取${count}秒`: `获取验证码`;

  return(
    <div className={styles['login-form']} >
      <Spin spinning={loading}>
        <Form form={form} onFinish={values=>{
                            dispatch({
                              type:'Login/login',
                              payload:values
                            })
                            }}>
            <FormItem name="phone" rules={[
                     {
                      required: true,
                      pattern: /^1\d{10}$/,
                      message: '请输入正确手机号!',
                    },
            ]} >
                <Input
                    placeholder="请输入手机号"
                    size="large"
                    maxLength={11}
                    prefix={<MobileOutlined className={styles['prefix-icon']} />}
            />
            </FormItem>
            <FormItem
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码!',
              },
            ]}
          >
              <Row gutter={8} >
                <Col span={16}>
                    <Input
                      placeholder="验证码"
                      size="large"
                      maxLength={6}
                      prefix={<MailOutlined className={styles['prefix-icon']} />}
                    />
                </Col>
                <Col span={8}>
                  <Button onClick={onGetCaptcha} size="large" className={styles[`get-captcha`]}>
                    {captchaText}
                  </Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles['login-button']}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </Spin>
    </div>
  )
}

export default connect(({loading}:{loading:Loading})=>({
  loading: !!loading.effects['Login/login'],
}))(LoginTsx);