import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { updateStudent } from "../services/api.js";
import { successNotification, errorNotification } from "../Notification.jsx";

const { Option } = Select;

const EditUser = ({ showEditDrawer, setShowEditDrawer, fetchStudents, student }) => {
    const [submitting, setSubmitting] = useState(false); // Handles loading spinner
    const [form] = Form.useForm(); // Ant Design form instance

    // Populate the form when the `student` object changes
    useEffect(() => {
        if (student) {
            // Dynamically set the form fields when `student` changes
            form.setFieldsValue({
                name: student.name || "", // Default to empty string if `student.name` is undefined
                gender: student.gender || undefined, // Use undefined for Select input
            });
        } else {
            form.resetFields(); // If no student is selected, clear all fields
        }
    }, [student, form]);

    const onClose = () => {
        if (!submitting) {
            setShowEditDrawer(false); // Close the drawer
            form.resetFields(); // Reset all the form fields
        }
    };

    const onSubmit = async (editedStudent) => {
        setSubmitting(true); // Start spinner during submission
        try {
            console.log("Edited student data:", editedStudent);

            // Replace this with your edit API function
            await updateStudent(student.id,editedStudent); // API call to update student
            fetchStudents(); // Fetch updated student list

            successNotification(
                "Student updated successfully",
                `${editedStudent.name}'s details have been updated!`
            );

            setShowEditDrawer(false); // Close the drawer on success
            form.resetFields(); // Clear the form
        } catch (err) {
            console.error(err);
            errorNotification(
                "Update failed",
                `Failed to update ${editedStudent.name}. Please try again later.`
            );
        } finally {
            setSubmitting(false); // Stop the spinner
        }
    };

    return (
        <Drawer
            title="Edit Student Details"
            width={720}
            onClose={onClose}
            open={showEditDrawer}
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
                        onClick={() => form.submit()} // Trigger form submission
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
                onFinish={onSubmit} // Handle form submissions
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name" // This links the input to the `name` field in the form
                            label="Name"
                            rules={[{ required: true, message: "Please enter student name" }]}
                        >
                            <Input placeholder="Enter student name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="gender" // This links the input to the `gender` field in the form
                            label="Gender"
                            rules={[{ required: true, message: "Please select gender" }]}
                        >
                            <Select placeholder="Select gender">
                                <Option value="MALE">Male</Option>
                                <Option value="FEMALE">Female</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default EditUser;