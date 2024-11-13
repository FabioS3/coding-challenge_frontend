import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { message, Table } from "antd";

import { SearchProps } from 'antd/es/input';
import Search from 'antd/es/input/Search';
import Card from 'antd/es/card/Card';

function Main() {
    interface User {
        id: string;
        name: string;
        email: string;

      }
    const [users, setUsers] = useState<User[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

const columns=[{
    title:'id',
    dataIndex:'id',
    key:'id'
},
{title:'name',
dataIndex:'name',
key:'name'},
{title:'email',
    dataIndex:'email',
    key:'email'
}]


const userNotFound = () => {
    messageApi.open({
      type: 'error',
      content: 'Benutzer konnte nicht gefunden werden',
    });
  };

  const loadUsers= async(id?:string)=>{
    try {
        let response;
        if(id){ 
             response = await axios.get<User>('http://localhost:3333/v1/users/'+id);
             setUsers([response.data]);
        }
        else{
             response = await axios.get<User[]>('http://localhost:3333/v1/users');
             setUsers(response.data); 
        }
        
       
      } catch (err) {
       userNotFound();
      } 
 }

 const onSearch: SearchProps['onSearch'] = (value, _e, info) => loadUsers(value);

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{display:'grid', placeItems:'center', width:'100vw', height:'100vh', background:'#1A1A1A'}}>
    <div style={{ width:'50%'}}>
         {contextHolder}
         <Card title="Benutzerliste" bordered={false} style={{ width: '100%' }}>
        <Search
      placeholder="Benutzer suchen"
      enterButton="Suche"
      size="large"
      onSearch={onSearch}
    />
<Table dataSource={users} columns={columns} style={{ width: '100%', marginTop:'1em' }}/>
</Card>
</div>
</div>
  );
};


export default Main