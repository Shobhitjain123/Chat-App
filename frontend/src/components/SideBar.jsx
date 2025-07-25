import { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Users } from 'lucide-react'
import { userAuthStore } from '../store/useAuthStore'
import SideBarLoader from './SideBarLoader'

const SideBar = () => {

  const {users,selectedUser, setSelectedUser,getUsers, isUsersLoading} = useChatStore()
  const [showOnlyOnline, setShowOnlyOnline] = useState(false)
  const {onlineUsers} = userAuthStore()

  useEffect(() => {
    getUsers()  
    
  }, [getUsers])

  const filteredUsers = showOnlyOnline ? users.filter((user) => onlineUsers.includes(user._id)) : users
  
  if(isUsersLoading) return <SideBarLoader />

  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
      <div className='border-b border-base-300 w-full p-5'>
        <div className='flex items-center gap-2'>
          <Users className="size-6" />
          <span className='font-medium hidden lg:block'></span>
        </div>
        {/* Todo: Online Filter Toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            {/* <input type="checkbox" defaultChecked className="toggle toggle-success" /> */}
            <input
              type="checkbox"
              checked={showOnlyOnline}
              onChange={(e) => setShowOnlyOnline(e.target.checked)}
              className="toggle toggle-success"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

       <div className='overflow-y-auto w-full p-3'>
          {
        filteredUsers.map((user) => (
          <button 
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1ring-base-3000' : ''}`}
          >

          <div className='relative mx-auto lg:mx-0'>
            <img src={user.profilePic || '/avatar.png'} alt={user.fullName}  className='size-12 object-cover rounded-full'/>
            {onlineUsers.includes(user._id) && (
              <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zing-900' /> 
            )}
          </div>

            {/* User info - Only visible on larger screens */}

            <div className='hidden lg:block text-left min-w-0'>
              <div className='font-medium truncate'>{user.fullName}</div>
              <div className='text-sm text-zinc-400'>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>

          </button>
        ))
      }
      {
        filteredUsers.length === 0 && (
          <div className='text-center text-zinc-50 py-4'>No Online Users</div>
        )
      }
       </div>
    </aside>
  )
}

export default SideBar