import React, { Component } from 'react';
import { URLmerchant } from '../../components/url/URLmerchant';
import { message, notification, Row, Col, Divider, Drawer } from 'antd';
import { Button } from "reactstrap";
import { MdDone } from 'react-icons/md';
import { MdBlock } from "react-icons/md";
import { MdRemoveRedEye } from 'react-icons/md';


const openNotificationSucceed = type => {
    notification[type]({
      message: 'Succeed',
      description:
        'Merchant Approved',
    });
  };

const openNotificationRejeced = type => {
    notification[type]({
        message: 'Rejected',
        description:
        'Merchant Rejected',
    });
};

const DescriptionItem = ({ title, content }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
      }}
    >
      <p
        className="site-description-item-profile-p"
        style={{
          marginRight: 8,
          display: 'inline-block',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );

const pStyle = {
    fontSize: 16,
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
  };

export default class buttonApprovalRender extends Component {
  constructor(props){
    super(props);
    if(localStorage.getItem("jwt") == null){
      this.props.history.push('/')
      console.log("login")
    }
  }
    state = {
        userData: {},
        // loadingApprove: false,
        // loadingReject: false,
        visible: false,
    }

    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };

    onApproved = () => {
        console.log("PROPS",this.props)
        // this.setState({ loadingApprove: true });
        const axios = require('axios');
        console.log('props', this.props.id)
        axios.patch( URLmerchant  +"api/v1/acquisition/approval/accepted/" + this.props.id,
        {},
        {
            headers : {
                Authorization: "Bearer "+ localStorage.getItem("jwt")
            }
        }
           ).then(response => {
                console.log('response: ', response.data);
                this.props.fetchData()
                this.setState({ 
                    ...this.state, 
                    // loadingApprove:false
                })
                openNotificationSucceed('success');
            }).catch = (error) => {
                console.log(error.response);
                // this.setState({ 
                //     ...this.state, 
                //     loadingApprove:false})
                message.warning(error.response.message)
                window.location.reload();
            };
    }

    onRejected = () => {
        // this.setState({ loadingReject: true });
        const axios = require('axios');
        axios.patch(URLmerchant  +"api/v1/acquisition/approval/rejected/" + this.props.id,{},    
        {
                headers : {
                    Authorization: "Bearer "+ localStorage.getItem("jwt")
                }
            }
           ).then(response => {
            this.props.fetchData()
            this.setState({ 
                ...this.state, 
                // loadingReject:false
            })
            openNotificationRejeced('error')
        }).catch = (error) => {
            console.log(error.response);
            // this.setState({ 
            //     ...this.state, 
            //     loadingReject:false
            // })
            window.location.reload();    
        };
    }
    
    render() {
        return (
            <div>
                <Button 
                    style={{fontSize:20}}
                    color="danger"
                    size="sm" 
                    onClick={this.onRejected}
                    // loading={this.state.loadingReject}
                    >
                    <MdBlock/>
                </Button>
                
                <Button 
                    style={{fontSize:20}}
                    size="sm"
                    color="info" 
                    onClick={this.onApproved}
                    // loading={this.state.loadingApprove}
                    >
                    <MdDone/> 
                </Button>
                {/* <Divider type="vertical"/> */}
                
                {/* <Button
                    style={{fontSize:20}} 
                    color="success"
                    size="sm" 
                    onClick={this.showDrawer}
                    // loading={this.state.loadingReject}
                    >
                    <MdRemoveRedEye/>
                </Button> */}

                <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p className="site-description-item-profile-p" style={{ ...pStyle, marginBottom: 24 }}>
            Owner profile
          </p>
          <p className="site-description-item-profile-p" style={pStyle}>
            Personal
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Owner Name" content="Lily" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Owner Address" content="jl.cdcccacas" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Phone" content="HangZhou" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="City" content="China🇨🇳" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Birthday" content="February 2,1900" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Website" content="-" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Message"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p" style={pStyle}>
            Company
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Position" content="Programmer" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Responsibilities" content="Coding" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Department" content="XTech" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p" style={pStyle}>
            Contacts
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={
                  <a href="http://github.com/ant-design/ant-design/">
                    github.com/ant-design/ant-design/
                  </a>
                }
              />
            </Col>
          </Row>
          <p className="site-description-item-profile-p" style={pStyle}>
            Contacts
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={
                  <a href="http://github.com/ant-design/ant-design/">
                    github.com/ant-design/ant-design/
                  </a>
                }
              />
            </Col>
          </Row>
          <p className="site-description-item-profile-p" style={pStyle}>
            Contacts
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={
                  <a href="http://github.com/ant-design/ant-design/">
                    github.com/ant-design/ant-design/
                  </a>
                }
              />
            </Col>
          </Row>
          <p className="site-description-item-profile-p" style={pStyle}>
            Contacts
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={
                  <a href="http://github.com/ant-design/ant-design/">
                    github.com/ant-design/ant-design/
                  </a>
                }
              />
            </Col>
          </Row>
        </Drawer>
            </div>
        );
    }
}