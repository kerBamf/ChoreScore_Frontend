import { useState, useEffect } from 'react'
import { quotesLoader } from '../apiCalls'

const Footer = () => {
    const [quote, setQuote] = useState({})

    async function getQuote() {
        let rawQuote = null
        try{
        rawQuote = await quotesLoader()
        setQuote(rawQuote)
        console.log(quote)
        } catch(err) {
            console.log(err)
        } 
    }

    useEffect(() => {
        const interval = setInterval(getQuote, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    

    if (quote != null) {
    return ( 
        <>
        <h2>{quote.quote}</h2>
        {quote.author ? <h4>{quote.author}</h4> : <h6>Unknown</h6>}
        </>
    )
    } else {
        return (<p>Loading Quotes...</p>)
    }

}

export default Footer