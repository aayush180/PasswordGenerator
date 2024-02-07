import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setallowNumber] = useState(false);
  const [allowCharacter, setallowCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)
  //the useref hook is refering to the input field so that it can select the
  //current value from the input field
  
  // this usecallback is use to memoize the function passwordgenerator for optimization purpose
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNumber) str += "0123456789";
    if (allowCharacter) str += "!@#$%^&*~-_+=()[]{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); 
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, allowNumber, allowCharacter, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();  //it will show in ui that the current value in the input is selected 
    window.navigator.clipboard.writeText(password);
  },
   [password]
  )

  useEffect(() => {
    passwordGenerator()
  },[length,allowNumber,allowCharacter, passwordGenerator])

  return (
    <>
      <h1 className="text-5xl text-center text-orange-500">
        Password Generator
      </h1>
      <div className="w-full max-w-md mx-auto rounded-lg py-5 px-4 my-8 bg-gray-700 text-orange-500">
        <div className="flex shadow rounded-lg overflow-hidden mb-5">
          <input
            type="text"
            value={password}
            className="outline-none w-full  py-2 px-3"
            readOnly
            ref={passwordRef}
          />
           <button 
           onClick={copyPasswordToClipboard}
           className="outline-none
            bg-blue-700
            text-white px-3 py-0.5 
           shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
            {/* 1st input  */}
          <div className="flex items-center gap-x-1">
             <input type="range"
              min={8}
              max={50}
              value={length}
              className=" cursor-pointer"
              onChange={(e)=>{setLength(e.target.value)}}
             />
             <label>Lenght:{length}</label>
          </div>
          {/* 2nd input */}
          <div className="flex items-center gap-x-1 ">
          <input type="checkbox"
              defaultChecked={allowNumber}
              id="numberInput"
              onChange={()=>{
                setallowNumber((prev) => !prev) 
              }}
             />
             <label htmlFor="numberInput">Numbers</label>
          </div>
          {/* 3rd input  */}
          <div className="flex items-center gap-x-1 ">
          <input type="checkbox"
              defaultChecked={allowCharacter}
              id="characterInput"
              onChange={()=>{
                setallowCharacter((prev) => !prev)
              }}
             />
             <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
