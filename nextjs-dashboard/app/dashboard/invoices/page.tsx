"use client";

import  axios from 'axios';
import React, {useEffect, useState} from "react";
export default function Page() {
    const [responseData, setResponseData] = useState("Loading...");
    const [postResponseData, setPostResponseData] = useState("");

    useEffect(() => {
    axios.get('http://localhost:8080/api/example')
        .then(function (response: any) {
             setResponseData("Get response: + " + response.data);
        })
        .catch(function (error: any) {
            setResponseData("Get response: " + error.response);
        });

        axios.post('http://localhost:8080/api/example', {data: 'Test data'})
            .then(function (response: any) {
                setPostResponseData("POST response: " + response.data);
            })
            .catch(function (error: any) {
                setPostResponseData("POST response: " + error.response);
            });
    }, []);

  return <p>{responseData } + {postResponseData}</p>;
}
