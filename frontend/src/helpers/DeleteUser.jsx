import React, { useState } from "react";
import { message, Popconfirm, Button } from "antd";

//Delete Button
export const DeleteUser = ({ id, onDelete }) => {
    const [open, setOpen] = useState(false);

    const confirm = () => {
        setOpen(false);
        onDelete(id); // Call parent function to handle deletion
    };

    const cancel = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <Popconfirm
            title="Delete the user"
            description={`Are you sure you want to delete user ${id}?`}
            open={open}
            onOpenChange={handleOpenChange}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger type="primary" size="small">
                Delete
            </Button>
        </Popconfirm>
    );
};

//Delete function
