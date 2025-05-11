import React, { useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { addNewStudent } from "./services/api.js";
import { successNotification, errorNotification } from "./Notification.jsx";

const { Option } = Select;

const StudentDrawerForm = ({ showDrawer, setShowDrawer, fetchStudents }) => {
    const [submitting, setSubmitting] = useState(false);

    const [form] = Form.useForm();

    const onClose = () => {
        if (!submitting) setShowDrawer(false);
    };

    const onSubmit = async (student) => {
        setSubmitting(true); // Start spinner
        try {
            console.log(student); // Log the student data
            await addNewStudent(student); // Call the API to add the student
            fetchStudents(); // Fetch updated list of students

            // Show success notification
            successNotification(
                "Student added successfully",
                `${student.name} has been added successfully`
            );

            setShowDrawer(false); // Close the drawer on success
            form.resetFields(); // Reset form
        } catch (err) {
            console.error(err);
            errorNotification(
                "Failed to add student",
                `An error occurred while adding ${student.name}. Please try again later.`
            );
        } finally {
            setSubmitting(false); // Stop spinner
        }
    };

    return (
        <Drawer
            title="Create a new account"
            width={1020}
            onClose={onClose}
            open={showDrawer}
            bodyStyle={{
                paddingBottom: 80,
            }}
            extra={
                <Space>
                    <Button onClick={onClose} disabled={submitting}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => form.submit()}
                        disabled={submitting}
                    >
                        {submitting ? <Spin indicator={<LoadingOutlined spin />} /> : "Submit"}
                    </Button>
                </Space>
            }
        >
            <Form
                form={form}
                layout="vertical"
                hideRequiredMark
                onFinish={onSubmit}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: "Please enter student name" }]}
                        >
                            <Input placeholder="Please enter student name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: "Please choose gender" }]}
                        >
                            <Select placeholder="Please choose a gender">
                                <Option value="MALE">Male</Option>
                                <Option value="FEMALE">Female</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: "Please enter and email address" }]}
                        >
                            <Input placeholder="Enter email address"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default StudentDrawerForm;