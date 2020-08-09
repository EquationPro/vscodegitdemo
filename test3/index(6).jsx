/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Progress, Row,Tabs, Tooltip } from 'antd';
import { thousandsFixedTwo, thousandsSeparators } from '@/utils/lang';
import Authorized from '@/utils/Authorized';
import {
  QuestionTip
} from '@/components/custom-component';

const { TabPane } = Tabs;
const { hasAuth } = Authorized;

class IndexTsx extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }

  render () {
  // ( <Card
  //   title="交易"
  //   bordered={false}
  //   className="row-bottom"
  //   extra={
  //     <Link
  //       to={{
  //         pathname: '/operation/trade/overview',
  //         state: { dateRange, shopId },
  //       }}
  //     >
  //       查看更多
  //     </Link>
  //   }
  // >
  //   <Spin spinning={overviewLoading}>
  //     <Tooltip placement="topLeft" title={rateTip}>
  //       <h4> {monthDt} 目标达成率</h4>
  //       <Progress percent={parseFloat(parseFloat(percent * 100).toFixed(2))} />
  //     </Tooltip>
  //     <Row className="row-top" gutter={16} justify="center">
  //       {pv === 0 ? (
  //         ''
  //       ) : (
  //         <Col span={4}>
  //           <Card title="浏览量" bordered={false}>
  //             <p>浏览次数：{thousandsSeparators(pv)}</p>
  //           </Card>
  //         </Col>
  //       )}
  //       {uv === 0 ? (
  //         ''
  //       ) : (
  //         <Col span={4}>
  //           <Card title="访客" bordered={false}>
  //             <p>访客：{thousandsSeparators(uv)}</p>
  //           </Card>
  //         </Col>
  //       )}
  //       {cart_byer_cnt === 0 ? (
  //         ''
  //       ) : (
  //         <Col span={4}>
  //           <Card title="加购" bordered={false}>
  //             <p>加购人数：{thousandsSeparators(cart_byer_cnt)}</p>
  //             <p>加购次数：{thousandsSeparators(cart_item_qty)}</p>
  //           </Card>
  //         </Col>
  //       )}
  //       <Col span={4}>
  //         <Card title="支付" bordered={false}>
  //           <p>支付金额：{thousandsFixedTwo(pay_trade_amt)}</p>
  //           <p>支付人数：{thousandsSeparators(pay_winner_num)}</p>
  //           <p>客单价：{pay_pct}</p>
  //           <QuestionTip tip="包含所有店铺金额的比值">
  //             支付金额占比： {thousandsFixedTwo(pay_trade_amt / (total_pay_amount / 100))}
  //             %
  //           </QuestionTip>
  //         </Card>
  //       </Col>
  //       <Col span={4}>
  //         <Card title="下单" bordered={false}>
  //           <p>下单金额： {thousandsFixedTwo(gmv_trade_amt)}</p>
  //           <p>下单人数： {thousandsSeparators(gmv_winner_num)}</p>
  //         </Card>
  //       </Col>
  //       <Col span={4}>
  //         <Card title="退款" bordered={false}>
  //           <p>退款金额：{thousandsFixedTwo(refund_fee)}</p>
  //           <p>退款笔数：{thousandsSeparators(refund_num)}</p>
  //         </Card>
  //       </Col>
  //     </Row>
  //   </Spin>
  // </Card> )    

    // 最上方的tab标签
    const tabListNoTitle = [];
    if (hasAuth('Operation')) {
      tabListNoTitle.push({
        key: 'Operation',
        tab: '运营',
      });
    }

    if (hasAuth('CompetingGoods')) {
      tabListNoTitle.push({
        key: 'CompetingGoods',
        tab: '竞品',
      });
    }

    return (
      <>
      {tabListNoTitle.length > 0 ? (
        <PageHeaderWrapper
          // extra={
          //   <Row gutter={32}>
        
          //   </Row>
          // }
          tabList={tabListNoTitle}
         >
              <Card
              title="交易"
              bordered={false}
              className="row-bottom"
              extra={
                <Link
                  to='/operation/trade/overview'
                >
                  查看更多
                </Link>
              }
            >
              
                <Tooltip placement="topLeft" >
                  <h4> 20200806 目标达成率</h4>
                  <Progress percent={0.3} />
                </Tooltip>
                <Row className="row-top" gutter={16} justify="center">
                  {666066.00 === 0 ? (
                    ''
                  ) : (
                    <Col span={4}>
                      <Card title="浏览量" bordered={false}>
                        <p>浏览次数：{thousandsSeparators(666066.00)}</p>
                      </Card>
                    </Col>
                  )}
                  {23 === 0 ? (
                    ''
                  ) : (
                    <Col span={4}>
                      <Card title="访客" bordered={false}>
                        <p>访客：{thousandsSeparators(666066.00)}</p>
                      </Card>
                    </Col>
                  )}
                  {666066.00 === 0 ? (
                    ''
                  ) : (
                    <Col span={4}>
                      <Card title="加购" bordered={false}>
                        <p>加购人数：{thousandsSeparators(666066.00)}</p>
                        <p>加购次数：{thousandsSeparators(666066.00)}</p>
                      </Card>
                    </Col>
                  )}
                  <Col span={4}>
                    <Card title="支付" bordered={false}>
                      <p>支付金额：{thousandsFixedTwo(666066.00)}</p>
                      <p>支付人数：{thousandsSeparators(666066.00)}</p>
                      <p>客单价：666066.00</p>
                      <QuestionTip tip="包含所有店铺金额的比值">
                        支付金额占比： {thousandsFixedTwo(666066.00 / (666066.00 / 100))}
                        %
                      </QuestionTip>
                    </Card>
                  </Col>
                  <Col span={4}>
                    <Card title="下单" bordered={false}>
                      <p>下单金额： {thousandsFixedTwo(666066.00)}</p>
                      <p>下单人数： {thousandsSeparators(666066.00)}</p>
                    </Card>
                  </Col>
                  <Col span={4}>
                    <Card title="退款" bordered={false}>
                      <p>退款金额：{thousandsFixedTwo(666066.00)}</p>
                      <p>退款笔数：{thousandsSeparators(666066.00)}</p>
                    </Card>
                  </Col>
                </Row>

             
            </Card>
            <Card title="转化概况" bordered={false} className="row-bottom">
                 {/* 流式展示 */}
                 <Tabs defaultActiveKey="1" tabPosition="top" className="my-tabs-prev" style={{ height: 240 }}>
                <TabPane
                 tab={
                  <Card title="访客—收藏转化" style={{ width: 400 }}>
                    <Row gutter={4} justify="center">
                      <Col span={10}>
                        <Progress
                          strokeLinecap="square"
                          type="dashboard"
                          percent={parseFloat(0.2)}
                        />
                      </Col>
                      <Col span={12}>
                        <div style={{ marginTop: 40 }}>
                          <p>
                            收藏人数：
                            {thousandsSeparators(6660)}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                }
                key="1"
              />
              <TabPane
                tab={
                  <Card title="访客—加购转化" style={{ width: 400 }}>
                    <Row gutter={4} justify="center">
                      <Col span={10}>
                        <Progress
                          strokeLinecap="square"
                          type="dashboard"
                          percent={parseFloat(0.2)}
                        />
                      </Col>
                      <Col span={12}>
                        <div style={{ marginTop: 40 }}>
                          <p>
                            加购人数：
                            {thousandsSeparators(6660)}
                          </p>
                          <p>
                            加购次数：
                            {thousandsSeparators(666)}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                }
                key="2"
              />
              <TabPane
                tab={
                  <Card title="访客—下单转化" style={{ width: 400 }}>
                    <Row gutter={4} justify="center">
                      <Col span={10}>
                        <Progress
                          strokeLinecap="square"
                          type="dashboard"
                          percent={parseFloat(0.2)}
                        />
                      </Col>
                      <Col span={12}>
                        <div style={{ marginTop: 40 }}>
                          <p>
                            下单人数：
                            {thousandsSeparators(6660)}
                          </p>
                          <p>
                            下单件数：
                            {thousandsSeparators(66606)}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                }
                key="3"
              />
              <TabPane
                tab={
                  <Card title="访客—支付转化" style={{ width: 400 }}>
                    <Row gutter={4} justify="center">
                      <Col span={10}>
                        <Progress
                          strokeLinecap="square"
                          type="dashboard"
                          percent={parseFloat(0.2)}
                        />
                      </Col>
                      <Col span={12}>
                        <div style={{ marginTop: 40 }}>
                          <p>
                            支付人数：
                            {thousandsSeparators(666)}
                          </p>
                          <p>
                            支付件数：
                            {thousandsSeparators(66606)}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                }
                key="4"
              />
              <TabPane
                tab={
                  <Card title="下单—支付转化" style={{ width: 400 }}>
                    <Row gutter={4} justify="center">
                      <Col span={10}>
                        <Progress
                          strokeLinecap="square"
                          type="dashboard"
                          percent={parseFloat(0.2)}
                        />
                      </Col>
                      <Col span={12}>
                        <div style={{ marginTop: 40 }}>
                          <p>
                            下单金额：
                            {thousandsSeparators(6660)}
                          </p>
                          <p>
                            支付金额：
                            {thousandsSeparators(6660)}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                }
                key="5"
              />
            </Tabs>
            </Card>
        </PageHeaderWrapper>
      ) : (
        <h1 style={{ textAlign: 'center', fontSize: '50px' }}>欢迎使用本系统</h1>
      )}
    </>
    )
  }
}

export default IndexTsx;
