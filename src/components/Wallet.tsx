import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import styled from 'styled-components';
// import Responsive from '../common/Responsive';
import useWallet from '../hooks/useWallet';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';

const StyledWallet = styled.div`
    background-color: white;
    height: 100vh;
    main{
        /* height: 580px; */
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        
        .card{
            width: 360px;
            color: black;
            background-color: white;
            padding: 2rem;
            border-radius: 24px;
            /* box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.3); */
        }
        .wallet-card{
            display: flex;
            flex-direction: column;
            justify-content: center;
            /* align-items: center; */
            img{
                height: 25px;
                margin-right: .5rem;
            }
            h1{
                display: flex;
                justify-content:center ;
                font-size: 2.25rem;
                margin-block-start: .5rem;
                align-items:center ;
                text-align: center;
                /* color: #98dad7; */
                span{
                    /* color: #98dad7; */
                }
            }
            label{ 
                margin-bottom: .5rem;
                font-size: 1.25rem;
                font-weight: bold;
            }
            p{
                font-size: 1.25rem;
            }
        }
        .send-box{
            /* margin-top: 1rem; */
            display: flex;
            flex-direction: column;
            justify-content: center;
            /* align-items: center; */
        }
        .input + .input {
            margin-top: 1rem;
        }
        #amount{
            /* width: 50%; */
        }
        
    }
    .ui.fluid.dropdown > .text{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    .ui.fluid.dropdown > .menu > .item{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    .space{
        height: 1rem;
    }
    .header{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        img{
            width: 30px;
        }
        span{
            font-weight:bold ;
            font-size: 1.5rem;
            color: #1478C1;
        }
        border-bottom: 1px solid #d1d1d1 ;
    }
`

const Wallet = () => {
    const {walletOptions, 
        wallet, 
        handleSubmitTransaction, 
        onSelectAccount, 
        setReceived, 
        setAmount, 
        txId, 
        received,
        isLoading,
        amountError,
        receiveError,
        isSuccess
    } = useWallet();
    
    useEffect( () => {
        //@ts-ignore
        chrome.runtime.onMessage.addListener(
            function(request: any, sender: any, sendResponse: any ) {
            setReceived(request.key);
            sendResponse({res: "sucess!"})
        });
        //@ts-ignore
        if(chrome){
            //@ts-ignore
            chrome.storage.local.get(["key"], function(result: any) {
                var data = result.key;
                if(data){
                    setReceived(data);
                }
            });
        }
    }, [])
    
     if(localStorage.getItem('login') !== 'true'){
        return <Redirect to='/auth'/>
    }

    
    return (
        <StyledWallet>
            <main>
            {/* <img src='/logo.png'></img> */}
                <div className='header'>
                    <img src='/48x48.png'></img>
                    <span><b>Plate</b> Wallet</span>
                    <Button onClick={() => localStorage.clear()} icon="logout" circular></Button>
                </div>
                
                <div className='wallet-card card'>
                    <h3>Account</h3>
                    <Dropdown
                        placeholder='Select Account'
                        fluid
                        selection
                        options={walletOptions}
                        onChange={onSelectAccount}
                    />
                    <h1>{wallet.account ? <img src='/check-badge.svg'></img> : <span style={{width: '0'}}></span>}{Number(wallet.balance).toFixed(2)} <span>PTC</span></h1>
                </div>
                <div className='send-box card'>
                    <h3>Send Coin</h3>
                    <Form>
                    <Form.Field>
                        <Input 
                            fluid
                            placeholder='public account(0x)' 
                            icon='check' 
                            onChange={(e) => setReceived(e.target.value)}
                            disabled={!wallet.account}
                            value={received}
                        />
                        {
                            receiveError && <label style={{color: 'red'}}>
                                {receiveError}
                            </label>
                        }
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            placeholder='amount' 
                            id="amount" 
                            label={{ basic: true, content: 'PTC' }} 
                            onChange={(e) => setAmount(e.target.value)}
                            labelPosition='right' 
                            disabled={!wallet.account}
                            fluid
                        />
                        {
                            amountError && <label style={{color: 'red'}}>
                                {amountError}
                            </label>
                        }
                    </Form.Field>
                    <Button fluid primary disabled={!wallet.account} icon='check' loading={isLoading} onClick={handleSubmitTransaction}>{!isSuccess ? "Remit" : null}</Button>
                    </Form>
                </div>
            </main>
        </StyledWallet>

    )
}

export default Wallet;