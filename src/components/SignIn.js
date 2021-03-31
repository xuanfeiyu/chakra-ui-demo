import React, { useState } from 'react';
import  { Formik, Form, Field }  from 'formik';
import * as Yup from 'yup';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useToast,
  Box
} from "@chakra-ui/react";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { signIn } from '../api/user';

export default function SignIn() {
  const toast = useToast({status: "error", position: "top"})
  const [loading, setLoading] = useState(false)

  const user = {
    email: '',
    password: ''
  }

  const schema = Yup.object().shape({
    password: Yup.string().min(6,'密码长度不能小于6').required('请输入密码'),
    email: Yup.string().email('请输入正确的邮箱').required('请输入邮箱'),
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

  const handleSubmit = async (values) => {
    const valid = await handleValidate(values)
    if(!valid) return
    setLoading(true)
    const { data } = await signIn(values)
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

      <Field name="email">
        {({ field, form }) => (
            <InputGroup>
              <InputLeftAddon children={<FaUserAlt />} w="35px" h="50px" color="#969696" px="9.5px" border="none" bgColor="transparent"/>
              <Input {...field} placeholder="手机号或邮箱" h="50px" border="none" py="4px" pl="0" pr="12px" focusBorderColor="transparent"/>
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
        <Flex as="span" justify="space-between" mt="20px">
          <Checkbox defaultChecked>记住我</Checkbox>
            <Menu placement="bottom-end">
              <MenuButton as="a" fontSize="14px" cursor="pointer">登录遇到问题?</MenuButton>
                <MenuList>
                  <MenuItem>用手机号重置密码</MenuItem>
                  <MenuItem>用邮箱重置密码</MenuItem>
                  <MenuItem>无法用海外手机号登录</MenuItem>
                  <MenuItem>无法用Google账号登录</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
        <Button type="submit" _hover={{ bgColor: "#187cb7",boxShadow:"none!important" }} _focus={{boxShadow:"none!important" }} w="100%" mt="20px" colorScheme="blue" borderRadius="25px" boxShadow="none" isLoading={loading}>登录</Button>
    </Form>
</Formik>
  );
}
