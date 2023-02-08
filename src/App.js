import './App.css';
import React, {useState, useEffect} from 'react';
import AddBookDrawer from "./AddBookDrawer";
import EditBookDrawer from "./EditBookDrawer";
import {Button, Table, Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';

const {Column} = Table;

function App() {
    const [bookList, setBookList] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [openAddBookDrawer, setOpenAddBookDrawer] = useState(false);
    const [openEditBookDrawer, setOpenEditBookDrawer] = useState(false);
    const onCloseEditContactDrawer = () => {
        setOpenEditBookDrawer(false);
    }

    const onClose = () => {
        setOpenAddBookDrawer(false);
    }

    const warning = (contactId) => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined/>,
            title: 'Delete book',
            content: (
                <div>
                    <p>{"You are going to delete a book, are you ok with it?"}</p>
                </div>
            ),
            onOk() {
                fetch('http://localhost:8082/api/books/' + contactId, {method: 'DELETE'})
                    .then(() => console.log('Delete successful'));
                window.location.reload(false);
            },
            onCancel() {
            },
        });
    }

    useEffect(() => {
        fetch('http://localhost:8082/api/books', {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBookList(data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [openEditBookDrawer, openAddBookDrawer]);

    return (
        <div>
            <h1>Library</h1>
            <Button type="primary" className="button" onClick={() => {
                setOpenAddBookDrawer(true);
            }}>{"Add contact"}</Button>
            {/*<Button variant="primary">Primary</Button>{' '}*/}
            <Table dataSource={bookList} className="center" rowKey="_id">
                <Column title="Title" dataIndex="title" key="title"/>
                <Column title="Borrower" dataIndex="borrower" key="borrower"/>
                <Column title="Email" dataIndex="borrower_email" key="borrower_email"/>
                <Column title="Phone" dataIndex="borrower_phone" key="borrower_phone"/>
                <Column title="Borrow Date" dataIndex="borrow_date" key="borrow_date"/>
                <Column
                    title=""
                    key="edit"
                    render={(value) => (
                        <Button type="link" onClick={() => {
                            setBookData(value);
                            setOpenEditBookDrawer(true);
                        }
                        }>{"Edit"}</Button>
                    )}
                />
                <Column
                    title=""
                    key="delete"
                    render={(value) => (
                        <Button danger type="text" onClick={() => {
                            warning(value._id);
                        }}>{"Delete"}</Button>)}
                />
            </Table>
            <AddBookDrawer openAddBookDrawer={openAddBookDrawer} onClose={onClose}/>
            <EditBookDrawer openEditBookDrawer={openEditBookDrawer} onCloseEditBookDrawer={onCloseEditContactDrawer}
                            bookData={bookData}/>
        </div>
    );
}

export default App;
