import React, {useContext, useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import EditableTable from "./components/EditableTable";
import {InputNumber, Select} from "antd";

const originData = [];

for (let i = 0; i < 2; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const App = () => {

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
            formItemProps: {
                rules: [{required: true}]
            }
        },
        {
            title: 'type',
            dataIndex: 'type',
            width: '15%',
            editable: true,
            formItemProps: {
                rules: [{required: true}]
            },
            renderFormInput: (form, record) => <Select
                options={[{label: "type 1", value: 1}, {label: "type 2", value: 2},]} onChange={value => {
                const age = value ==1 ? 18 : 20
                form.setFields([{
                    name: [record.key, 'age'],
                    value: age
                }]);
            }}/>
        },
        {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            editable: true,
            formInput: InputNumber,
            onInputChange: (form, record, value) => {
                const discount = value > 18 ? 5 : 0
                form.setFields([{
                    name: [record.key, 'discount'],
                    value: discount
                }]);
            },
        },
        {
            title: 'discount',
            dataIndex: 'discount',
            width: '15%',
            editable: true,
            formInput: InputNumber
        },
        {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            editable: true,
        },

    ];

    return (
        <div>
            <EditableTable columns={columns} originData={originData} onChange={console.log}/>
        </div>
    );
};


ReactDOM.render(<App/>, document.getElementById('container'));