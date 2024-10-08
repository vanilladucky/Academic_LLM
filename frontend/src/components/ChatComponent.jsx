import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

function ChatComponent({chatconversation, convoID}){

    const divRef = useRef(null);

    // Whenever chat conversation is updated and convoID is given, then update
    useEffect(() => {
        const postConvo = async() => {
            if (convoID != '' && chatconversation.length > 0 && chatconversation.slice(-1)[0]['user']=="LLM"){
                await fetch(`${import.meta.env.VITE_SERVER_PORT}/convo/${convoID}`, {
                  method:"PUT",
                  headers: {"content-type": "application/json",'Access-Control-Allow-Origin':'*'},
                  body: JSON.stringify({
                    user: localStorage.getItem('userID'),
                    convo: chatconversation
                  })
                })
            }
        }
        postConvo();
    }, [chatconversation])

    // To scroll down whenever chat is updated
    useEffect(() => {
        if (divRef.current) {
          divRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [chatconversation]);

    return (
        <>
            {chatconversation && chatconversation.length == 0 ? (
                            <div className="px-4 scrollable-div" style={{ height: '100%', overflowY: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <div className='d-flex flex-column justify-content-center align-items-left p-2 p-md-4 border-dark rounded shadow-lg' 
                                    style={{ maxWidth: '90%', backgroundColor: 'rgba(0,0,0, 0.4)' }}>
                                    
                                    <p className='text-left fs-sm-1' style={{ textAlign: 'left' }}>
                                        Ask me questions regarding the following courses from CCDS
                                    </p>
                                    
                                    <ul className='fs-sm-1' style={{ textAlign: 'left' }}>
                                        <li>Computer Architecture</li>
                                        <li>Data Structures</li>
                                        <li>Introduction to databases</li>
                                        <li>Introduction to DSAI</li>
                                        <li>Operating systems</li>
                                        <li>Probability and Statistics</li>
                                    </ul>
                                    
                                    <p className='text-left fs-sm-1' style={{ textAlign: 'left' }}>
                                        I have vast knowledge about these courses from NTU and will be able to answer you with more accurate replies. I also provide you with the source of the information so that you can personally go and take a more detailed look if you wish.
                                    </p>
                                    
                                    <p className='text-left fs-sm-1' style={{ textAlign: 'left' }}>
                                    Any queries or questions, please contact adacademicgpt@gmail.com
                                    </p>
                                </div>
                            </div>
                        ): (<div class="px-2 px-md-4 scrollable-div" style={{ height: '100%', overflowY: 'auto'}}>
                        {chatconversation.map((item, i) => (
                            <>
                                {item.user === "User" ? (
                                <div className="d-flex rounded align-items-start text-start justify-content-end ">
                                    <div className="p-3 mb-4 rounded border border-dark bg-dark text-white" style={{'max-width':'85%'}}>
                                        <ReactMarkdown className="align-middle fs-6" style={{'word-wrap':'break-word', 'overflow-wrap':'break-word', 'white-space': 'pre-wrap', 'font-family':'Georgia'}}>{item.text}</ReactMarkdown>
                                    </div>
                                    <img 
                                        src="/user_icon.png" // Replace with the actual path to your image
                                        alt="Icon"
                                        className="ms-2" // Add some margin to the right for spacing
                                        style={{ width: '30px', height: '30px' }} // Adjust size as needed
                                    />
                                </div>
                                ) : 
                                (<div class="d-flex rounded align-items-start justify-content-start text-start">
                                    <img 
                                        src="/logo_img.png" // Replace with the actual path to your image
                                        alt="Icon"
                                        className="me-2" // Add some margin to the right for spacing
                                        style={{ width: '30px', height: '30px' }} // Adjust size as needed
                                    />
                                    <div class="p-3 mb-4 rounded border border-dark bg-dark text-white" style={{'max-width': '85%'}}>
                                        <ReactMarkdown className="align-middle fs-6" style={{'word-wrap':'break-word', 'overflow-wrap':'break-word', 'white-space': 'pre-wrap', 'font-family':'Georgia'}}>{item.text}</ReactMarkdown>
                                    </div>
                                </div>)  
                                }
                            </>
                        ))}
                        <div ref = {divRef}/>
                        </div> )}
                
        </>
    )
}

export default ChatComponent