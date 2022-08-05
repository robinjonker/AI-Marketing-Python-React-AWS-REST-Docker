import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo from "../public/favicon.ico";

const CopyKitt: React.FC = () => {
    const CHARACTER_LIMIT: number = 32
    const ENDPOINT: string = "https://wbzzsmillk.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keywords"
    const [prompt, setPrompt] = React.useState("");
    const [snippet, setSnippet] = React.useState("");
    const [keywords, setKeywords] = React.useState([]);
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = () => {
        setIsLoading(true)
        console.log("Submitting: " + prompt);
        fetch(`${ENDPOINT}?prompt=${prompt}`)
        .then((res) => res.json())
        .then(onResult)
    };

    const onResult = (data: any) => {
        setSnippet(data.snippet)
        setKeywords(data.keywords)
        setHasResult(true)
        setIsLoading(false)
    };

    const onReset = () => {
        setPrompt("")
        setHasResult(false)
        setIsLoading(false)
    }

    let displayedElement = null

    if (hasResult) {
        displayedElement = <Results snippet={snippet} keywords={keywords} onBack={onReset} prompt={prompt}/>
    }
    else {
        displayedElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT} />
    }

    const gradientTextStyle = "text-white text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-700 font-light w-fit mx-auto";

    return (
        <div className="h-screen flex">
        <div className="max-w-md m-auto p-2">
          <div className="bg-orange-100 p-6 rounded-md text-white">
            <div className="text-center my-6">
              <Image src={logo} width={200} height={145.5} />
              <h1 className={gradientTextStyle + " text-6xl font-bold"}>
                Alan
              </h1>
              <div className={gradientTextStyle}>Your AI Marketer</div>
            </div>
  
            {displayedElement}
          </div>
        </div>
      </div>
    ) 
}

export default CopyKitt;