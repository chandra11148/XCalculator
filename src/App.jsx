import { useState } from "react";

function App() {
  const symbols = [
    "7",
    "8",
    "9",
    "+",
    "6",
    "5",
    "4",
    "-",
    "3",
    "2",
    "1",
    "*",
    "C",
    "0",
    "=",
    "/",
  ];
  const [result,setResult] = useState("");
  const [expression,setExpression] = useState("");
  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  };
  const buttonsContainer = {
    width: "30%",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
  };
  const buttonStyle={
    width:"80px",
    height:"80px",
    padding:"20px",
    margin:"5px",
    fontSize:"20px",
    fontWeight:"600",
    border:"2px solid black",
    borderRadius:"10px",
    cursor:"pointer"
};
const evaluteExpression=(expression)=>{
  const regex = /\d+|\+|\-|\*|\//g ;
  const tokens = expression.match(regex);
  
  const operate = (a,operator,b)=>{
    const first = parseFloat(a);
    const second = parseFloat(b);
    switch(operator){
      case"+":
        return first+second;
      case"-":
        return first-second;
      case"*":
        return first*second;
      case"/":
        return first/second;
    }
  };
  const applyBodmas = (tokens,operators)=>{
    
      for(let j=1;j<tokens.length;j+=2){
        if(operators.includes(tokens[j])){
          const result = operate(tokens[j-1],tokens[j],tokens[j+1]);
          tokens.splice(j-1,3,result);
          j-=2;
        }
      
    }
  };
  applyBodmas(tokens,["*","/"]);
  applyBodmas(tokens,["+","-"]);

  return parseFloat(tokens[0]);
}
const processExpression=(symbol)=>{
  if(symbol=='=' && expression==""){
    setResult("Error");
    return;
  }else if(symbol=='=' && expression.includes("1/0")){
    setResult("Infinity");
    return;
  }else if(symbol=='='&& expression.includes("0/0")){
    
    setResult("NaN");
    return;
  }else if(symbol=='C'){
    setExpression("");
    setResult("");
    return;
  }else{
    if(symbol=='='){
      const result = evaluteExpression(expression);
      setResult(result);
      return;
    }else{
      setExpression((prevExpression)=>prevExpression+symbol);
    }
  }
}
  return (
    <>
      <div style={container}>
        <h2>React Calculator</h2>
        <div>
          <input type="text" value={expression} />
        </div>

        <div><h2 color="grey">{result}</h2></div>
        <div style={buttonsContainer}>
          {symbols.map((symbol) => (
            <button key={symbol} style={buttonStyle} onClick={()=>processExpression(symbol)}>{symbol}</button>
            
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
