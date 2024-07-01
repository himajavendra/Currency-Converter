import { useEffect, useState } from "react";

import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components";

function App() {
  const BackgroundImage = "https://t3.ftcdn.net/jpg/04/34/58/54/360_F_434585463_zpdtTpTEbqQFfsp6RVEW6IIxEM9dHf86.jpg";
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("AUD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
    console.log(to,from,currencyInfo[from],currencyInfo[to])
    console.log(currencyInfo);
    console.log(convertedAmount);
  }; 

  useEffect(()=>{
    convert();
  },[convertedAmount])

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('${BackgroundImage}')`
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                            currencyDisable={false}

                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            onAmountChange={(amount) => setAmount(amount)}
                            
                            // onAmountChange={(convertedAmount) => setAmount(convertedAmount)}
                            // amountDisable="true"
                            
                        />
                    </div>
                    <button  type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App;
