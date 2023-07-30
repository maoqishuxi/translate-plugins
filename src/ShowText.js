
function ShowText({title, content}) {

  const handlerClick = () => {
    navigator.clipboard.writeText(content);
    console.log('copied to clipboard');
  }

  return (
    <div className="bg-white p-1">
      <div className="p-2 flex">
        <div className="w-5 h-5 overflow-hidden">
          <img className="w-full h-full object-cover" src="icon.jpg" alt=""/>
        </div>
        <div className="pl-2 text-sm block">
          {title}
        </div>
        <div className="ml-5 px-2 text-sm rounded-md block bg-blue-200 text-white
           active:text-red-200 hover:text-black" onClick={handlerClick}>
          COPY
        </div>
      </div>
      <div className="pl-2 pb-2">
        {content}
      </div>
    </div>
  )
}

export default ShowText;
