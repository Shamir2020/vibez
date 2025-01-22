import { useNavigate, useParams } from "react-router-dom"

const PaymentSuccess = ()=>{

    const transactionId = useParams().transactionId

    const ConfirmOrderPayment = async ()=>{

        // const response = await fetch(`/api/order/success/${transactionId}`)

        

    }
    return (
        <>
            <div className="payment-success-container">
                <h3>Payment has been successful</h3>
                <h3>Your transaction ID - {transactionId}</h3>
            </div>
        </>
    )
}

export default PaymentSuccess