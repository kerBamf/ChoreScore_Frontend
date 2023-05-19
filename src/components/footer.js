import { useState, useEffect } from 'react'
import { quotesLoader } from '../apiCalls'

const Footer = () => {
    const [quotes, setQuotes] = useState([])
    const [thisQuote, setThisQuote] = useState({})

    function changeQuote() {
        let ranIdx = Math.floor(Math.random() * 51)
        setThisQuote(quotes[ranIdx])
    }

    useEffect(() => {
        async function getQuotes() {
            let rawQuotes = null
            try{
            rawQuotes = await quotesLoader()
            console.log(rawQuotes)
            setQuotes(rawQuotes)
            console.log(quotes)
            } catch(err) {
                console.log(err)
            } 
        }
        getQuotes()
        setThisQuote(quotes)
    }, [])

    useEffect(() => {
        setTimeout(function() {
            changeQuote()
        }, 4000)
    }, [thisQuote])
    

    if (thisQuote != null) {
    return ( 
        <>
        <h2>{thisQuote.q}</h2>
        <h4>{thisQuote.a}</h4>
        </>
    )
    } else {
        return (<p>Loading Quotes...</p>)
    }

}

export default Footer