import {Button, Form} from "antd";
import React, {useState} from "react";

const useColumns = ({columns, editingKey, form}) => {
    const isEditing = (record) => editingKey.includes(record.key);

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
                inputType: col.inputType,
                renderFormInput: col.renderFormInput,
                inputProps: col.inputProps,
                formItemProps: col.formItemProps,
                editing: isEditing(record),
            }),
        };
    });

    return mergedColumns;
}


const useChangingStateAction = ({originData, onChange,}) => {

    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState(originData.map(({key}) => key));

    const handleAdd = () => {
        const newKey = Date.now();
        setData([{key: newKey}, ...data])
        setEditingKey([...editingKey, newKey])
    }

    function handleFormChanged(changedValues) {
        const newDataSource = originData.map(row => {
            const currenKey = Object.keys(changedValues)[0];
            if (row.key === currenKey) {
                const changedData = changedValues[currenKey]
                return {...row, ...changedData}
            }
            return row
        })
        onChange(newDataSource)
    }
    return {handleAdd, handleFormChanged, data, setData, editingKey, setEditingKey}
}

const useEditableState = ({columns, originData, onChange}) => {
    const [form] = Form.useForm();

    const {handleAdd, handleFormChanged, editingKey,data} = useChangingStateAction({onChange, originData})

    const formProps = {
        form, component: false,
        initialValues: originData,
        onValuesChange: (changedValues, values) => {
            handleFormChanged(changedValues);
        }
    }
    const mergedColumns = useColumns({columns, form, editingKey});
    const addNewButton = <Button onClick={handleAdd}>+Row</Button>;
    return {formProps, mergedColumns, addNewButton,data};
}

export default useEditableState;