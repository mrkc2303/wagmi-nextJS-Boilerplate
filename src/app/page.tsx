'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { writeContract, waitForTransactionReceipt } from '@wagmi/core'
import AdminABI from '../../abi/AdminABI.json'
import { config } from '../wagmi'
import { parseEther } from 'viem'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const doTransactions = async() => {
    if(account) {
      console.log(account.address)
      const result = await writeContract(config, {
        abi: AdminABI,
        address: '0xf7cC6dd255e3c407A60DccfEeC77B65525303102',
        functionName: 'withdraw',
        args: [
          '0x4AF1D0a7B934FbDB1737dEF2F917eDa2d1d86fbA',
          account.address,
          1,
        ],
      })
      console.log(result);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });
      console.log(transactionReceipt);
      console.log("Ho GYA")
    } else {
      alert("Wallet Connect Kar")
    }
  }

  const doLiquidityTransaction = async() => {
    if(account) {
      console.log(account.address)
      const result = await writeContract(config, {
        abi: AdminABI,
        address: '0xf7cC6dd255e3c407A60DccfEeC77B65525303102',
        functionName: 'enableFreeLiquidity',
        args: [
          "0x4AF1D0a7B934FbDB1737dEF2F917eDa2d1d86fbA",
          10,
          0,
          parseEther('7'),
          parseEther('7.5'),
          ["0xf6C27178c277148A60A6aa6574a4684c12aFeD4c"],
          [parseEther('9.22')],
          [parseEther('10.34')]
        ],
      })
      console.log(result);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });
      console.log(transactionReceipt);
      console.log("Ho GYA")
    } else {
      alert("Wallet Connect Kar")
    }
  }

  // const { config, writeError } = writeContract({
  //   address: network[7001].Admin,
  //   abi: AdminABI,
  //   functionName: 'withdraw',
  //   args: [
  //     (token==="MATIC") ? "0x4AF1D0a7B934FbDB1737dEF2F917eDa2d1d86fbA" : "0xf6C27178c277148A60A6aa6574a4684c12aFeD4c", 
  //     address,
  //     ethers.utils.parseUnits((amount == 0 || amount.toString() == '') ? "0" : amount.toString())
  //   ],
  //   chainId: 7001,
  //   onSuccess(data) {
  //     console.log('Success', data)
  //   },
  //   onError(error) {
  //     console.log('Error', writeError)
  //   },
  //   onSettled(data, error) {
  //     console.log('Settled', { data, writeError })
  //   },
  // })

  // const { write, isLoading } = useContractWrite(config);

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
        <div>
          <button onClick={() => doTransactions()} type="button">
            Withdrawal
          </button>
          <button onClick={() => doLiquidityTransaction()} type="button">
            Enable Liquidity
          </button>
        </div>
      </div>
    </>
  )
}

export default App
