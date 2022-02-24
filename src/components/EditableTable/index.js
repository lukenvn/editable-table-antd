import React, {useState} from 'react';
import {Button, Form, Input, Table} from 'antd';

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          form,
                          children,
                          formInput,
                          formItemProps = {},
                          inputProps = {},
                          onInputChange,
                          renderFormInput,
                          ...restProps
                      }) => {
    const InputType = formInput || Input;

    const inputNode = renderFormInput ? renderFormInput(form, record) : <InputType {...inputProps} onChange={e => {
        onInputChange?.(form, record, e)
    }
    }/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={[record.key, dataIndex]}
                    {...formItemProps}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = ({columns, originData,onChange}) => {

    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKeys, setEditingKeys] = useState(originData.map(({key}) => key));

    const isEditing = (record) => editingKeys.includes(record.key);

    const handleAdd = () => {
        const newRowKey = Date.now();
        setData([...data, {key: newRowKey}])
        setEditingKeys([...editingKeys, newRowKey])
    }

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                form,
                dataIndex: col.dataIndex,
                title: col.title,
                formInput: col.formInput,
                inputProps: col.inputProps,
                formItemProps: col.formItemProps,
                onInputChange: col.onInputChange,
                renderFormInput: col.renderFormInput,
                editing: isEditing(record),
            }),
        };
    });
    const initialValues = originData.map(({
                                              key,
                                              ...remain
                                          }) => ({[key]: remain}))
        .reduce((res, data) => ({...res, ...data}), {});

    return (
        <Form form={form} component={false} initialValues={
            initialValues
        } onValuesChange={(changedValue,values)=>{
          const currentDataSource=  Object.entries(values).map(([key,value])=>({key,...value}))
            onChange?.(currentDataSource)
        }}>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add a row
            </Button>
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
            />
        </Form>
    );
};

export default EditableTable;