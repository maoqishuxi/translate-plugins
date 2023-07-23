
function ShowText({title, content}) {

  return (
    <div>
      <div className="p-2 flex">
        <div className="w-5 h-5 overflow-hidden">
          <img className="w-full h-full object-cover" src="icon.jpg" alt=""/>
        </div>
        <div className="pl-2 text-sm block">
          {title}
        </div>
      </div>
      <div className="pl-2 pb-2">
        {content}
      </div>
    </div>
  )
}

export default ShowText;
