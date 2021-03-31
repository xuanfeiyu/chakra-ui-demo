import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Box,
  Text,
  Link
} from "@chakra-ui/react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import styled from '@emotion/styled'
import { ReactComponent as WeiboIcon } from '../assets/images/weibo-icon.svg';
import { ReactComponent as WeixinIcon } from '../assets/images/weixin-icon.svg';
import { ReactComponent as QqIcon } from '../assets/images/qq-icon.svg';

const LoginFooter = styled.div`
margin-top:50px;
h6 {
  position: relative;
  margin: 0 0 10px;
  font-size: 12px;
  color: #b5b5b5;
  text-align:center;
  &:before, &:after {
    content: "";
    border-top: 1px solid #b5b5b5;
    display: block;
    position: absolute;
    width: 60px;
    top: 8px;
  }
  &:before {
    left:30px;
  }
  &:after {
    right: 30px
  }
}
ul {
  margin-bottom:10px;
  list-style: none;
  text-align:center;
}
li {
  margin: 0 5px;
  display: inline-block;
  a {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon {
    width: 28px;
    height:28px;
    margin:0;
  }
}
`
export default function Form() {
  return (
    <Box w="400px" mx="auto" mt="10%" px="50px" pt="50px" pb="30px"  boxShadow="0 0 8px rgba(0,0,0,.1)" borderRadius="lg">
      <Tabs>
        <TabList mx="auto" mb="50px" fontSize="18px" w="138px" borderBottom="none">
          <Tab 
            _selected={{ color:"#ea6f5a",boxShadow: "none",fontWeight:"bold",borderBottom:"2px solid #ea6f5a" }} 
            w="56px" 
            p="0"
            fontSize="18px" 
            color="#969696" 
            fontFamily="-apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif"
          >登录</Tab>
          <Text fontSize="36px" p="10px" color="#969696" lineHeight="20px">·</Text>
          <Tab _selected={{ color:"#ea6f5a",boxShadow: "none",fontWeight:"bold",borderBottom:"2px solid #ea6f5a" }} w="56px" p="0" fontSize="18px" color="#969696" fontFamily="-apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif">注册</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0">
            <SignIn />
          </TabPanel>
          <TabPanel p="0">
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <LoginFooter>
          <h6>社交帐号登录</h6>
          <ul>
              <li>
              <Link isExternal>
                <WeiboIcon />
              </Link>
            </li>
            <li>
              <Link isExternal>
                <WeixinIcon />
              </Link>
            </li>
            <li>
              <Link isExternal>
                <QqIcon />
              </Link>
            </li>
          </ul>   
        </LoginFooter>
    </Box>
  );
}
