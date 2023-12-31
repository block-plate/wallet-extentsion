import React, { useState, } from 'react';
import { Button, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const AuthBlock = styled.div`
    /* height: 100vh; */
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
        width: 100%;
        margin-bottom: 1.5rem;
    }
    .container{
        height: 580px;
        margin-top: 1rem;
        /* box-shadow : 0px 0px 8px rgba(0, 0, 0, 0.125); */
        //border: 3px solid rgba(0, 0, 0, 0.01);
        padding: 2rem;
        display: flex;
        box-sizing: border-box ;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        .input{
            width: 100%;
            margin-bottom: 1rem;
        }
        .button{
            width: 100%;
        }
    }
    .error-message{
        color: red;
        margin-bottom: 1rem;
    }
    /* .button{
        margin-top: 1rem;
        background: #98dad7;
        color: #2A354E;
        &:hover{
            background: #7dc1be;    
        }
    } */
`;

const Auth = () => {
    const {onChange, handdleLogin, input, error} = useAuth();
    return (
        <AuthBlock>
            
            <div className='container'>
            <img src='/logo.png'></img>
                <Input placeholder='아이디를 입력해주세요' name='id' onChange={onChange} ></Input>
                <Input placeholder='비밀번호를 입력해주세요' type='password' name='password' onChange={onChange} ></Input>
                <div className='error-message'>{error}</div>
                <Button primary onClick={()=>handdleLogin(input)}>로그인</Button>
            </div>
        </AuthBlock>
    )
}

export default Auth;