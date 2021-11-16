import { Table } from 'antd';
import axios from "axios"
import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router";
import Example from './chart';

function Home() {
    const [det, setData] = useState([])
    const [inp, setInp] = useState([])

    const getData = () => {

        const api = "https://api.covidtracking.com/v1/states/current.json"
        axios.get(api).then((e) => {
            console.log(e.data);
            setData(e.data)
            console.log(det);
            setInp(e.data)
        })
    }
    useEffect(() => {
        getData();
    }, [])
    const navigate = useNavigate();

    const data = (id) => {
        console.log(id)
      
        navigate(`about/${id?.countryInfo?._id}`, { state: id },);
        
    }
   
    return (
        <div className="home-div">
            <div className="home-div-2">
                <Example/>
                
                <table  className="home-div-table">
                
                    <tr className="home-div-table-tr">
                        <th className="home-div-table-tr-th" colspan="2" >Country</th>
                        <th className="home-div-table-tr-th">Total Confirmed</th>
                        <th className="home-div-table-tr-th">Total Recovered</th>
                        <th className="home-div-table-tr-th">Total Deaths</th>
                    </tr>
                    {det.map((e, i) => {
                        return (
                            <tr  className="home-div-table-tr-2" key={i}>
                                <td id="home-div-table-tr-td-id" className="home-div-table-tr-td-2" colspan="2">
                                    <div className="home-div-table-tr-td-div-1">
                                    <img className="table-tr-td-img" src={e.countryInfo.flag} />
                                    <h5 onClick={() => data(e)}>{e.country}</h5>
                                    </div>
                                </td>
                                <td className="home-div-table-tr-td-2">{e.cases}</td>
                                <td className="home-div-table-tr-td-2">{e.recovered}</td>
                                <td className="home-div-table-tr-td-2">{e.deaths}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div >
    )
}
export default Home