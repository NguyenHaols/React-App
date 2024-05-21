import {
  Button,
  Col,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Row,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeLang } from "../../slice/sliceTranslate";
import { fetchUsers, removeUserById } from "../../slice/sliceUser";
import { useAppSelector } from "../../store";

export interface USER {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
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

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: red;
`;

function DefaultLayout() {
  const { Header, Footer, Content } = Layout;
  const { Text } = Typography;
  // const users = store.getState().user.user
  const users = useAppSelector((state) => state.user.user);
  // const language = useAppSelector(state => state.translate.lang)
  // console.log("🚀 ~ DefaultLayout ~ language:", language)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  const handleRemoveUser = (userId: number) => {
    dispatch(removeUserById(userId));
  };

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
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Age",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text: Address) => {
        return <p> {text.street} </p>;
      },
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "",
      render: (user: USER) => {
        return (
          <Button
            onClick={(e) => {
              handleRemoveUser(user.id);
            }}
          >
            Remove
          </Button>
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
          label: user.address.city,
        },
      ],
    };
  });
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const hanhdleViTranslate = () => {
    dispatch(changeLang("vi"));
  };
  const hanhdleEnTranslate = () => {
    dispatch(changeLang("en"));
  };
  const intl = useIntl();

  return (
    <Flex>
      <Layout>
        <Header>
          <Text className="text-3xl" style={{ color: "red" }}>
            This is header
          </Text>
        </Header>
        <Content>
          <Title>{intl.formatMessage({ id: "translate" })}</Title>
          <Button onClick={hanhdleViTranslate}>Translate to VN</Button>
          <Button onClick={hanhdleEnTranslate}>Translate to EN</Button>
          <Table
            pagination={{ pageSize: 5 }}
            className="w-full"
            rowKey={(user) => user.id.toString()}
            dataSource={users}
            columns={columns}
          ></Table>
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            // defaultSelectedKeys={['1']}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
          <div className="w-[200px]">
            <Row className="w-full" gutter={8}>
              <Col span={6}>
                <div className="bg-slate-500 ">a</div>
              </Col>
              <Col span={12}>
                <div className="bg-slate-500 ">b</div>
              </Col>
              <Col span={6}>
                <div className="bg-slate-500 ">c</div>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer className="text-3xl">footer</Footer>
      </Layout>
    </Flex>
  );
}

export default DefaultLayout;
