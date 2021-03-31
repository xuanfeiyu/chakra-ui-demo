import React, { useState } from 'react'
import  { Formik, Form, Field }  from 'formik'
import * as Yup from 'yup'
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Box,
  Link,
  useToast,
  Button
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaMobileAlt } from "react-icons/fa";
import styled from '@emotion/styled'
import { signUp } from '../api/user'

const Tip = styled.p`
  margin: 10px 0;
  padding: 0;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #969696;
  a {
    color: #3194d0;
  }
`

export default function SignUp() {
    // 状态
    const [loading, setLoading] = useState(false)
    const toast = useToast({status: "error", position: "top"})
    // 表单初始值
    const user = {
      name: '',
      phone: '',
      password: ''
    }
        // 表单校验
        const schema = Yup.object().shape({
          password: Yup.string().min(6,'密码长度不能小于6').required('请输入密码'),
          phone: Yup.string().required('请输入手机号'),
          name: Yup.string().required('请输入昵称'),
        })

    const handleValidate = async values => {
      console.log('values',values)
      try {
        await schema.validate(values)
        return true
      } catch (error) {
        toast({ description: error.message })
        return false
      }  
    }
    // 表单提交
    const handleSubmit = async (values) => {
      const valid = await handleValidate(values)
      if(!valid) return
      setLoading(true)
      const { data } = await signUp(values)
      setLoading(false)
      console.log(data)
    }


  return (
    <Formik
    initialValues={user}
    onSubmit={handleSubmit}
    >
      <Form>
      <Box border="1px solid #c8c8c8" borderRadius="4px">
        <Field name="name">
          {({ field, form }) => (
            <InputGroup>
              <InputLeftAddon children={<FaUserAlt />} w="35px" h="50px" color="#969696" px="9.5px" border="none" bgColor="transparent"/>
              <Input {...field} placeholder="你的昵称" h="50px" border="none" py="4px" pl="0" pr="12px" focusBorderColor="transparent"/>
            </InputGroup>
          )}
        </Field>
        <Field name="phone">
          {({ field, form }) => (
            <InputGroup borderTop="1px solid #c8c8c8">
              <InputLeftAddon children={<FaMobileAlt />} w="35px" h="50px" color="#969696" px="9.5px" border="none" bgColor="transparent"/>
              <Input {...field} placeholder="手机号" h="50px" border="none" py="4px" pl="0" pr="12px" focusBorderColor="transparent"/>
            </InputGroup>
          )}
        </Field>
        <Field name="password">
          {({ field, form }) => (
            <InputGroup borderTop="1px solid #c8c8c8">
              <InputLeftAddon children={<FaLock />} w="35px" h="50px" color="#969696" px="9.5px" border="none" bgColor="transparent"/>
              <Input {...field} type="password" placeholder="密码" h="50px" border="none" py="4px" pl="0" pr="12px" focusBorderColor="transparent"/>
            </InputGroup>
          )}
        </Field>
      </Box>
      <Button type="submit" _hover={{ bgColor: "#3db922",boxShadow:"none!important" }} _focus={{boxShadow:"none!important" }} w="100%" mt="20px" colorScheme="green" borderRadius="25px" boxShadow="none" isLoading={loading}>注册</Button>
      <Tip>点击 “注册” 即表示您同意并愿意遵守简书<br/>
        <Link>用户协议</Link>和<Link>隐私政策</Link>。
      </Tip>
    </Form>
    </Formik>
  );
}
