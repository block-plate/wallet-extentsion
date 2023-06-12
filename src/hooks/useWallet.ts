import react, {useCallback, useEffect, useState} from 'react';
import { getWallet, getWallets, sendTransaction } from '../lib/api';
import { AxiosError } from 'axios';
// import { toast } from 'react-toastify';

export default function useWallet(){
    const [walletOptions, setWalletOptions] = useState([]);
    const [wallet, setWallet] = useState({
        publicKey: null,
        privateKey: null,
        account: null,
        balance: 0,
    });
    const [amount, setAmount] = useState<string>()
    const [received, setReceived] = useState<string>();
    const [txId, setTxId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [amountError, setAmountError] = useState<string>();
    const [receiveError, setReceiveError] = useState<string>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const getWalletList = async() => {
        const wallets = await getWallets();

        const ws = wallets.data.map((w : any) => {
            return {
                text: w,
                value: w,
                key: w
            }
        })

        setWalletOptions(ws);
    }

    const onSelectAccount = async(e: any, {value}: any) => {
        setIsSuccess(false);
        try{
            const {data} = await getWallet(value);
            setWallet(data);
            //@ts-ignore
            chrome.runtime.sendMessage({account: value}, function(response: any) {
                console.log("connect.js로부터 응답을 받았습니다.");
                console.log(response);
            });
        } catch(err){
            // toast.error(`Not Found:  ${value}`);
        }
    }  

    const handleSubmitTransaction = async() => {
        if(!received){
            setReceiveError('Please Enter Received')
            return;
        }
        if(!amount){
            setReceiveError('')
            setAmountError('Please Enter to Amount')
            return;
        }

        setReceiveError('')
        setAmountError('')
        
        const data =  {
            sender:{
                publicKey: wallet.publicKey,
                account: wallet.account,
            },
            received,
            amount: Number(amount),
        }
        
        try{
            setIsLoading(true);
            const response = await sendTransaction(data);
            setTxId(response.data.tx.hash);

            if(response.data.tx.hash){
                //@ts-ignore
                chrome.runtime.sendMessage({txId: response.data.tx.hash}, function(response: any) {
                    console.log("connect.js로부터 응답을 받았습니다.");
                    console.log(response);
                });
                //window.postMessage({target: 'transaction', txId: response.data.tx.hash})
            }
            setIsLoading(false);
            setAmount('0');
            const r = await getWallet(wallet.account);
            setWallet(r.data);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 2000)
        } catch (err){
            const e = err as AxiosError; 
            const {error} = e.response?.data as any;
            setAmountError(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getWalletList();
    }, []);

    return {
        walletOptions, wallet, handleSubmitTransaction, onSelectAccount, setReceived,
         setAmount, txId, received, isLoading, amountError, receiveError, isSuccess
    }
}