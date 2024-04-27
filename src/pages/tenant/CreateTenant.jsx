import { Modal, Form, Input, Button, Switch, InputNumber, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import { createTenant, updateTenant } from '../../api/tenant'

const MyFormItemContext = React.createContext([])

function toArr(str) {
    return Array.isArray(str) ? str : [str]
}

// 表单
const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext)
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined
    return <Form.Item name={concatName} {...props} />
}

export const CreateTenant = ({ visible, onClose, selectedRow, type, handleList }) => {
    const [form] = Form.useForm()
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        if (selectedRow) {
            form.setFieldsValue({
                name: selectedRow.name,
                manager: selectedRow.manager,
                description: selectedRow.description,
                userNumber: selectedRow.userNumber,
                ruleNumber: selectedRow.ruleNumber,
                dutyNumber: selectedRow.dutyNumber,
                noticeNumber: selectedRow.noticeNumber,
                removeProtection: selectedRow.removeProtection,
            })
        }
    }, [selectedRow, form])

    // 创建
    const handleCreate = async (data) => {
        try {
            await createTenant(data)
            handleList()
        } catch (error) {
            console.error(error)
        }
    }

    // 更新
    const handleUpdate = async (data) => {
        try {
            await updateTenant(data)
            handleList()
        } catch (error) {
            console.error(error)
        }
    }

    // 提交
    const handleFormSubmit = async (values) => {

        if (type === 'create') {
            const params = {
                ...values,
                removeProtection: enabled,
            }

            await handleCreate(params)
        }

        if (type === 'update') {
            const params = {
                ...values,
                id: selectedRow.id,
            }

            await handleUpdate(params)
        }

        // 关闭弹窗
        onClose()

    }

    return (
        <>
            <Modal visible={visible} onCancel={onClose} footer={null}>
                <Form form={form} name="form_item_path" layout="vertical" onFinish={handleFormSubmit}>
                    <strong style={{ fontSize: '15px' }}>基础信息</strong>
                    <div style={{ display: 'flex' }}>
                        <MyFormItem
                            name="name"
                            label="租户名称"
                            style={{
                                marginRight: '10px',
                                width: '500px',
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </MyFormItem>
                        <MyFormItem
                            name="manager"
                            label="租户负责人"
                            style={{
                                width: '500px',
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </MyFormItem>
                    </div>

                    <MyFormItem
                        name="description"
                        label="描述"
                        style={{
                            width: '472px',
                        }}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </MyFormItem>
                    <Divider />
                    <strong style={{ fontSize: '15px' }}>租户配额</strong>
                    <div style={{ display: 'flex' }}>
                        <MyFormItem
                            name="userNumber"
                            label="用户数"
                            style={{
                                marginRight: '20px',
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber
                                addonAfter={'个'}
                                placeholder="10"
                                min={1}
                            />
                        </MyFormItem>
                        <MyFormItem
                            name="ruleNumber"
                            label="规则数"
                            style={{
                                marginRight: '20px',
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber
                                addonAfter={'个'}
                                placeholder="10"
                                min={1}
                            />
                        </MyFormItem>
                        <MyFormItem
                            name="dutyNumber"
                            label="值班表数"
                            style={{
                                marginRight: '20px',
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber
                                addonAfter={'个'}
                                placeholder="10"
                                min={1}
                            />
                        </MyFormItem>
                        <MyFormItem
                            name="noticeNumber"
                            label="通知对象数"
                            style={{
                                marginRight: '20px',
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber
                                addonAfter={'个'}
                                placeholder="10"
                                min={1}
                            />
                        </MyFormItem>
                    </div>
                    <Divider />
                    <strong style={{ fontSize: '15px' }}>其他</strong>
                    <MyFormItem
                        name="removeProtection"
                        label="删除保护"
                        tooltip="启用/禁用"
                        valuePropName="checked"
                    >
                        <Switch checked={enabled} onChange={setEnabled} />
                    </MyFormItem>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}