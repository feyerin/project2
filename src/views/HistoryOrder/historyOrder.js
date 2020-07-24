import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    Container,
    Row,
    Button
  } from "reactstrap";
import { Table, Input, Dropdown, Menu, DatePicker, Select } from 'antd';
import Header from 'components/Headers/Header'
import { URL } from 'components/url/URL';
import Axios from 'axios';
import moment from 'moment';


const { Search } = Input;
const { Column } = Table;
const {RangePicker} = DatePicker;
const { Option } = Select;



export default class historyOrder extends Component {
  
  constructor(props){
    super(props);
      if(localStorage.getItem("jwt") == null){
        this.props.history.push('/')
        console.log("login")
      }
    this.current = 1
    this.state ={
      data: [],
      pagination: {
        current: 1,
        totalPage: 1
      },
      merchant: [],
      loading :false,
      status : 'all',
      totalDataTableValue: 10,
      searchValue: "",
      start: new Date().toLocaleString().substring(0, 9),
      end: new Date().toLocaleString().substring(0, 9),
      size: 'small'
    }
  }

  handleTableChange = (pagination, filters) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = this.state.totalDataTableValue;
    console.log()
    this.setState({
      ...this.state,
      pagination: pager,
      // status: filters
    },() => this.fetch());    
  }

  onChange=(dates, dateStrings) => {
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    this.setState({
      ...this.state,
      start : dateStrings[0],
      end : dateStrings[1]
    }, () =>  this.fetch())
  }

  handleMenuClick = (e) => {
    this.setState({
      ...this.state,
      totalDataTableValue: e.key,
    },() => this.fetch()); 
  }

  getSearchValue = (e) => {
    this.setState({
      ...this.state,
      searchValue: e.target.value
    })
    console.log(e.target.value)
  }

  onClicked = () => {
    console.log(this)
    this.fetch(this.state.searchValue)
  }

  onExport = () => {
    Axios.get( URL + "/api/bank-dki/v1/orders/export?date_start=" + this.state.start + "&date_end=" + this.state.end + "&status=" + this.state.status,
    {
      responseType: 'arraybuffer',
      headers : {
        Authorization: "Bearer "+ localStorage.getItem("jwt"),
      }
       
    }).then(response => {
      var fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
      var fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'file.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
    });
  }

  handleChange = (value) => {
    console.log(value); 
    this.setState({
      ...this.state,
      status: value.value,
    },() => this.fetch()); 
  }

  getMerchant = () => {
    Axios.get( URL + "api/bank-dki/v1/register-driver/merchants",
    {
      headers : {
        Authorization: "Bearer "+ localStorage.getItem("jwt")
      } 
    })
    .then(response => {
      console.log('response', response.data.data)
      let arr = []
      const items = response.data.data
        for (var i=0; i < items.length; i++){
          items.key = items[i].id
          arr.push({
            value : items[i].id,
            label : items[i].name
          })
        }
        this.setState({
          ...this.state,
          merchant: arr,
        });
        console.log('merchant', this.state.merchant)
        }).catch(_error => {
              return _error
        })
  }

  fetch = () => {
    this.setState({
      ...this.state,
      loading : false
    });

    Axios.get( URL + "api/bank-dki/v1/orders?page=" + this.state.pagination.current + "&date_start=" + this.state.start + "&date_end=" + this.state.end + "&status=" +this.state.status,
    {
      headers : {
        Authorization: "Bearer "+ localStorage.getItem("jwt")
      } 
    })
    .then(response => {
      console.log('response', response.data.meta.total_pages)
      const newData = [];
      const pagination = {...this.state.pagination};
      pagination.total = response.data.meta.count;
      pagination.pageSize = this.state.totalDataTableValue;
      pagination.totalPage = response.data.meta.total_pages;
      response.data.data.forEach(item => {
        item.key = item.id;
        newData.push(item);   
      });
      this.setState({
        ...this.state,
        data: newData,
        loading: false,
        pagination,
      });
    });
  }

  componentDidMount() {
    this.fetch();
    this.getMerchant();
  }
  

  render(){
    const menu  = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key={10}>
          10
        </Menu.Item>
        <Menu.Item key={20}>
          20
        </Menu.Item>
        <Menu.Item key={50}>
          50
        </Menu.Item>
      </Menu>
    );
    return(
      <div>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        {/* Table */}
          <Row>
              <div className="col">
                <Card className="shadow" style={{padding:18}}>
                  <CardHeader className="border-0">
                    <h3 className="mb-0"> </h3>
                  </CardHeader>

                  <div className="mb-0 form-inline mr-3 d-md-flex ml-lg-auto">
                    <Button onClick={this.onExport} color="info">download</Button>
                    <span>Page {this.current} of {this.state.pagination.totalPage}</span>
                  </div>
                  
                  <div className="mb-0 form-inline mr-3 d-md-flex ml-lg-auto">
                    <div className="mx-lg-auto" style={{paddingRight:10}}>
                     <Select
                      labelInValue
                      defaultValue={{ value: 'all' }}
                      style={{ width: 120 }}
                      onChange={this.handleChange}
                     >
                      <Option value="all">All</Option>
                      <Option value="done">Done</Option>
                      <Option value="incoming">Pembayaran Dikonfirmasi</Option>
                     </Select>
                    </div>
                    <div className="mx-lg-auto" >
                      <RangePicker 
                      defaultValue={[moment(this.state.start), moment(this.state.end)]}
                      onChange={this.onChange} />                
                    </div>
                    <div className="mx-lg-auto" >
                      <Search
                        placeholder="input search text"
                        size='medium'
                        style={{ width: 200, margin:10, borderRadius:15 }}
                        onSearch={() => this.onClicked()}                      
                        onChange={(e) => this.getSearchValue(e)} 
                      />
                    </div>
                      <Dropdown.Button  
                        overlay={menu} 
                        icon={ <i className="ni ni-bold-down" />}>
                          {this.state.totalDataTableValue}
                      </Dropdown.Button>
                    </div>
                    <Table
                      onChange={this.handleTableChange}
                      dataSource={this.state.data}
                      pagination={this.state.pagination} 
                      loading={this.state.loading}
                      scroll={{ x: 1500}}
                    >
                      <Column title="Voucher Code" dataIndex="voucher_code_delivery"  />
                      <Column title="merchant Name" dataIndex="merchant_name"  />
                      <Column title="Customer" dataIndex="customer_name"/>
                      <Column title="Driver" dataIndex="driver_name"/>
                      <Column title="Destination Address" dataIndex="destination_address" ellipsis= "true"/>
                      <Column title="Created At" dataIndex="created_at"/>
                      <Column title="Status" dataIndex="order_status_name"/>
                      </Table>
                  </Card>
              </div>
          </Row>
        </Container>
      </div>
    )
  }
}