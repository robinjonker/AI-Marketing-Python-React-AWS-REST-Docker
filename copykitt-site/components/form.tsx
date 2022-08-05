interface FormProps {
    prompt: string,
    setPrompt: any,
    onSubmit: any,
    isLoading: boolean,
    characterLimit: number,
}

const Form: React.FC<FormProps> = (props) => {
    const isPromptValid = props.prompt.length <= props.characterLimit
    const updatePromptValue = (text: string) => {
        if (text.length <= props.characterLimit) {
            props.setPrompt(text)
        }
    }

    let statusColor = "text-slate-500";
    let statusText = null;
    if (!isPromptValid) {
    statusColor = "text-red-600";
    statusText = `Input must be less than ${props.characterLimit} characters.`;
    }

    return (
        <>
      <div className="mb-6 text-zinc-800">
        <p>
          Tell me what your brand is about and I will generate copy and keywords
          for you.
        </p>
      </div>

      <input
        className="p-2 w-full rounded-md focus:outline-orange-500 focus:outline outline-2 text-white bg-black"
        type="text"
        placeholder="coffee"
        value={props.prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
        <div>{statusText}</div>
        <div>
          {props.prompt.length}/{props.characterLimit}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-orange-500 to-red-700 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}
      >
        Submit
      </button>
    </>
    )
}

export default Form