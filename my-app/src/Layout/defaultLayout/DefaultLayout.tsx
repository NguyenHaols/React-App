import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  Modal,
  Radio,
  Select,
  Switch,
  Table,
  Typography,
  message,
  theme,
} from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { getPostStart } from "../../slice/slicePost";
import { changeMode } from "../../slice/sliceThemeMode";
import { changeLang } from "../../slice/sliceTranslate";
import {
  addUser,
  fetchUsers,
  removeUserById,
  updateUser,
} from "../../slice/sliceUser";
import { useAppSelector } from "../../store";

export interface USER {
  id: number;
  name?: string;
  username?: string;
  email?: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface Address {
  street?: string;
  suite?: string;
  city: string;
  zipcode?: string;
  geo?: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface InitialValues {
  name?: string;
  email?: string;
  city?: string;
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: red;
`;

function DefaultLayout() {
  const { Header, Footer, Content } = Layout;
  const { Text } = Typography;
  const [shouldShowAddForm, setShouldShowAddForm] = useState(false);
  const [shouldShowUpdateForm, setShouldShowUpdateForm] = useState(false);
  const [userOnUpdate, setUserOnUpdate] = useState<USER>();
  const [postId, setPostId] = useState<string>();
  const users = useAppSelector((state) => state.user.user);
  const themMode = useAppSelector((state) => state.themeMode);
  const language = useAppSelector((state) => state.translate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);
  let { token } = theme.useToken();
  axios.interceptors.request.use((config) => {
    const authToken = Math.floor(Math.random() * 100 + 1);
    config.headers.Authorization = `Bearer ${authToken}`;
    // console.log("authToken", authToken);
    return config;
  });

  axios.interceptors.response.use(
    (config) => {
      if (config.status === 200) {
        // console.log("if 200");
      }
      if (config.status === 404) {
        console.log("if 404");
      }
      return config;
    },
    function (err) {
      if (err.response.status === 404) {
        console.log("err", err);
      }
      return err;
    }
  );

  const columns = [
    {
      title: intl.formatMessage({ id: "name" }),
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: intl.formatMessage({ id: "address" }),
      dataIndex: "address",
      key: "address",
      render: (text: Address) => {
        return <p> {text.city} </p>;
      },
    },
    {
      title: intl.formatMessage({ id: "options" }),
      dataIndex: "",
      key: "",
      render: (user: USER) => {
        return (
          <Flex justify="space-around">
            <Button
              onClick={(e) => {
                handleRemoveUser(user.id);
              }}
            >
              {intl.formatMessage({ id: "remove" })}
            </Button>
            <Button
              onClick={(e) => {
                handleShowFormUpdateUser();
                setShouldShowAddForm(false);
                setUserOnUpdate(user);
              }}
            >
              {intl.formatMessage({ id: "update" })}
            </Button>
          </Flex>
        );
      },
    },
  ];

  const handleRemoveUser = (userId: number) => {
    dispatch(removeUserById(userId));
  };
  const handleShowFormAddUser = () => {
    setShouldShowAddForm(true);
  };
  const handleShowFormUpdateUser = () => {
    setShouldShowUpdateForm(true);
  };
  const handleChangeUserNameInput = (e: any) => {
    formik.handleChange(e);
    const value: string = e.target.value;
    let user = {
      ...userOnUpdate,
      name: value.toString(),
      id: userOnUpdate?.id
        ? userOnUpdate.id
        : Math.floor(Math.random() * 100 + 1),
    };
    setUserOnUpdate(user);
  };
  const handleChangeEmailInput = (e: any) => {
    formik.handleChange(e);
    const value: string = e.target.value;
    let user = {
      ...userOnUpdate,
      email: value.toString(),
      id: userOnUpdate?.id
        ? userOnUpdate.id
        : Math.floor(Math.random() * 100 + 1),
    };
    setUserOnUpdate(user);
  };
  const handleChangeAddressInput = (e: any) => {
    formik.handleChange(e);
    const value: string = e.target.value;
    let user = {
      ...userOnUpdate,
      id: userOnUpdate?.id
        ? userOnUpdate.id
        : Math.floor(Math.random() * 100 + 1),
      address: {
        ...userOnUpdate?.address,
        city: value.toString(),
      },
    };
    setUserOnUpdate(user);
  };
  const handleChangLanguage = (value: string) => {
    dispatch(changeLang(value));
  };
  const handleUpdateForm = () => {
    console.log("sumbit ");
    const user: USER = {
      id: Math.floor(Math.random() * 100 + 1),
      name: userOnUpdate?.name,
      username: userOnUpdate?.username,
      email: userOnUpdate?.email,
      address: {
        street: "",
        suite: "",
        city: userOnUpdate?.address?.city ?? "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    };
    let userUpdated: USER = { ...(userOnUpdate ?? user) };
    userUpdated = {
      ...userUpdated,
      name: userOnUpdate?.name,
      email: userOnUpdate?.email,
      address: {
        ...userUpdated.address,
        city: userOnUpdate?.address?.city ?? "",
      },
    };
    dispatch(updateUser(userUpdated));
    message.success("User updated successfully");
  };

  const handleChangeModeTheme = (e: any) => {
    if (e === true) {
      dispatch(changeMode("dark"));
    } else {
      dispatch(changeMode("light"));
    }
  };

  const getPostwithSaga = () => {
    dispatch(getPostStart());
  };

  const getPostByIdwithSaga = () => {
    // dispatch(getPostByIdStart(postId));
  };

  const formik = useFormik({
    initialValues: {
      usernameInput: "",
      emailInput: "",
      addressInput: "",
    },
    validationSchema: Yup.object({
      usernameInput: Yup.string().min(3, "Too short").required("Required"),
      emailInput: Yup.string()
        .min(3, "Too short")
        .email("Invalid email")
        .required("Required"),
      addressInput: Yup.string().min(3, "Invalid address").required("Required"),
    }),
    onSubmit: (values) => {
      const user: USER = {
        id: Math.floor(Math.random() * 100 + 1),
        name: values.usernameInput,
        username: values.usernameInput,
        email: values.emailInput,
        address: {
          street: "",
          suite: "",
          city: values.addressInput,
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      };
      dispatch(addUser(user));
      message.success("User added successfully");
    },
  });

  const initialValues: InitialValues = {
    city: userOnUpdate?.address?.city,
    name: userOnUpdate?.name,
    email: userOnUpdate?.email,
  };

  return (
    <Flex>
      <Layout>
        <Header>
          <Flex justify="space-between" align="center">
            <Text
              className="text-3xl leading-[64px]"
              style={{ color: token.colorPrimary }}
            >
              Header
            </Text>
            <Text
              onClick={() => navigate("/login")}
              className="text-xl text-[white] cursor-pointer leading-[64px]"
              style={{ color: token.colorPrimary }}
            >
              LogOut
            </Text>
          </Flex>
        </Header>

        <Content className="h-[140vh]">
          <Title style={{ color: token.colorPrimary }}>
            {intl.formatMessage({ id: "translate" })}
          </Title>
          <Select
            className="ml-5"
            defaultValue={language.lang}
            onChange={handleChangLanguage}
            options={[
              { value: "vi", label: "VietNam" },
              { value: "en", label: "English" },
            ]}
          ></Select>

          <Divider>CURD USER</Divider>
          <div>
            <Flex className="flex-col" justify="center" align="center">
              <Table
                style={{ width: "70%" }}
                pagination={{ pageSize: 5, position: ["bottomCenter"] }}
                rowKey={(user) => user.id.toString()}
                dataSource={users}
                columns={columns}
              ></Table>

              {!shouldShowAddForm && !shouldShowUpdateForm && (
                <Button onClick={handleShowFormAddUser}>Add new</Button>
              )}

              <Modal
                title="ADD USER"
                open={shouldShowAddForm}
                onOk={() => setShouldShowAddForm(false)}
                onCancel={() => setShouldShowAddForm(false)}
              >
                <Form onFinish={formik.handleSubmit}>
                  <Form.Item
                    name="usernameInput"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="notEmpty"
                            values={{ type: <FormattedMessage id="name" /> }}
                          />
                        ),
                      },
                      { min: 5, message: <FormattedMessage id="tooShort" /> },
                    ]}
                  >
                    <Input
                      onChange={formik.handleChange}
                      placeholder="Name"
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    name="emailInput"
                    validateFirst
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="notEmpty"
                            values={{ type: <FormattedMessage id="email" /> }}
                          />
                        ),
                      },
                      { min: 5, message: <FormattedMessage id="tooShort" /> },
                      {
                        pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                        message: (
                          <FormattedMessage
                            id="invalid"
                            values={{ type: <FormattedMessage id="email" /> }}
                          />
                        ),
                      },
                    ]}
                  >
                    <Input
                      onChange={formik.handleChange}
                      placeholder="Email"
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    name="addressInput"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="notEmpty"
                            values={{ type: <FormattedMessage id="address" /> }}
                          />
                        ),
                      },
                      { min: 5, message: <FormattedMessage id="tooShort" /> },
                    ]}
                  >
                    <Input
                      onChange={formik.handleChange}
                      placeholder="Address"
                    ></Input>
                  </Form.Item>
                  <Form.Item>
                    <Button className="mr-5" type="primary" htmlType="submit">
                      ADD
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>

              <Modal
                title="UPDATE USER"
                open={shouldShowUpdateForm}
                onOk={() => setShouldShowUpdateForm(false)}
                onCancel={() => setShouldShowUpdateForm(false)}
              >
                <Form initialValues={initialValues} onFinish={handleUpdateForm}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="notEmpty"
                            values={{ type: <FormattedMessage id="name" /> }}
                          />
                        ),
                      },
                      { min: 5, message: <FormattedMessage id="tooShort" /> },
                    ]}
                  >
                    <Input
                      onChange={(e) => handleChangeUserNameInput(e)}
                      placeholder="Name"
                      value={userOnUpdate?.name}
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    validateFirst
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="notEmpty"
                            values={{ type: <FormattedMessage id="email" /> }}
                          />
                        ),
                      },
                      { min: 5, message: <FormattedMessage id="tooShort" /> },
                      {
                        pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                        message: (
                          <FormattedMessage
                            id="invalid"
                            values={{ type: <FormattedMessage id="email" /> }}
                          />
                        ),
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => handleChangeEmailInput(e)}
                      placeholder="Email"
                      value={userOnUpdate?.email}
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="notEmpty"
                            values={{ type: <FormattedMessage id="address" /> }}
                          />
                        ),
                      },
                      { min: 5, message: <FormattedMessage id="tooShort" /> },
                    ]}
                  >
                    <Input
                      onChange={(e) => handleChangeAddressInput(e)}
                      placeholder="Address"
                      value={userOnUpdate?.address?.city}
                    ></Input>
                  </Form.Item>
                  <Form.Item>
                    <Button className="mr-5" type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Flex>
          </div>
          <Divider>Theme mode</Divider>

          <Flex justify="center" align="center" vertical>
            <Switch
              checked={themMode.mode === "dark" ? true : false}
              className="mb-2"
              onChange={handleChangeModeTheme}
            ></Switch>
            <Button type="primary">Button</Button>
            <Radio checked className="py-5">
              Color theme
            </Radio>
            <Checkbox checked className="py-5">
              Color theme
            </Checkbox>
            <DatePicker></DatePicker>
          </Flex>

          <Divider> Child of defaultLayout </Divider>
          <Outlet />

          <Divider>Redux saga</Divider>
          <Flex justify="center">
            <Button type="primary" onClick={getPostwithSaga}>
              get posts
            </Button>
          </Flex>
        </Content>
        <Footer className="text-3xl bg-[#001529]">
          <Text className="text-[#fff] text-2xl">footer</Text>
        </Footer>
      </Layout>
    </Flex>
  );
}

export default DefaultLayout;
