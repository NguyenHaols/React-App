import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, Layout, theme } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
function Login() {
  const { Header, Footer, Content } = Layout;
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const handleLoginSubmit = () => {
    navigate("/");
  };

  type FieldType = {
    username?: string;
    password?: string;
  };

  const formik = useFormik({
    initialValues: {
      usernameInput: "",
      passwordInput: "",
    },
    validationSchema: Yup.object({
      usernameInput: Yup.string().email("Invalid email").required("Required"),
      passwordInput: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleLoginSubmit();
    },
  });
  console.log(formik);

  return (
    <Layout>
      <Header className="h-20 bg-white">
        <Flex justify="space-between">
          <Flex align="center">
            <Flex className="text-xl  font-semibold m-5">
              <ShoppingCartOutlined
                style={{
                  color: theme.useToken().token.colorPrimary,
                  marginRight: "10px",
                  fontSize: "30px",
                }}
              />
              <span
                className="text-[24px]"
                style={{ color: token.colorPrimary }}
              >
                Shopee
              </span>
            </Flex>
            <div className="text-[24px]">Đăng nhập</div>
          </Flex>
          <a href="#" style={{ lineHeight: "68px", color: token.colorPrimary }}>
            Bạn cần giúp đỡ?
          </a>
        </Flex>
      </Header>
      <Content>
        <div className={`bg-[#fe5723] w-full h-[600px] `}>
          <Flex className="h-[100%]" justify="center" align="center">
            <Flex className=" flex-col mr-48" justify="center" align="center">
              <div className="w-[300px] h-[300px]">
                <img
                  className="w-[300px] h-[300px]"
                  src={require("../../assets/img/Shopee-logo-white.jpg")}
                  alt="Logo"
                />
              </div>
              <p className="text-[48px] text-white">Shopee</p>
              <p className="text-center text-white text-[24px]">
                Nên tảng thương mại điện tử <br /> yêu thích nhất ở đông nam á &
                đài loan{" "}
              </p>
            </Flex>
            <Flex className="" justify="center" align="center">
              <div className="bg-white w-[400px] rounded-[5px] ">
                <div className="px-[30px] py-[30px] text-[20px]">
                  <p>Đăng nhập</p>
                </div>
                <div className="px-[30px]">
                  <Form onFinish={formik.handleSubmit} name="login">
                    <Form.Item<FieldType>
                      rules={[
                        { required: true, message: "Vui lòng điền mục này!" },
                      ]}
                    >
                      {/* {formik.errors.usernameInput &&
                        formik.touched.usernameInput && (
                          <p>{formik.errors.usernameInput}</p>
                        )} */}
                      <Input
                        onBlur={formik.handleBlur}
                        value={formik.values.usernameInput}
                        name="usernameInput"
                        onChange={formik.handleChange}
                        style={{ height: "40px", borderRadius: "0" }}
                        placeholder="Email/Số điện thoại/Tên đăng nhập"
                      />
                    </Form.Item>

                    <Form.Item<FieldType>
                      rules={[
                        { required: true, message: "Vui lòng điền mục này!" },
                      ]}
                    >
                      <Input.Password
                        value={formik.values.passwordInput}
                        name="passwordInput"
                        onChange={formik.handleChange}
                        style={{ height: "40px", borderRadius: "0" }}
                        placeholder="Mật khẩu"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        className="w-full h-[40px] rounded-none mt-2"
                        type="primary"
                        htmlType="submit"
                      >
                        Đăng nhập
                      </Button>
                    </Form.Item>
                  </Form>

                  <Flex justify="space-between" align="center">
                    <span className="text-[#05a] cursor-pointer">
                      Quên mật khẩu
                    </span>
                    <span className="text-[#05a] cursor-pointer">
                      Đăng nhập với SMS
                    </span>
                  </Flex>
                  <Divider>
                    {" "}
                    <span className="text-[12px] text-[#ccc]">HOẶC</span>{" "}
                  </Divider>
                  <Flex className="mb-2">
                    <Button
                      className="w-[50%] h-[40px] rounded-none mr-1 flex justify-center items-center"
                      icon={
                        <img
                          className="w-[20px]"
                          src={require("../../assets/img/facebookPNG.png")}
                        ></img>
                      }
                    >
                      Facebook
                    </Button>
                    <Button
                      className="w-[50%] h-[40px] rounded-none ml-1 flex justify-center items-center"
                      icon={
                        <img
                          className="w-[20px]"
                          src={require("../../assets/img/googlePNG.png")}
                        ></img>
                      }
                    >
                      Google
                    </Button>
                  </Flex>
                  <Flex className="py-6 text-[#ccc]" justify="center">
                    <span>Bạn mới biết đến Shopee? </span>
                    <span
                      className="ml-1 cursor-pointer"
                      style={{ color: token.colorPrimary }}
                    >
                      Đăng ký
                    </span>
                  </Flex>
                </div>
              </div>
            </Flex>
          </Flex>
        </div>
      </Content>
      <Footer>
        <Flex justify="center">
          <div className="flex flex-col mr-20">
            <b>Chăm sóc khách hàng</b>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Trung Tâm Trợ Giúp
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Shopee Blog
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Shopee Mall
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Hướng Dẫn Mua Hàng
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Hướng Dẫn Bán Hàng
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Thanh Toán
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Vận Chuyển
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Trả Hàng & Hoàn Tiền
            </Button>
          </div>
          <div className="flex flex-col mr-20">
            <b>Chăm sóc khách hàng</b>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Trung Tâm Trợ Giúp
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Shopee Blog
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Shopee Mall
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Hướng Dẫn Mua Hàng
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Hướng Dẫn Bán Hàng
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Thanh Toán
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Vận Chuyển
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Trả Hàng & Hoàn Tiền
            </Button>
          </div>
          <div className="flex flex-col mr-20">
            <b>Chăm sóc khách hàng</b>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Trung Tâm Trợ Giúp
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Shopee Blog
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Shopee Mall
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Hướng Dẫn Mua Hàng
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Hướng Dẫn Bán Hàng
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Thanh Toán
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Vận Chuyển
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Trả Hàng & Hoàn Tiền
            </Button>
          </div>
          <div className="flex flex-col mr-20">
            <b>Chăm sóc khách hàng</b>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Trung Tâm Trợ Giúp
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Shopee Blog
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Shopee Mall
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Hướng Dẫn Mua Hàng
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Hướng Dẫn Bán Hàng
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Thanh Toán
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Vận Chuyển
            </Button>
            <Button className="text-left p-0 text[#ccc]" type="link">
              Trả Hàng & Hoàn Tiền
            </Button>
          </div>
        </Flex>
      </Footer>
    </Layout>
  );
}

export default Login;
