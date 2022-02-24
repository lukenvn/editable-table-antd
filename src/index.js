import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import EditableTable from "./components/EditableTable";
import {Input, InputNumber, Popconfirm, Select, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";

const originData = [];

for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const Main = props => {

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
            formItemProps: {rules: [{required: true}]}
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: '25%',
            editable: true,
            inputType: Select,
            inputProps: {options: [{label: 'Type 1', value: 1}, {label: 'Type 2', value: 2}]}
        },
        {
            title: 'Type2',
            dataIndex: 'type2',
            width: '25%',
            editable: true,
            renderFormInput: (form, recordKey) => {
                const {type} = form.getFieldValue(recordKey) || {};
                return <Select options={[{label: 'Type 1', value: 1}, {label: 'Type 2', value: 2}]}
                               onChange={type2 => {
                                   let age = type == 1 && type2 == 1 ? 100 : type2 == 1 ? 16 : 20;
                                   form.setFieldsValue({[recordKey]: {age}})
                               }
                               }
                />
            }
        },
        {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            editable: true,
            inputType: InputNumber,
            inputProps: {min: 0}
        },
        {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            editable: true,
        },

    ];
    const [dataSource, setDataSource] = useState(originData);
    useEffect(() => {
        // console.log(dataSource)
    }, [dataSource]);

    return <div>
        <EditableTable columns={columns} originData={dataSource} onChange={values => setDataSource(values)}/>
    </div>
}
ReactDOM.render(<Main></Main>, document.getElementById('container'));