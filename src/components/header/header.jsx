import UserTag from '../userData/userdata.jsx';



function Header(){

  return(
    <header className='w-full bg-blue-500 flex h-[100px] relative items-center p-[10px]'>

      <h1 className='text-white text-[30px]'>Leonine villa</h1>

      <UserTag imageLink="https://th.bing.com/th/id/OIP.ySiQ61-170um7jHn2cv15QAAAA?rs=1&pid=ImgDetMain"  name="Malith Dilshan "/>

    </header>
  )
}

export default Header;
