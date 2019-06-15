import React from 'react'
import { Chart, Axis, Geom, Tooltip, Coord, Label, Legend, G2 } from 'bizcharts'
import { Card, Row, Col,BackTop } from 'antd'
import { View } from '@antv/data-set'

const data2 = [
    {year: '复仇者联盟', sales: 38},
    {year: '夏目友人帐', sales: 52},
    {year: '至暗时刻', sales: 61}
  ]
  const cols2 = {
    'sales': {tickInterval: 20},
  }


  const shangzuolv = [
    {year: '复仇者联盟', sales: 6},
    {year: '夏目友人帐', sales: 3},
    {year: '至暗时刻', sales: 5}
  ]

  const rebang=[
    {year: '复仇者联盟', sales: 3},
    {year: '夏目友人帐', sales: 9},
  ]

const cols = {
    'value': {min: 0},
    'year': {range: [0, 1]}
  }

const data = [
    {year: '2019-06-8', value: 30},
    {year: '2019-06-9', value: 40},
    {year: '2019-06-10', value: 35},
    {year: '2019-06-11', value: 50},
    {year: '2019-06-12', value: 49},
    {year: '2019-06-13', value: 46},
  ]

  const scheduleRate = [
    {item: '夏目友人帐', count: 1},
    {item: '至暗时刻', count: 2},
    {item: '复仇者联盟', count: 1}
  ]

  const dv3 = new View()
  dv3.source(scheduleRate).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
  })
  const cols3 = {
    percent: {
      formatter: val => {
        val = (val * 100) + '%'
        return val
      }
    }
  }

export class Statistics extends React.Component{
  render(){
    return (
        <Row>
        <Col span={24}>
        <Card title={"排片统计    "+(new Date()).getFullYear()+"年"+((new Date()).getMonth()+1)+"月"+(new Date()).getDate()+"日"} bordered={false} className='card-item'>
          <Chart height={400} data={dv3} scale={cols3} padding={[80, 100, 80, 80]} forceFit>
            <Coord type='theta' radius={0.75}/>
            <Axis name="percent"/>
            {/*<Legend position='right' offsetY={-80} offsetX={-100}/>*/}
            <Legend position='right' offsetY={-80}/>
            <Tooltip
              showTitle={false}
              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
            <Geom
              type="intervalStack"
              position="percent"
              color='item'
              tooltip={['item*percent', (item, percent) => {
                percent = percent * 100 + '%'
                return {
                  name: item,
                  value: percent
                }
              }]}
              style={{lineWidth: 1, stroke: '#fff'}}
            >
              <Label content='percent' formatter={(val, item) => {
                return item.point.item + ': ' + val
              }}/>
            </Geom>
          </Chart>
        </Card>
      </Col>




      <Col span={24}>
            <Card title='所有电影票房' bordered={false} className='card-item'>
              <Chart height={400} data={data2} scale={cols2} forceFit>
                <Axis name="year"/>
                <Axis name="sales"/>
                <Tooltip crosshairs={{type: 'y'}}/>
                <Geom type="interval" position="year*sales"/>
              </Chart>
            </Card>
          </Col>


          <Col span={24}>
        <Card title='每日客单价' bordered={false} className='card-item'>
          <Chart height={400} data={data} scale={cols} forceFit>
            <Axis name="year"/>
            <Axis name="value"/>
            <Tooltip crosshairs={{type: 'y'}}/>
            <Geom type="line" position="year*value" size={2}/>
            <Geom type='point' position="year*value" size={4} shape={'circle'}
                  style={{stroke: '#fff', lineWidth: 1}}/>
          </Chart>
        </Card>
      </Col>

          <Col span={24}>
            <Card title='上座率' bordered={false} className='card-item'>
              <Chart height={400} data={shangzuolv} scale={cols2} forceFit>
                <Axis name="year"/>
                <Axis name="sales"/>
                <Tooltip crosshairs={{type: 'y'}}/>
                <Geom type="interval" position="year*sales"/>
              </Chart>
            </Card>
          </Col>


          <Col span={24}>
            <Card title='过去30天电影热榜' bordered={false} className='card-item'>
              <Chart height={400} data={rebang} scale={cols2} forceFit>
                <Axis name="year"/>
                <Axis name="sales"/>
                <Tooltip crosshairs={{type: 'y'}}/>
                <Geom type="interval" position="year*sales"/>
              </Chart>
            </Card>
          </Col>


      </Row>
    )
  }
}