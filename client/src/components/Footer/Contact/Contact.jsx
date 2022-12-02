import React, { useState } from 'react';
import s from './FooterBar.module.css';
import logoS from '../../asset/logoS.png';

export default function Contact() {
    const [mail, setMail] = useState({
        title: "",
        emailTo: "",
        body: "",
    })

    function handleMail(e) {
        e.preventDefault()
        setMail({
            ...mail,
            [e.target.name]: e.target.value
        })
    }

    function sendMail(e) {
        console.log(mail)
    }

    //AGREGUEN LOS SUYOS
    const ourMails = ['britosj30@gmail.com']

    return (
        <div>
            <label htmlFor='title'>Title Mail:</label>
            <input name='title' onInput={e => handleMail(e)} value={mail.title}></input>
            <label htmlFor='emailTo'>Send To:</label>
            <select name='emailTo' onChange={e => handleMail(e)}>
                {
                    ourMails.map((m) => {
                        return (
                            <option value={m}>{m}</option>
                        )
                    })
                }
            </select>
            <textarea name='body' value={mail.body} onInput={e => handleMail(e)}/>
            <button onClick={e => sendMail(e)}></button>
        </div>
    );
}
