import React, { useState } from 'react'
import {
  UserOutlined,
  BellOutlined,
  PieChartOutlined,
  NotificationOutlined,
  CalendarOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { Layout, Menu, theme, Avatar, Button, Popover } from 'antd'
import AlertRules from './AlertRules'
import SilenceRules from './SilenceRules'
import NoticeObjects from './NoticeObjects'
import Datasources from './Datasources'
import EchartsComponent from './EchartsComponent'
import Auth from './Auth'
import AlertCurEvent from './AlertCurEvent'
import AlertHisEvent from './AlertHisEvent'
import User from './User'
import UserRole from './UserRole'
import DutyManage from './DutyManage'
import NoticeTemplate from './NoticeTemplate'
import logoIcon from './logo.jpeg'
import githubIcon from './github_logo.png'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

function Base () {

  const handleLogout = () => {
    // 清除LocalStorage中的Authorization值
    localStorage.removeItem('Authorization')
    window.location.reload()
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const content = (
    <div>
      <Button type="text" onClick={handleLogout}>
        退出登录
      </Button>
    </div>
  )

  const [selectedKeys, setSelectedKeys] = useState(['1'])
  const [selectedValue, setSelectedValue] = useState('首页')

  const handleMenuSelect = ({ key }) => {
    const selectedButton = menuItems.find(item => item.key === key)
    setSelectedKeys([key])
    setSelectedValue(selectedButton.value)
  }

  // 鉴权
  Auth()

  const menuItems = [
    { key: '1', value: '首页' },
    { key: '2', value: '告警规则' },
    { key: '3', value: '静默规则' },
    { key: '4', value: '当前告警' },
    { key: '5', value: '历史告警' },
    { key: '6', value: '通知对象' },
    { key: '7', value: '通知模版' },
    { key: '9', value: '值班日程' },
    { key: '10', value: '用户管理' },
    { key: '11', value: '角色管理' },
    { key: '12', value: '数据源' },
  ]

  const menuItemsMap = {
    '1': <EchartsComponent />,
    '2': <AlertRules />,
    '3': <SilenceRules />,
    '4': <AlertCurEvent />,
    '5': <AlertHisEvent />,
    '6': <NoticeObjects />,
    '7': <NoticeTemplate />,
    '9': <DutyManage />,
    '10': <User />,
    '11': <UserRole />,
    '12': <Datasources />,
  }

  return (

    <Layout hasSider>
      {/* 导航栏 */}
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: 'white', // 将背景色调整为白色
        }}
      >

        <div className="footer">
          <a target="_blank" title="Logo">
            <img src={logoIcon} alt="Logo" className="icon" style={{ width: '25vh', height: '25vh' }} />
          </a>
        </div>

        <div className="footer">
          <a href="https://github.com/Cairry/WatchAlert" target="_blank" title="GitHub">
            <img src={githubIcon} alt="GitHub Icon" className="icon" style={{ width: '25px', height: '25px', marginLeft: '10vh' }} />
          </a>
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={handleMenuSelect}
        >

          <Menu.Item key="1" icon={<HomeOutlined />}>首页</Menu.Item>

          <SubMenu key="sub1" icon={<BellOutlined />} title="告警管理">
            <Menu.Item key="2">告警规则</Menu.Item>
            <Menu.Item key="3">静默规则</Menu.Item>
            <Menu.Item key="4">当前告警</Menu.Item>
            <Menu.Item key="5">历史告警</Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<NotificationOutlined />} title="告警通知">
            <Menu.Item key="6">通知对象</Menu.Item>
            <Menu.Item key="7">通知模版</Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" icon={<CalendarOutlined />} title="值班管理">
            <Menu.Item key="9">值班日程</Menu.Item>
          </SubMenu>

          <SubMenu key="sub4" icon={<UserOutlined />} title="人员组织">
            <Menu.Item key="10">用户管理</Menu.Item>
            <Menu.Item key="11">角色管理</Menu.Item>
          </SubMenu>

          <Menu.Item key="12" icon={<PieChartOutlined />}>数据源</Menu.Item>
        </Menu>


      </Sider>

      {/* 内容区 */}
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        {/* 右侧顶部 */}
        <Layout style={{ padding: 0 }}>
          <Header
            style={{
              height: '8vh',
              margin: '16px 16px 0',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>

            <div
              style={{
                fontWeight: 'bold',
                fontSize: '20px'
              }}>

              {selectedValue}

              <div style={{ position: 'relative', marginTop: '-50px' }}>
                <Popover content={content} trigger="click" placement="bottom">
                  <Avatar
                    style={{
                      backgroundColor: '#7265e6',
                      verticalAlign: 'middle',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    size="large"
                    gap="5"
                    icon={<UserOutlined />}
                  />
                </Popover>
              </div>

            </div>
          </Header>
        </Layout>

        {/* 右侧内容区 */}
        <Layout>
          <Content
            style={{
              margin: '20px 10px 0',
              overflow: 'initial',
              height: '77vh',
              margin: '16px 16px 0',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,

            }}
          >
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: 'center' }}
            >
              {menuItemsMap[selectedKeys]}
            </div>
          </Content>
        </Layout>

        <Footer style={{ textAlign: 'center' }}>WatchAlert ©2024 Created by Cairry</Footer>
      </Layout>
    </Layout>
  )
}

export default Base