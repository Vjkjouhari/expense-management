import React, { useEffect, useState } from 'react'
import Layoutt from '../components/layout/Layoutt'
import { Form, Input, Modal, Select, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import axios from 'axios';
import { message } from 'antd';
import Spinner from '../components/layout/Spinner';
import moment from "moment";
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const Hompage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transection, setTransection] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null)
  //tabledata
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Referance',
      dataIndex: 'referance'
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setShowModal(true)
          }} />
          <DeleteOutlined className='mx-2' onClick={() => handleDelete(record)} />
        </div>
      )
    },
  ]



  //get all transection
  // 
  useEffect(() => {
    const getAllTransection = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const res = await axios.post('/transections/get-transection', {
          userId: user._id,
          frequency,
          selectedDate,
          type
        })
        setLoading(false);
        setTransection(res.data)
      } catch (error) {
        console.log(error)
        message.error('Fetch issue with transection')
      }
    }
    getAllTransection();
  }, [frequency, selectedDate, type]);


  // delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true)
      await axios.post('/transections/delete-transection', {
        transectionId: record._id
      });
      setLoading(false)
      message.success('Successfully Deleted')

    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error('Unable to delete')
    }
  };


  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      if (editable) {
        await axios.post("/transections/edit-trasection", {
          payload: {
            ...values, userId: user._id,
          },
          transectionId: editable._id,
        });
        message.success("Transection Updated Successfully");
      } else {
        await axios.post('/transections/add-trasection', {
          ...values,
          userId: user._id
        });
        setLoading(false);
        message.success('Transection Addedd Successfully');
      }
      setShowModal(false);
      setLoading(false);
      setEditable(null);

    } catch (error) {
      setLoading(false);
      message.error('Failed to add transection Successfully')
    }
  };
  return (
    <Layoutt>
      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' &&
            (<RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)} />
            )}
        </div>

        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {type === 'custom' &&
            (<RangePicker
              value={type}
              onChange={(values) => setType(values)} />
            )}
        </div>

        <div className='switch-icon'>
          <UnorderedListOutlined
            className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData('table')}
          />
          <AreaChartOutlined
            className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>
        </div>
      </div>
      <div className='content'>
        {viewData === 'table' ?
          <Table columns={columns} dataSource={transection} /> :
          <Analytics transection={transection} />
        }
      </div>
      <Modal title={editable ? 'Edit Transection' : 'Add Transcetion '} open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount"><Input type="text" /></Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Type" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="fee">Fee </Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date"><Input type="date" /></Form.Item>
          <Form.Item label="Referance" name="referance"><Input type="text" /></Form.Item>
          <Form.Item label="Description" name="description"><Input type="text" /></Form.Item>
          <div className='d-flex justify-content-end'>
            {" "}
            <button type="submit" className='btn btn-primary'>SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layoutt>
  )
};

export default Hompage;