import React, {useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Typography, Button} from 'antd';
import EditableCell from "./EditableCell";
import useEditableState from "./useEditableState";


const EditableTable = (props) => {

    const { data, mergedColumns, formProps,addNewButton} = useEditableState(props)

    return (
        <Form {...formProps}>
            {addNewButton}
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    // onChange: cancel,
                }}
            />
        </Form>
    );
};

export default EditableTable;