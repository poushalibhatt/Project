import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import LoaderSpinner from './LoaderSpinner';
import User from './User';
import {Routes, Route, useParams} from 'react-router-dom';


function Dashboard(){
    const [data, setData] = useState([])
    const [loadSpinner, setLoad] = useState(false)
    const [userInfo] = useParams()

    // useEffect(
    //     {
    //         // axios({
    //         //   "method" : "GET",
    //         //   "url" : "https://jsonplaceholder.typicode.com/posts"
    //         // })
    //         // .then((response) => {
    //         //     console.log(response);
    //         // setData({data: response.data})
    //         // })
    //         // .catch(error=> {
    //         //     console.log(error);
    //         // })
    //     }, [])

    // handleRoute = (id) => {
    //     history.pushState(`/dashboard/:${id}`)
    // }

        // const {userInfo} = 
        // const {data}= this.state
        return(
            <div>
           
           
            <Table className='table hover table-striped' size="sm">
                <thead className='thead-dark'>
                    <tr>
                        <th>
                            <span align='left'>ID</span>
                        </th>
                        <th>
                            <span align='left'>Title</span>
                        </th>
                        <th>
                            <span align='left'>Body</span>
                        </th>
                        <th>
                            <span align='left'>Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    loadSpinner ?
                    <tr>
                        <td colSpan={12}><LoaderSpinner /></td>
                    </tr> :
                    data.length > 0 ?
                    data.map(datas => <tr key={datas.id}>
                        <td>{datas.id}</td>
                        <td>{datas.title}</td>
                        <td>{datas.body}</td>
                        <td><button onClick={this.handleRoute}></button></td>
                    </tr>)
                    : null
                }
                </tbody>
            </Table>
                
            </div>
        )
    }

export default Dashboard