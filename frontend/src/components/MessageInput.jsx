import { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { X , Image, Send} from 'lucide-react'

const MessageInput = () => {
  const [text, setText] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const {sendMessage} = useChatStore()
  
  function handleImgChange(e){
    const file = e.target.files[0]
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setImagePreview(base64Image)
    }  

    reader.readAsDataURL(file);
  }

  function removeImg(){
    setImagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value = ""
  }

  function handleSendMessage(e){
    e.preventDefault()
    if(!text.trim() && !imagePreview) return 

    sendMessage({text: text.trim(), image: imagePreview})

    setText("")
    setImagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className='p-4 w-full'>
      {
        imagePreview && (
          <div className='mb-3 flex items-center gap-2'>
            <div className='relative'>
              <img src={imagePreview} alt="preview" className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />
              <button onClick={removeImg} className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300'>
                <X className='size-3'/>
              </button>
            </div>
          </div>
        )
      }

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input type="text" placeholder='Type a message...' value={text} onChange={(e) => setText(e.target.value)} className='w-full input input-bordered rounded-lg input:sm sm:input-md'/>
          <input type="file" accept='image/*' onChange={handleImgChange} className='hidden' ref={fileInputRef}/>
          <button type='button' className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} onClick={() => fileInputRef.current?.click()}>
            <Image size={20} />
          </button>
        </div>
        <button type='submit' className='btn btn-sm btn-circle' disabled= {!text.trim() && !imagePreview }>
          <Send size={22}/>
        </button>
      </form>

    </div>
  )
}

export default MessageInput