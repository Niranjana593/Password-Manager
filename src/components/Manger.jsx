import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'
const Manger = () => {
    const ref = useRef()
    const passref = useRef()
    const [crendential, setcrendential] = useState({ url: '', username: '', password: '' })
    const [PasswordArray, setPasswordArray] = useState([])
    const getPassword=async() => {
        let res=await fetch('http://localhost:3000/')
        let password =await res.json()
        console.log(password)
        console.log(PasswordArray)
        setPasswordArray(password)
    }   
    
    useEffect(() => {
        getPassword()
    }, [])
    const Editpassword=(id) => {
        let index=PasswordArray.findIndex((item)=>item.id===id)
        console.log(index)
        setcrendential(PasswordArray[index])
        setPasswordArray(PasswordArray.filter((item)=>item.id!=id))
         deleteEditedpass(id)
        // localStorage.setItem('password',PasswordArray.filter((item)=>item.id!=id))
    }
    const deleteEditedpass=async(id) => {
        fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" },  body: JSON.stringify({id:id}) })
    }
    
    const deletepassword=async(id) => {

        let c=confirm('Are U sure u want to delete')
        if(c)
        {
            console.log('Deleting Element id is:'+id)
            setPasswordArray(PasswordArray.filter((item)=>item.id!=id))
            // localStorage.setItem('password',PasswordArray.filter((item)=>item.id!=id))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" },  body: JSON.stringify({id:id}) })
        }
    }
    
    const showpassword = () => {
        passref.current.type = "text"

        if (ref.current.src.includes('icons/eye.png')) {
            ref.current.src = 'icons/eyecross.png'
            passref.current.type = "password"
        }
        else {
            ref.current.src = 'icons/eye.png'
            passref.current.type = "text"
        }
    }
    const savecrenditial = (e) => {
        setcrendential({ ...crendential, [e.target.name]: e.target.value })
        // setcrendential({url:'',username:'',password:''})
    }
    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }

    const savepassword = async () => {
        const exists = PasswordArray.some(e => e.url === crendential.url);

        if (!exists && crendential.url != '' && crendential.username.length>3 && crendential.password.length>4 ) {
            let updated = [...PasswordArray, {...crendential,id:uuidv4()}];
            setPasswordArray(updated);
            // localStorage.setItem('password', JSON.stringify(updated));
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" },  body: JSON.stringify({...crendential,id:uuidv4()}) })
            console.log(updated); // shows the new array
            setcrendential({url:'',username:'',password:''})
        } else {
            toast('Enter the valid crenditial', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        }
    };

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                
            />

            <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

            <div className="w-full  md:mycontainer md:px-40 mx-auto ">
                <div className="content  w-[90%] m-auto my-8">
                    <div className="logo text-2xl font-semibold text-center">
                        <span className='text-green-700'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-green-800'>OP/&gt;</span>
                    </div>
                    <p className='text-lg text-bold text-center'>Your Own Password Manager</p>
                    <div className="inputURL flex flex-col gap-6 text-black text-lg">
                        <input onChange={savecrenditial} value={crendential.url} className='px-3 border  border-green-500 placeholder:px-3 w-full my-3 rounded-full' type="text" name="url" placeholder='Enter the URL ' />

                        <div className='input flex flex-col md:flex-row justify-around w-full gap-5 relative'>
                            <input onChange={savecrenditial} value={crendential.username} className='border px-3 w-[100%]  rounded-full md:w-[80%] placeholder:px-3 border-green-500' type="text" name="username" placeholder='Enter the UserName ' />
                            <div className='relative'>
                                <input onChange={savecrenditial} ref={passref} value={crendential.password} className='w-full px-3 border rounded-full   placeholder:px-3 border-green-500' type="password" name="password" id="JTD" placeholder='Enter the Password ' />
                                <span className=' absolute cursor-pointer right-[5px] top-[2px]'><img onClick={showpassword} ref={ref} className='' width={25} src="icons/eye.png" alt="dnavk" /></span>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={savepassword} className='flex justify-center items-center gap-2 bg-blue-500 text-black  text-center text-lg border-green-600 border rounded-full
                    px-3 py-1 hover:bg-blue-700 '><lord-icon
                                    src="https://cdn.lordicon.com/vjgknpfx.json"
                                    trigger="hover">
                                </lord-icon>Save Password</button>
                        </div>
                    </div>
                </div>
                <div className="showList overflow-auto w-[90%] m-auto">
                    <h2 className='sticky left-0 font-semibold  text-2xl'>Your Password Manager:</h2>
                    {PasswordArray.length === 0 && <div className='text-xl text-green-700 font-semibold'>No Password to Show</div>}
                    {PasswordArray.length != 0 &&
                        <table className="table-auto md:w-full">
                            <thead className='bg-green-600 text-white text-center'>
                                <tr>
                                    <th>URL</th>
                                    <th>USERNAME</th>
                                    <th>PASSWORD</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {PasswordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center '>
                                                <a href={item.url} target='_blank'>{item.url}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.url) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center '>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center '>
                                                <span style={{"font-family": "monospace", "-webkit-text-security": "disc"}}>{item.password}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex justify-center gap-2 py-2 border border-white text-center'>
                                           <span className='cursor-pointer' onClick={()=>{Editpassword(item.id)}}><lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon></span>
                                            <span className='cursor-pointer' onClick={()=>{
                                                deletepassword(item.id)}}> <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon></span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}

                </div>
            </div>
        </>
    )
}

export default Manger
