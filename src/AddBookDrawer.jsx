import React from 'react';
import {Button, Drawer, Form, Input} from 'antd';


export default function AddBookDrawer({openAddBookDrawer, onClose}) {
    const onFinish = (values) => {
        console.log('Success:', values);
        // POST the new contact
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        };
        fetch('http://localhost:8082/api/books', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

        // Close the drawer
        onClose();
    };

    return (
        <Drawer title="Add contact" placement="right" onClose={onClose} open={openAddBookDrawer}
                destroyOnClose={true}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="title" label="Name"
                           rules={[{required: true, message: 'Please enter book title'}]}
                >
                    <Input placeholder="Please enter user name"/>
                </Form.Item>
                <Form.Item name="borrower" label="Borrower"
                           rules={[{required: true, message: "Please enter borrower's name"}]}
                >
                    <Input placeholder="Please enter borrower's name"/>
                </Form.Item>

                <Form.Item name="borrower_email" label="E-mail"
                           rules={[
                               {
                                   type: 'email',
                                   message: 'The input is not valid E-mail!',
                               },
                               {
                                   required: true,
                                   message: "Please input borrower's E-mail!",
                               },
                           ]}
                >
                    <Input placeholder="Please input borrower's E-mail!"/>
                </Form.Item>
                <Form.Item name="borrower_phone" label="Phone number"
                           rules={[{required: true, message: "Please enter borrower's phone number"}]}>
                    <Input
                        rules={[
                            {
                                type: 'number',
                                message: 'The input must be numeric!',
                            },
                            {
                                required: true,
                                message: 'Please input borrower\'s phone number!',
                            },
                        ]}
                        placeholder="Input borrower's phone number"
                        maxLength={8}
                    />
                </Form.Item>
                < Form.Item wrapperCol={{offset: 18, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>


    );
};