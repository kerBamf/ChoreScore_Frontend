import { useState, useEffect } from 'react'
import { quotesLoader } from '../apiCalls'
import Container from 'react-bootstrap/Container'


const Footer = () => {
    const [quote, setQuote] = useState({})

    async function getQuote() {
        let rawQuote = null
        try{
        rawQuote = await quotesLoader()
        setQuote(rawQuote)
        } catch(err) {
            console.log(err)
        } 
    }

    useEffect(() => {
        const interval = setInterval(getQuote, 60000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    

    if (quote != null) {
    return ( 
        <Container className="quoteBox">
            <p className="quote">"{quote.quote}"</p>
            {quote.author ? <p className="quoteAuthor">-{quote.author}</p> : <p className="quoteAuthor justify-content-end">-Unknown</p>}
        </Container>
    )
    } else {
        return (<p>Loading Quotes...</p>)
    }

}

export default Footer