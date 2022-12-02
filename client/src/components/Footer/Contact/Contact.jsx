import React, { useState } from 'react';

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
        handleButton()
    }

    function sendMail(e) {
        console.log(mail)
    }

    function handleButton() {
        return !mail.title || !mail.emailTo || !mail.body
    }

    //AGREGUEN LOS SUYOS
    const ourMails = ['britosj30@gmail.com']

    return (
        <div>
            <label htmlFor='title'>Title Mail:</label>
            <input name='title' onInput={e => handleMail(e)} value={mail.title}></input>
            <br />
            <label htmlFor='emailTo'>Send To:</label>
            <select name='emailTo' onChange={e => handleMail(e)}>
                <option value=''>Select Mail</option>
                {
                    ourMails.map((m) => {
                        return (
                            <option value={m} key={m}>{m}</option>
                        )
                    })
                }
            </select>
            <br />
            <textarea name='body' rows={10} cols={50} value={mail.body} onInput={e => handleMail(e)} />
            <br />
            <button onClick={e => sendMail(e)} disabled={handleButton()}>Send Mail</button>
        </div>
    );
}
