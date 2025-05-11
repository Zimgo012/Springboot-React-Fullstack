import EditUser from "./helpers/EditUser.jsx";

"/services/api.js";
import { LaptopOutlined, NotificationOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Table,
    Flex,
    Spin,
    Empty,
    Button,
    Badge,
    Space,
    Tag,
    Avatar,
    message
} from 'antd';
import { useState, useEffect } from 'react';

import {getAllStudent, deleteStudent} from "./services/api.js";
import {DeleteUser} from "./helpers/DeleteUser.jsx";
import StudentDrawerForm from "./StudentDrawerForm.jsx";
import './App.css'


const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: '',
        label: `subnav ${key}`,
        children: Array.from({ length: 4 }).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

const TheAvatar = ({name}) =>{
    let trim = name.trim();
    if(trim.length === 0){
        return <Avatar icon={UserOutlined}></Avatar>
    }
    const split= trim.split(" ");
    if(split.length === 1){
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{name.charAt(0)}{name.charAt(name.length-1)}</Avatar>
}





function App() {


    const [showDrawer, setShowDrawer] = useState(false);
    const [showEditDrawer, setShowEditDrawer] = useState(false);
    const [students, setStudents] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState("");


    const handleDelete = (id, callback) => {
        // Optionally, you can include a backend API call here:
        deleteStudent(id).then(() => {
            message.success(`User with ID ${id} has been successfully deleted.`);
            callback();
        }).catch(() => {
            message.error(`Failed to delete user with ID ${id}`);
        });


    };


    const fetchStudents = () => {
                getAllStudent()
                    .then(res => res.json())
                    .then(data => {
                            console.log(data);
                            setStudents(data);
                            setFetching(false);
                    })
        }

        useEffect(() => {
                fetchStudents();
        }, []);

    function renderStudents(){
        if(fetching){
            return <Spin indicator={<LoadingOutlined spin />} size="small" />
        }
        return <>
            <StudentDrawerForm showDrawer={showDrawer} setShowDrawer={setShowDrawer} fetchStudents={fetchStudents} />
            <EditUser
                showEditDrawer={showEditDrawer}
                setShowEditDrawer={setShowEditDrawer}
                fetchStudents={fetchStudents}
                student = {selectedStudent}
            >Edit</EditUser>
            <Table
                dataSource={students}
                columns={columns}
                bordered={true}
                title = {() => (<>
                        <Tag style={{marginLeft: "15px"}}>Number of students</Tag>
                        <Badge count={students.length} offset="50" color="orange"/>
                        <br/><br/>
                        <Button onClick={() => {
                            setShowDrawer(!showDrawer)
                        }} type="primary" icon={<UserOutlined/>} size='large'>
                            Add new student
                        </Button>

                    </>
                )


                }

                pagination={{pageSize: 50}}
                scroll={{y : 500}}
                rowKey ={student => student.id}

            />
        </>


    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const columns = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text,student) => <TheAvatar name={student.name}></TheAvatar>
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text,student) => (
                <>
                    <DeleteUser onDelete={() => handleDelete(student.id,fetchStudents)}>Delete</DeleteUser>
                    <Space/>

                    <Button style={{marginLeft: '15px'}} onClick={() =>
                    {setSelectedStudent(student); setShowEditDrawer(!showEditDrawer)}} >Edit</Button>
                </>
            )
        }

    ];

  return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <div style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={items2}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 600 }}>
                        {renderStudents()}

                    </Content>
                </Layout>
            </div>
            <Footer style={{ textAlign: 'center', postion: 'relative', marginTop: '100px', height: '25px' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
  )
}

export default App;


