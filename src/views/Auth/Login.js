import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row
} from "reactstrap";
import { message } from 'antd'
import  AuthLayout  from '../../layouts/Auth'
import AuthFooter from '../../components/Footers/AuthFooter'
import Axios from "axios";
import { URL } from "components/url/URL";

class Login extends React.Component {
    constructor(props){
        super(props);
        console.log(localStorage.getItem("jwt"))
        if(localStorage.getItem("jwt") != null){
          this.props.history.push('/admin/index')
          console.log("login")
        }
      }

    state = {
        email: "",
        password: "",
        loading: false,
      };

      getYear() {
        return new Date().getFullYear();
      }
    
      login = (_email, _password) => {
        this.setState({loading: true });
        const LOGIN_ENDPOINT = `${URL}api/v1/poi/login`;
        Axios.post(LOGIN_ENDPOINT, {
          email: _email,
          password: _password
        }).then((response) => {
            console.log("callback",response)
            let jwt = response.data.token;
            let expire_at = response.data.expired;
           
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("pager", 1);
            localStorage.setItem("expired", expire_at);
            this.setState({ loading: false });
            message.info("login berhasil")
            this.props.history.push('/admin')
          }
          ).catch((error) => {
            console.log(error);
            console.log('message', error)
            this.setState({ loading:false });
            message.error("login gagal!!!")
          });
        }
    
      getEmailValue = (e) => {
        this.setState({
          ...this.state,
          email: e.target.value
        })
      }
      
      getPasswordValue = (e) => {
        console.log(e.target.value)
        this.setState({
          ...this.state,
          password: e.target.value
        })
      }
    
      onClicked = () => {
        this.login(this.state.email, this.state.password)
      }
  

  render() {
    return (
      <>
        <AuthLayout/>
        <Row className="justify-content-center">

            <Col className="mt--8" md="3" >
            <Card className="bg-secondary shadow border-0" >
                <CardHeader className="bg-transparent pb-5">
                
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                    <small>Sign in with credentials</small>
                </div>
                <Form role="form">
                    <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                            placeholder="Email" 
                            type="email" 
                            autoComplete="new-email"
                            onChange={(e) => this.getEmailValue(e)}/>
                    </InputGroup>
                    </FormGroup>
                    <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                            placeholder="Password" 
                            type="password" 
                            autoComplete="new-password"
                            onChange={(e) => this.getPasswordValue(e)}/>
                    </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                        />
                    <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                        >
                        <span className="text-muted">Remember me</span>
                    </label>
                    </div>
                    <div className="text-center">
                        <Button 
                            className="my-4" 
                            color="primary" 
                            type="button"
                            onClick={() => this.onClicked()}
                            loading={this.state.loading}
                        >
                        Sign in
                        </Button>
                    </div>
                    <div className="copyright text-center text-muted">
                      © {this.getYear()}{" "}
                      <a
                        className="font-weight-bold ml-1"
                        href="https://anterin.id"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Anterin Digital Nusantara
                      </a>
                    </div>
                </Form>
                </CardBody>
            </Card>
            </Col>
            </Row>
            <AuthFooter/>
      </>
    );
  }
}

export default Login;
