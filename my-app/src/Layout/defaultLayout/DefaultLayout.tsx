import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  MenuProps,
  Modal,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
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

  // const users = store.getState().user.user
  const users = useAppSelector((state) => state.user.user);
  // const language = useAppSelector(state => state.translate.lang)
  // console.log("🚀 ~ DefaultLayout ~ language:", language)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  axios.interceptors.request.use((config) => {
    const authToken = Math.floor(Math.random() * 100 + 1);
    config.headers.Authorization = `Bearer ${authToken}`;
    console.log("authToken", authToken);
    return config;
  });

  axios.interceptors.response.use(
    (config) => {
      if (config.status === 200) {
        console.log("if 200");
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text: Address) => {
        return <p> {text.city} </p>;
      },
    },
    {
      title: "Options",
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
              Remove
            </Button>
            <Button
              onClick={(e) => {
                handleShowFormUpdateUser();
                setShouldShowAddForm(false);
                setUserOnUpdate(user);
              }}
            >
              Update
            </Button>
          </Flex>
        );
      },
    },
  ];

  type MenuItem = Required<MenuProps>["items"][number];
  const items: MenuItem[] = (users ?? []).map((user: USER) => {
    return {
      key: user.id.toString(),
      label: user.username,
      children: [
        {
          key: user.email,
          label: user.address?.city,
        },
      ],
    };
  });
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

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

  const intl = useIntl();

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
            <Text className="text-3xl" style={{ color: "red" }}>
              Header
            </Text>
            <Text
              onClick={() => navigate("/login")}
              className="text-xl text-[white] cursor-pointer"
            >
              LogOut
            </Text>
          </Flex>
        </Header>
        <Content className="h-[100vh]">
          <Title>{intl.formatMessage({ id: "translate" })}</Title>
          <Select
            className="ml-5"
            defaultValue={"vi"}
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
                pagination={{ pageSize: 5 }}
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
                  <Form.Item>
                    <Input
                      name="usernameInput"
                      onChange={formik.handleChange}
                      placeholder="Name"
                    ></Input>
                    {formik.errors.usernameInput &&
                      formik.touched.usernameInput && (
                        <div>
                          <span className="text-red-600">
                            {formik.errors.usernameInput}
                          </span>
                        </div>
                      )}
                  </Form.Item>
                  <Form.Item>
                    <Input
                      name="emailInput"
                      onChange={formik.handleChange}
                      placeholder="Email"
                    ></Input>
                    {formik.errors.emailInput && formik.touched.emailInput && (
                      <div>
                        <span className="text-red-600">
                          {formik.errors.emailInput}
                        </span>
                      </div>
                    )}
                  </Form.Item>
                  <Form.Item name="address.city">
                    <Input
                      onChange={formik.handleChange}
                      placeholder="Address"
                    ></Input>
                    {formik.errors.addressInput &&
                      formik.touched.addressInput && (
                        <div>
                          <span className="text-red-600">
                            {formik.errors.addressInput}
                          </span>
                        </div>
                      )}
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
                      { required: true, message: "Required" },
                      { min: 5, message: "Too short" },
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
                      { required: true, message: "Required" },
                      { min: 5, message: "Too short" },
                      {
                        pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                        message: "Invalid email",
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
                      { required: true, message: "Required" },
                      { min: 5, message: "Too short" },
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
          {/* <Menu
            onClick={onClick}
            style={{ width: 256 }}
            // defaultSelectedKeys={['1']}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          /> */}
        </Content>
        <Footer className="text-3xl bg-[#001529]">
          <Text className="text-[#fff] text-2xl">footer</Text>
        </Footer>
      </Layout>
    </Flex>
  );
}

export default DefaultLayout;
